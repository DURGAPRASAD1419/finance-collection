import { Link, useNavigate } from "@tanstack/react-router";
import { BarChart3, ClipboardList, Home, ListChecks, Search, Users, IndianRupee, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { inr, loanTotals, useApp } from "@/lib/app-store";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/collection", label: "Collection", icon: IndianRupee },
  { to: "/loan", label: "Loan", icon: ListChecks },
  { to: "/borrowers", label: "Borrowers", icon: Users },
  { to: "/graphs", label: "Reports", icon: BarChart3 },
] as const;

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

export function AppShell({
  title,
  children,
  showSearch = true,
  searchQuery,
  onSearchChange,
  headerLeft,
  reportCallback,
}: {
  title: string;
  children: ReactNode;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  headerLeft?: ReactNode;
  reportCallback?: () => void;
}) {
  const { loggedIn, borrowers, loans, toasts, removeToast, logout } = useApp();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const activeSearchQuery = searchQuery ?? localSearchQuery;
  const activeOnSearchChange = onSearchChange ?? setLocalSearchQuery;

  const suggestions = useMemo(() => {
    const value = activeSearchQuery.trim().toLowerCase();
    if (!value) return [];
    return borrowers
      .filter(
        (b) =>
          b.name.toLowerCase().includes(value) ||
          b.mobile.toLowerCase().includes(value) ||
          b.work.toLowerCase().includes(value) ||
          (b.address ?? "").toLowerCase().includes(value),
      )
      .slice(0, 5)
      .map((b) => {
        const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
        const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
        const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
        return { borrower: b, totalTaken, totalPaid, totalBalance: totalTaken - totalPaid };
      });
  }, [activeSearchQuery, borrowers, loans]);

  useEffect(() => {
    if (!loggedIn) navigate({ to: "/" });
  }, [loggedIn, navigate]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {headerLeft}
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {showSearch && (
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                className="rounded-md p-2 text-brand transition hover:bg-slate-100"
                aria-label="Toggle search"
              >
                <Search className="size-6" strokeWidth={2.5} />
              </button>
            )}
            <button
              onClick={logout}
              className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20"
              type="button"
            >
              Logout
            </button>
            <button
              onClick={() => reportCallback ? reportCallback() : navigate({ to: "/graphs" })}
              className="flex size-10 items-center justify-center rounded-full border border-border shadow-sm transition hover:bg-slate-100"
              type="button"
              aria-label="View reports"
            >
              <ClipboardList className="size-5 text-brand" />
            </button>
          </div>
        </div>
        {searchOpen && activeOnSearchChange ? (
          <div className="mt-3 space-y-3">
            <input
              className="field-input w-full"
              value={activeSearchQuery}
              onChange={(e) => activeOnSearchChange(e.target.value)}
              placeholder="Search borrowers"
              autoFocus
            />
            {activeSearchQuery ? (
              <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Search suggestions
                </p>
                {suggestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No borrowers found.</p>
                ) : (
                  <ul className="space-y-3">
                    {suggestions.map(({ borrower, totalTaken, totalPaid, totalBalance }) => (
                      <li key={borrower.id}>
                        <button
                          type="button"
                          onClick={() => {
                            activeOnSearchChange(borrower.name);
                            setSearchOpen(false);
                            navigate({
                              to: "/borrowers/$borrowerId",
                              params: { borrowerId: borrower.id },
                            });
                          }}
                          className="w-full rounded-xl border border-border bg-background p-3 text-left transition hover:bg-slate-50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">{borrower.name}</p>
                              <p className="truncate text-xs text-muted-foreground">{borrower.mobile}</p>
                            </div>
                            <span className="rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">
                              {borrower.work}
                            </span>
                          </div>
                          <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                            <div>
                              <p className="uppercase tracking-[0.2em]">Taken</p>
                              <p className="mt-1 font-semibold text-foreground">{inr(totalTaken)}</p>
                            </div>
                            <div>
                              <p className="uppercase tracking-[0.2em]">Paid</p>
                              <p className="mt-1 font-semibold text-foreground">{inr(totalPaid)}</p>
                            </div>
                            <div>
                              <p className="uppercase tracking-[0.2em]">Balance</p>
                              <p className="mt-1 font-semibold text-foreground">{inr(totalBalance)}</p>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </header>

      <main className="flex-1 pb-24">{children}</main>

      <div className="fixed bottom-28 right-4 z-30 flex flex-col items-end gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start justify-between gap-3 rounded-2xl border px-4 py-3 shadow-xl transition ${
              toast.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-destructive-200 bg-destructive-50 text-destructive-900"
            }`}
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold">{toast.type === "success" ? "Success" : "Error"}</p>
              <p className="mt-1 text-sm leading-relaxed text-current">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-full p-1 text-current opacity-70 transition hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-between border-t border-border bg-background px-2 py-2">
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-1 flex-col items-center gap-1 text-muted-foreground"
            activeProps={{ className: "flex flex-1 flex-col items-center gap-1 text-brand" }}
          >
            <Icon className="size-6" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function EmptyState({ label = "There's nothing here, yet." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-28 text-center">
      <div className="flex size-32 items-center justify-center rounded-[45%] bg-brand-soft">
        <ClipboardList className="size-14 text-brand/40" strokeWidth={1.2} />
      </div>
      <p className="text-brand">{label}</p>
    </div>
  );
}

export function Fab({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="fixed bottom-24 right-4 z-20 flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-medium tracking-wide text-brand-foreground shadow-lg"
    >
      <span className="text-2xl leading-none">+</span>
      {label}
    </Link>
  );
}
