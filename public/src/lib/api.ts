/**
 * Dedicated data access layer for all API calls
 * Handles error handling, retry logic, and user-facing error messages
 */

const DEFAULT_API_BASE = typeof window !== "undefined" && window.location.hostname !== "localhost"
  ? "http://10.0.2.2:4000"
  : "http://localhost:4000";

const API_BASE = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (data.error) errorMessage = data.error;
    } catch {
      // Response is not JSON, use default message
    }
    throw new ApiError(response.status, errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(response.status, "Invalid response format from server");
  }
}

async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit,
  maxRetries: number = 2
): Promise<T> {
  let lastError: ApiError | Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      return await handleResponse<T>(response);
    } catch (error) {
      lastError = error instanceof ApiError ? error : new Error(String(error));
      // Only retry on network errors or 5xx errors, not 4xx
      if (
        lastError instanceof ApiError &&
        lastError.status >= 400 &&
        lastError.status < 500
      ) {
        throw lastError;
      }
      if (attempt < maxRetries) {
        // Exponential backoff: 100ms, 200ms, etc.
        await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * 100));
      }
    }
  }

  throw lastError || new Error("Failed to fetch after retries");
}

// Borrower API
export interface Borrower {
  id: string;
  name: string;
  fatherName: string;
  mobile: string;
  mobile2?: string;
  work: string;
  address?: string;
}

export async function fetchBorrowers(): Promise<Borrower[]> {
  return fetchWithRetry<Borrower[]>(`${API_BASE}/api/borrowers`);
}

export async function createBorrower(borrower: Omit<Borrower, "id">): Promise<Borrower> {
  return fetchWithRetry<Borrower>(`${API_BASE}/api/borrowers`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(borrower),
  });
}

export async function updateBorrower(id: string, borrower: Omit<Borrower, "id">): Promise<Borrower> {
  return fetchWithRetry<Borrower>(`${API_BASE}/api/borrowers/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(borrower),
  });
}

// Loan API
export interface Due {
  no: number;
  date: string;
  amount: number;
  paid: boolean;
  paidDate?: string;
  collectedBy?: string;
}

export interface Loan {
  id: string;
  code: string;
  borrowerId: string;
  frequency: "daily" | "weekly" | "monthly";
  amount: number;
  interest: number;
  installments: number;
  perInstallment: number;
  startDate: string;
  endDate: string;
  dues: Due[];
}

export async function fetchLoans(): Promise<Loan[]> {
  return fetchWithRetry<Loan[]>(`${API_BASE}/api/loans`);
}

export async function createLoan(loan: Omit<Loan, "id">): Promise<Loan> {
  return fetchWithRetry<Loan>(`${API_BASE}/api/loans`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loan),
  });
}

// Payment API
export interface PaymentRequest {
  loanId: string;
  dueNo: number;
  paidDate?: string;
  collectedBy?: string;
}

export async function recordPayment(payment: PaymentRequest): Promise<void> {
  return fetchWithRetry<void>(`${API_BASE}/api/pay`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payment),
  });
}

// Auth API
export async function login(username: string, password: string): Promise<{ token: string; user: { username: string } }> {
  return fetchWithRetry(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}

// Database API
export async function exportDatabase(): Promise<Blob> {
  const response = await fetch(`${API_BASE}/api/database/export`);
  if (!response.ok) {
    throw new ApiError(response.status, "Failed to export database");
  }
  return response.blob();
}

export async function importDatabase(file: File): Promise<{ message: string }> {
  const formData = new FormData();
  formData.append("file", file);
  return fetchWithRetry<{ message: string }>(`${API_BASE}/api/database/import`, {
    method: "POST",
    body: formData,
  });
}

export async function backupDatabase(): Promise<Blob> {
  const response = await fetch(`${API_BASE}/api/database/backup`);
  if (!response.ok) {
    throw new ApiError(response.status, "Failed to create backup");
  }
  return response.blob();
}
