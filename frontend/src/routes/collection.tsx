import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { AppShell, EmptyState } from "@/components/app-shell";
import { FrequencyTabs } from "@/components/loan-ui";
import { fromDMY, inr, toDMY, useApp, type Frequency } from "@/lib/app-store";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Today's Collection — LoanBook" },
      {
        name: "description",
        content: "See every installment due today and mark collections as they are received.",
      },
      { property: "og:title", content: "Today's Collection — LoanBook" },
      { property: "og:description", content: "Daily collection sheet for your field agents." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const navigate = useNavigate();
  const { loans, borrowers } = useApp();
  const [freq, setFreq] = useState<Frequency>("daily");
  const today = toDMY(new Date());

  const rows = loans
    .filter((l) => l.frequency === freq)
    .flatMap((l) =>
      l.dues
        .filter((d) => !d.paid && fromDMY(d.date) <= fromDMY(today))
        .map((d) => ({ loan: l, due: d })),
    );

  const totalDue = rows.reduce((s, r) => s + r.due.amount, 0);

  return (
    <AppShell title="Collection" headerLeft={<button onClick={() => navigate({ to: "/dashboard" })} className="rounded-md p-2 text-brand transition hover:bg-slate-100"><ArrowLeft className="size-6" /></button>}>
      <FrequencyTabs value={freq} onChange={setFreq} />
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-base text-muted-foreground">Due up to {today}</p>
        <p className="text-lg font-bold text-primary">{inr(totalDue)}</p>
      </div>
      {rows.length === 0 ? (
        <EmptyState label="No collections due right now." />
      ) : (
        <ul className="divide-y divide-border">
          {rows.map(({ loan, due }) => (
            <li key={`${loan.id}-${due.no}`} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">
                  {borrowers.find((b) => b.id === loan.borrowerId)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {loan.code} · Due {due.no} · {due.date}
                </p>
              </div>
              <span className="rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground">
                {inr(due.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
