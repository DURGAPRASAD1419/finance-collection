import { Link } from "@tanstack/react-router";
import type { Frequency, Loan, Borrower } from "@/lib/app-store";
import { inr, loanTotals } from "@/lib/app-store";

export function FrequencyTabs({
  value,
  onChange,
}: {
  value: Frequency;
  onChange: (f: Frequency) => void;
}) {
  const items: { key: Frequency; label: string }[] = [
    { key: "daily", label: "Daily\nCollections" },
    { key: "weekly", label: "Weekly\nCollections" },
    { key: "monthly", label: "Monthly\nCollections" },
  ];
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      {items.map((it) => {
        const active = value === it.key;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className="flex flex-1 items-center gap-2"
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                active ? "border-brand" : "border-muted-foreground/50"
              }`}
            >
              {active && <span className="size-3 rounded-full bg-brand" />}
            </span>
            <span
              className={`whitespace-pre-line text-left text-[15px] leading-tight ${
                active ? "text-brand" : "text-muted-foreground"
              }`}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function LoanCard({ loan, borrower }: { loan: Loan; borrower?: Borrower }) {
  const t = loanTotals(loan);
  const nextDue = loan.dues.find((d) => !d.paid);
  return (
    <Link
      to="/loan/$loanId"
      params={{ loanId: loan.id }}
      className="mx-3 mt-3 block overflow-hidden rounded-xl bg-card shadow-[0_2px_10px_rgba(0,0,0,0.10)]"
    >
      <div className="flex gap-3 p-3">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border border-border p-2 text-center text-sm font-bold text-muted-foreground">
          No image available
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <p className="truncate text-lg font-bold text-foreground">{borrower?.name ?? "—"}</p>
            <p className="text-lg text-foreground">{loan.code}</p>
          </div>
          <p className="text-base text-foreground">{borrower?.work ?? "Na"}</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xl text-foreground">{nextDue?.date ?? loan.endDate}</p>
            <p className="text-lg text-foreground">{nextDue?.no ?? loan.installments}</p>
            <span className="rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground">
              EMI {inr(loan.perInstallment)}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 px-3 text-center">
        {[
          ["Total", t.total],
          ["Paid", t.paid],
          ["Pending", t.pending],
          ["Balance", t.balance],
        ].map(([label, val]) => (
          <div key={label as string}>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-lg font-bold text-foreground">{inr(val as number)}</p>
          </div>
        ))}
      </div>
      <div className="relative m-2 h-6 overflow-hidden rounded-full bg-teal">
        <div className="h-full bg-success" style={{ width: `${t.percent}%` }} />
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-teal-foreground">
          {t.percent}%
        </span>
      </div>
    </Link>
  );
}

export function SummaryBar({
  total,
  paid,
  pending,
  balance,
}: {
  total: number;
  paid: number;
  pending: number;
  balance: number;
}) {
  const percent = total ? Math.round((paid / total) * 100) : 0;
  return (
    <div className="mx-3 flex items-center justify-between rounded-lg border border-border px-4 py-3">
      {[
        ["Total", total],
        ["Paid", paid],
        ["Pending", pending],
        ["Balance", balance],
      ].map(([label, val]) => (
        <div key={label as string} className="text-center">
          <p className="text-base text-muted-foreground">{label}</p>
          <p className="text-lg font-bold text-foreground">{val as number}</p>
        </div>
      ))}
      <div className="flex size-16 items-center justify-center rounded-full border-2 border-border text-base text-muted-foreground">
        {percent} %
      </div>
    </div>
  );
}
