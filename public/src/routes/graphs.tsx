import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/app-shell";
import { SummaryBar } from "@/components/loan-ui";
import { loanTotals, useApp, type Frequency } from "@/lib/app-store";

export const Route = createFileRoute("/graphs")({
  head: () => ({
    meta: [
      { title: "Graphs & Collection Reports — LoanBook" },
      {
        name: "description",
        content: "Charts comparing daily, weekly and monthly collections against total loan value.",
      },
      { property: "og:title", content: "Graphs & Collection Reports — LoanBook" },
      { property: "og:description", content: "Visualise collections and outstanding balances." },
    ],
  }),
  component: GraphsPage,
});

const sections: { key: Frequency | "all"; label: string; color: string }[] = [
  { key: "daily", label: "Daily Collections", color: "var(--chart-1)" },
  { key: "weekly", label: "Weekly Collections", color: "var(--chart-2)" },
  { key: "monthly", label: "Monthly Collections", color: "var(--chart-3)" },
  { key: "all", label: "Over All Total", color: "var(--brand)" },
];

function GraphsPage() {
  const navigate = useNavigate();
  const { loans } = useApp();

  return (
    <AppShell title="Graphs" showSearch={false} headerLeft={<button onClick={() => navigate({ to: "/dashboard" })} className="rounded-md p-2 text-brand transition hover:bg-slate-100"><ArrowLeft className="size-6" /></button>}>
      <div className="space-y-6 py-4">
        {sections.map((s) => {
          const subset = s.key === "all" ? loans : loans.filter((l) => l.frequency === s.key);
          const agg = subset.reduce(
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
          const data = [
            { name: "Total", value: agg.total },
            { name: "Paid", value: agg.paid },
            { name: "Pending", value: agg.pending },
            { name: "Balance", value: agg.balance },
          ];
          const hasData = agg.total > 0;
          return (
            <section key={s.key} className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <span className="size-5 rounded-sm" style={{ backgroundColor: s.color }} />
                <h2 className="text-xl font-bold text-foreground">{s.label}</h2>
              </div>
              <div className="h-64 px-3">
                {hasData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                      <YAxis stroke="var(--muted-foreground)" width={44} />
                      <Tooltip />
                      <Bar dataKey="value" fill={s.color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center border-b border-l border-border">
                    <p className="text-xl text-foreground">No chart data available</p>
                  </div>
                )}
              </div>
              <SummaryBar {...agg} />
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
