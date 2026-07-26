import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as apiClient from "./api";
import type { Borrower as ApiBorrower, Loan as ApiLoan, Due as ApiDue } from "./api";

export type Frequency = "daily" | "weekly" | "monthly";

export interface Borrower {
  id: string;
  name: string;
  fatherName: string;
  mobile: string;
  mobile2?: string;
  work: string;
  address: string;
}

export interface Due {
  no: number;
  date: string; // dd/mm/yyyy
  amount: number;
  paid: boolean;
  paidDate?: string;
  collectedBy?: string;
}

export interface Loan {
  id: string;
  code: string;
  borrowerId: string;
  frequency: Frequency;
  amount: number;
  interest: number;
  installments: number;
  perInstallment: number;
  startDate: string;
  endDate: string;
  dues: Due[];
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface AppState {
  loggedIn: boolean;
  borrowers: Borrower[];
  loans: Loan[];
}

interface AppStore extends AppState {
  login: () => void;
  logout: () => void;
  addBorrower: (b: Omit<Borrower, "id">) => Promise<Borrower>;
  updateBorrower: (id: string, changes: Partial<Omit<Borrower, "id">>) => Promise<Borrower>;
  deleteBorrower: (id: string) => Promise<void>;
  addLoan: (l: Omit<Loan, "id" | "code" | "dues">) => Promise<Loan>;
  payDue: (loanId: string, dueNo: number, paidDate: string, collectedBy: string) => Promise<void>;
  borrowerOf: (loan: Loan) => Borrower | undefined;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
  toasts: Toast[];
  removeToast: (id: string) => void;
  exportDatabase: () => Promise<void>;
  importDatabase: (file: File) => Promise<void>;
  backupDatabase: () => Promise<void>;
}

const STORAGE_KEY = "loanbook-state-v1";

const Ctx = createContext<AppStore | null>(null);

export const pad = (n: number) => String(n).padStart(2, "0");

export function toDMY(d: Date) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function fromDMY(s: string) {
  const [d, m, y] = s.split("/").map(Number);
  return new Date(y, m - 1, d);
}

export function inr(n: number) {
  return `₹ ${Math.round(n).toLocaleString("en-IN")}`;
}

export function addPeriod(date: Date, frequency: Frequency, n: number) {
  const d = new Date(date);
  if (frequency === "daily") d.setDate(d.getDate() + n);
  if (frequency === "weekly") d.setDate(d.getDate() + n * 7);
  if (frequency === "monthly") d.setMonth(d.getMonth() + n);
  return d;
}

export function buildDues(
  start: string,
  frequency: Frequency,
  installments: number,
  perInstallment: number,
): Due[] {
  const base = fromDMY(start);
  return Array.from({ length: installments }, (_, i) => ({
    no: i + 1,
    date: toDMY(addPeriod(base, frequency, i)),
    amount: perInstallment,
    paid: false,
  }));
}

export function loanTotals(loan: Loan) {
  const total = loan.dues.reduce((s, d) => s + d.amount, 0);
  const paid = loan.dues.filter((d) => d.paid).reduce((s, d) => s + d.amount, 0);
  const today = new Date();
  const pending = loan.dues
    .filter((d) => !d.paid && fromDMY(d.date) <= today)
    .reduce((s, d) => s + d.amount, 0);
  const balance = total - paid;
  const percent = total ? Math.round((paid / total) * 100) : 0;
  return { total, paid, pending, balance, percent };
}

const initialState: AppState = { loggedIn: false, borrowers: [], loans: [] };

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    async function load() {
      let persistedState: Partial<AppState> | null = null;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          persistedState = JSON.parse(raw);
        }
      } catch (error) {
        console.error("Failed to load from localStorage:", error);
      }

      try {
        const borrowers = await apiClient.fetchBorrowers();
        const loans = await apiClient.fetchLoans();
        setState({
          ...initialState,
          ...(persistedState ?? {}),
          borrowers,
          loans,
          loggedIn: persistedState?.loggedIn ?? false,
        });
      } catch (error) {
        console.error("Failed to load data from API:", error);
        if (persistedState) {
          setState({ ...initialState, ...persistedState });
        }
      }
      setHydrated(true);
    }
    load();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = crypto.randomUUID();
    const toast: Toast = { id, message, type };
    setToasts((current) => [...current, toast]);
    window.setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 4000);
  }, []);

  const notifySuccess = useCallback(
    (message: string) => addToast(message, "success"),
    [addToast],
  );
  const notifyError = useCallback(
    (message: string) => addToast(message, "error"),
    [addToast],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const login = useCallback(() => setState((s) => ({ ...s, loggedIn: true })), []);
  const logout = useCallback(() => setState((s) => ({ ...s, loggedIn: false })), []);

  const addBorrower = useCallback(async (b: Omit<Borrower, "id">) => {
    const borrower: Borrower = { ...b, id: crypto.randomUUID() };
    try {
      const saved = await apiClient.createBorrower(borrower);
      setState((s) => ({ ...s, borrowers: [...s.borrowers, saved] }));
      notifySuccess("Borrower saved successfully.");
      return saved;
    } catch (error) {
      const message = error instanceof apiClient.ApiError 
        ? `Failed to save borrower: ${error.message}`
        : "Unable to save borrower. Please check your connection and try again.";
      notifyError(message);
      throw error;
    }
  }, [notifyError, notifySuccess]);

  const updateBorrower = useCallback(async (id: string, changes: Partial<Omit<Borrower, "id">>) => {
    try {
      const updated = await apiClient.updateBorrower(id, changes);
      setState((s) => ({
        ...s,
        borrowers: s.borrowers.map((b) => (b.id === id ? updated : b)),
      }));
      notifySuccess("Borrower updated successfully.");
      return updated;
    } catch (error) {
      const message = error instanceof apiClient.ApiError
        ? `Failed to update borrower: ${error.message}`
        : "Unable to update borrower details. Please check your connection and try again.";
      notifyError(message);
      throw error;
    }
  }, [notifyError, notifySuccess]);

  const deleteBorrower = useCallback(async (id: string) => {
    try {
      await apiClient.deleteBorrower(id);
      setState((s) => ({
        ...s,
        borrowers: s.borrowers.filter((b) => b.id !== id),
        loans: s.loans.filter((loan) => loan.borrowerId !== id),
      }));
      notifySuccess("Borrower deleted successfully.");
    } catch (error) {
      const message = error instanceof apiClient.ApiError
        ? `Failed to delete borrower: ${error.message}`
        : "Unable to delete borrower. Please check your connection and try again.";
      notifyError(message);
      throw error;
    }
  }, [notifyError, notifySuccess]);

  const addLoan = useCallback(
    async (l: Omit<Loan, "id" | "code" | "dues">) => {
      const prefix = l.frequency === "daily" ? "DL" : l.frequency === "weekly" ? "WL" : "ML";
      const count = state.loans.filter((x) => x.frequency === l.frequency).length + 1;
      const created: Loan = {
        ...l,
        id: crypto.randomUUID(),
        code: `${prefix}-${count}`,
        dues: buildDues(l.startDate, l.frequency, l.installments, l.perInstallment),
      };
      try {
        const saved = await apiClient.createLoan(created);
        setState((s) => ({ ...s, loans: [...s.loans, saved] }));
        notifySuccess("Loan approved and added successfully.");
        return saved;
      } catch (error) {
        const message = error instanceof apiClient.ApiError
          ? `Failed to save loan: ${error.message}`
          : "Unable to save the loan. Please check your connection and try again.";
        notifyError(message);
        throw error;
      }
    },
    [state.loans, notifyError, notifySuccess],
  );

  const payDue = useCallback(
    async (loanId: string, dueNo: number, paidDate: string, collectedBy: string) => {
      try {
        await apiClient.recordPayment({ loanId, dueNo, paidDate, collectedBy });
        setState((s) => ({
          ...s,
          loans: s.loans.map((loan) =>
            loan.id !== loanId
              ? loan
              : {
                  ...loan,
                  dues: loan.dues.map((d) =>
                    d.no === dueNo ? { ...d, paid: true, paidDate, collectedBy } : d,
                  ),
                },
          ),
        }));
        notifySuccess("Payment recorded successfully.");
      } catch (error) {
        const message = error instanceof apiClient.ApiError
          ? `Failed to record payment: ${error.message}`
          : "Unable to save payment. Please check your connection and try again.";
        notifyError(message);
        throw error;
      }
    },
    [notifyError, notifySuccess],
  );

  const exportDatabase = useCallback(async () => {
    try {
      const blob = await apiClient.exportDatabase();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `loanbook-export-${new Date().toISOString().slice(0, 10)}.db`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      notifySuccess("Database exported successfully.");
    } catch (error) {
      const message = error instanceof apiClient.ApiError
        ? `Export failed: ${error.message}`
        : "Unable to export database. Please try again.";
      notifyError(message);
    }
  }, [notifyError, notifySuccess]);

  const backupDatabase = useCallback(async () => {
    try {
      const blob = await apiClient.backupDatabase();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `loanbook-backup-${new Date().toISOString().slice(0, 10)}.db`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      notifySuccess("Backup created successfully.");
    } catch (error) {
      const message = error instanceof apiClient.ApiError
        ? `Backup failed: ${error.message}`
        : "Unable to create backup. Please try again.";
      notifyError(message);
    }
  }, [notifyError, notifySuccess]);

  const importDatabase = useCallback(async (file: File) => {
    try {
      const result = await apiClient.importDatabase(file);
      notifySuccess(result.message);
      window.setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      const message = error instanceof apiClient.ApiError
        ? `Import failed: ${error.message}`
        : "Unable to import database. Please verify the file and try again.";
      notifyError(message);
    }
  }, [notifyError, notifySuccess]);

  const value = useMemo<AppStore>(
    () => ({
      ...state,
      login,
      logout,
      addBorrower,
      updateBorrower,
      deleteBorrower,
      addLoan,
      payDue,
      borrowerOf: (loan) => state.borrowers.find((b) => b.id === loan.borrowerId),
      notifySuccess,
      notifyError,
      toasts,
      removeToast,
      exportDatabase,
      backupDatabase,
      importDatabase,
    }),
    [state, login, logout, addBorrower, updateBorrower, deleteBorrower, addLoan, payDue, notifySuccess, notifyError, removeToast, toasts, exportDatabase, backupDatabase, importDatabase],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
