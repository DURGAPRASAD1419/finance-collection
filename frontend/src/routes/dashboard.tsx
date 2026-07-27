import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SummaryBar } from "@/components/loan-ui";
import { fromDMY, inr, loanTotals, toDMY, useApp, type Frequency } from "@/lib/app-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LoanBook Collections" },
      {
        name: "description",
        content: "Overview of total loan value, amount collected, pending dues and outstanding balance.",
      },
      { property: "og:title", content: "Dashboard — LoanBook Collections" },
      { property: "og:description", content: "Totals, collections and pending dues at a glance." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { loans, borrowers } = useApp();

  const agg = loans.reduce(
    (acc, l) => {
      const t = loanTotals(l);
      acc.total += t.total;
      acc.paid += t.paid;
      acc.pending += t.pending;
      acc.balance += t.balance;
      return acc;
    },
    { total: 0, paid: 0, pending: 0, balance: 0 },
  );

  const groups: { key: Frequency; label: string }[] = [
    { key: "daily", label: "Daily Collections" },
    { key: "weekly", label: "Weekly Collections" },
    { key: "monthly", label: "Monthly Collections" },
  ];

  const today = toDMY(new Date());
  const overdueCount = loans
    .flatMap((loan) => loan.dues)
    .filter((due) => !due.paid && fromDMY(due.date) <= fromDMY(today)).length;

  const borrowerBalances = borrowers.map((borrower) => {
    const borrowerLoans = loans.filter((loan) => loan.borrowerId === borrower.id);
    const balance = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).balance, 0);
    return { borrower, balance };
  });
  const topBorrower = borrowerBalances.sort((a, b) => b.balance - a.balance)[0]?.borrower;

  return (
    <AppShell title="Dashboard">
      <div className="space-y-4 py-4">
        <SummaryBar {...agg} />

        <div className="mx-3 grid grid-cols-2 gap-3">
          <StatCard label="Borrowers" value={String(borrowers.length)} />
          <StatCard label="Active loans" value={String(loans.length)} />
          <StatCard label="Collected" value={inr(agg.paid)} />
          <StatCard label="Outstanding" value={inr(agg.balance)} />
          <StatCard label="Overdue dues" value={String(overdueCount)} />
          <StatCard label="Top balance" value={topBorrower ? `${topBorrower.name}` : "—"} />
        </div>

        <div className="mx-3 space-y-3">
          {groups.map((g) => {
            const sub = loans.filter((l) => l.frequency === g.key);
            const t = sub.reduce(
              (acc, l) => {
                const x = loanTotals(l);
                acc.paid += x.paid;
                acc.total += x.total;
                return acc;
              },
              { paid: 0, total: 0 },
            );
            const percent = t.total ? Math.round((t.paid / t.total) * 100) : 0;
            return (
              <div key={g.key} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-primary">{g.label}</p>
                  <p className="text-sm text-muted-foreground">{sub.length} loans</p>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {inr(t.paid)} collected of {inr(t.total)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold text-primary">{value}</p>
    </div>
  );
}
