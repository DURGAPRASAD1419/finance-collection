import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell, EmptyState, Fab } from "@/components/app-shell";
import { fromDMY, inr, loanTotals, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/borrowers/")({
  head: () => ({
    meta: [
      { title: "Borrowers — Customer Records | LoanBook" },
      {
        name: "description",
        content: "All borrower records with contact details, work and address information.",
      },
      { property: "og:title", content: "Borrowers — Customer Records | LoanBook" },
      { property: "og:description", content: "Search and manage every borrower in one list." },
    ],
  }),
  component: BorrowersPage,
});

function BorrowersPage() {
  const navigate = useNavigate();
  const { borrowers, loans, deleteBorrower, notifyError } = useApp();
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return borrowers;
    return borrowers.filter(
      (b) =>
        b.name.toLowerCase().includes(value) ||
        b.mobile.toLowerCase().includes(value) ||
        b.work.toLowerCase().includes(value) ||
        (b.address ?? "").toLowerCase().includes(value),
    );
  }, [borrowers, query]);

  async function handleDeleteBorrower(id: string, name: string) {
    if (!window.confirm(`Delete borrower ${name}?`)) return;
    setDeletingId(id);
    try {
      await deleteBorrower(id);
    } catch (error) {
      console.error(error);
      notifyError("Unable to delete borrower. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AppShell title="Borrowers" searchQuery={query} onSearchChange={setQuery} headerLeft={<button onClick={() => navigate({ to: "/dashboard" })} className="rounded-md p-2 text-brand transition hover:bg-slate-100"><ArrowLeft className="size-6" /></button>}>
      {query ? (
        <div className="mx-4 mb-4 rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Search suggestions</p>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No borrower matches found for "{query}".</p>
          ) : (
            <ul className="space-y-2">
              {filtered.slice(0, 5).map((b) => {
                const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
                const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
                const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
                const totalBalance = totalTaken - totalPaid;
                return (
                  <li key={b.id} className="rounded-xl border border-border bg-background px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-foreground">{b.name}</p>
                        <p className="truncate text-sm text-muted-foreground">{b.mobile} · {b.work}</p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Balance</span>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Taken</p>
                        <p className="mt-1 text-sm font-bold text-foreground">{inr(totalTaken)}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Paid</p>
                        <p className="mt-1 text-sm font-bold text-foreground">{inr(totalPaid)}</p>
                      </div>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Balance</p>
                        <p className="mt-1 text-sm font-bold text-foreground">{inr(totalBalance)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}

      {filtered.length === 0 && !query ? (
        <EmptyState label="No borrower matched your search." />
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((b) => {
            const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
            const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
            const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
            const totalBalance = totalTaken - totalPaid;
            const overdueCount = borrowerLoans
              .flatMap((loan) => loan.dues)
              .filter((due) => !due.paid && fromDMY(due.date) <= new Date())
              .length;
            const isSelected = query.trim().toLowerCase() === b.name.toLowerCase();

            return (
              <li
                key={b.id}
                className={`space-y-3 rounded-2xl border px-4 py-4 shadow-sm transition ${
                  isSelected ? "border-brand bg-brand/5" : "border-border bg-background hover:bg-slate-50"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand">
                        {b.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-foreground">{b.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {b.mobile} · {b.work}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        overdueCount
                          ? "bg-destructive/10 text-destructive"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {overdueCount ? `${overdueCount} overdue` : "On track"}
                    </span>
                  </div>
                  {overdueCount ? (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                      {overdueCount} overdue
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      current
                    </span>
                  )}
                </div>
                <div className="grid gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Taken</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{inr(totalTaken)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Paid</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{inr(totalPaid)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Balance</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{inr(totalBalance)}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteBorrower(b.id, b.name)}
                    disabled={deletingId === b.id}
                    className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="size-4" />
                    {deletingId === b.id ? "Deleting..." : "Delete"}
                  </button>
                  <Link
                    to="/borrowers/$borrowerId"
                    params={{ borrowerId: b.id }}
                    className="inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
                  >
                    View details
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <Fab to="/borrowers/new" label="ADD BORROWER" />
    </AppShell>
  );
}
