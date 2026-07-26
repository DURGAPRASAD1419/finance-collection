import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { AppShell, EmptyState, Fab } from "@/components/app-shell";
import { FrequencyTabs, LoanCard } from "@/components/loan-ui";
import { useApp, type Frequency } from "@/lib/app-store";

export const Route = createFileRoute("/loan/")({
  head: () => ({
    meta: [
      { title: "Loans — Daily, Weekly & Monthly Collections" },
      {
        name: "description",
        content:
          "Browse every active loan by collection frequency with EMI, paid, pending and balance figures.",
      },
      { property: "og:title", content: "Loans — Daily, Weekly & Monthly Collections" },
      { property: "og:description", content: "Every active loan with EMI and repayment progress." },
    ],
  }),
  component: LoanListPage,
});

function LoanListPage() {
  const navigate = useNavigate();
  const { loans, borrowers } = useApp();
  const [freq, setFreq] = useState<Frequency>("daily");
  const list = loans.filter((l) => l.frequency === freq);

  return (
    <AppShell title="Loan" headerLeft={<button onClick={() => navigate({ to: "/dashboard" })} className="rounded-md p-2 text-brand transition hover:bg-slate-100"><ArrowLeft className="size-6" /></button>}>
      <FrequencyTabs value={freq} onChange={setFreq} />
      {list.length === 0 ? (
        <EmptyState />
      ) : (
        list.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            borrower={borrowers.find((b) => b.id === loan.borrowerId)}
          />
        ))
      )}
      <Fab to="/loan/new" label="ADD LOAN" />
    </AppShell>
  );
}
