import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, HandCoins, Share2, X } from "lucide-react";
import { useState } from "react";
import { Field } from "@/components/app-shell";
import { inr, loanTotals, toDMY, useApp, type Due } from "@/lib/app-store";

export const Route = createFileRoute("/loan/$loanId")({
  head: () => ({
    meta: [
      { title: "Loan Transactions & Payments — LoanBook" },
      {
        name: "description",
        content: "Full installment schedule for a loan with due dates, paid dates and payment collection.",
      },
      { property: "og:title", content: "Loan Transactions & Payments — LoanBook" },
      { property: "og:description", content: "Track every due and collect payments instantly." },
    ],
  }),
  component: LoanDetailPage,
});

const collectors = ["Self", "Agent 1", "Agent 2"];

function LoanDetailPage() {
  const { loanId } = Route.useParams();
  const { loans, borrowers, payDue, notifySuccess, notifyError } = useApp();
  const navigate = useNavigate();
  const loan = loans.find((l) => l.id === loanId);

  const [payOpen, setPayOpen] = useState(false);
  const [receipt, setReceipt] = useState<Due | null>(null);
  const [paidDate, setPaidDate] = useState(toDMY(new Date()));
  const [collectedBy, setCollectedBy] = useState("");

  if (!loan) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <button onClick={() => navigate({ to: "/loan" })} className="text-brand underline">
          Loan not found — back to loans
        </button>
      </div>
    );
  }

  const borrower = borrowers.find((b) => b.id === loan.borrowerId);
  const t = loanTotals(loan);
  const nextDue = loan.dues.find((d) => !d.paid);
  const paidCount = loan.dues.filter((d) => d.paid).length;
  const pendingCount = loan.dues.filter(
    (d) => !d.paid && new Date(d.date.split("/").reverse().join("-")) <= new Date(),
  ).length;

  const confirmPay = async () => {
    if (!nextDue) return;
    try {
      await payDue(loan.id, nextDue.no, paidDate, collectedBy || "Self");
      setReceipt({ ...nextDue, paid: true, paidDate, collectedBy: collectedBy || "Self" });
      setPayOpen(false);
      notifySuccess("Payment recorded successfully.");
    } catch (err) {
      console.error(err);
      notifyError("Unable to record payment. Please try again.");
    }
  };

  const printReceipt = () => {
    if (!receipt) return;
    const content = `
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
          h1 { font-size: 24px; margin-bottom: 12px; }
          .field { margin-bottom: 10px; }
          .label { color: #555; font-size: 0.9rem; margin-bottom: 4px; }
          .value { font-size: 1.1rem; font-weight: 700; }
          .badge { display: inline-flex; padding: 6px 10px; border-radius: 999px; background: #def7ec; color: #064e3b; margin-top: 8px; }
        </style>
      </head>
      <body>
        <h1>Payment Receipt</h1>
        <div class="field"><div class="label">Loan</div><div class="value">${loan.code}</div></div>
        <div class="field"><div class="label">Borrower</div><div class="value">${borrower?.name ?? "—"}</div></div>
        <div class="field"><div class="label">Installment</div><div class="value">Due ${receipt.no}</div></div>
        <div class="field"><div class="label">Due date</div><div class="value">${receipt.date}</div></div>
        <div class="field"><div class="label">Paid date</div><div class="value">${receipt.paidDate ?? "—"}</div></div>
        <div class="field"><div class="label">Collected by</div><div class="value">${receipt.collectedBy ?? "Self"}</div></div>
        <div class="field"><div class="label">Amount</div><div class="value">${inr(receipt.amount)}</div></div>
        <div class="badge">Thank you for your payment</div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    const win = window.open("", "Payment Receipt", "width=600,height=800");
    if (win) {
      win.document.write(content);
      win.document.close();
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-28">
      <header className="flex items-center justify-between px-4 py-3">
        <Link to="/loan">
          <ArrowLeft className="size-6 text-brand" />
        </Link>
        <Share2 className="size-6 text-brand" />
      </header>

      <h1 className="px-4 pb-3 text-2xl font-bold text-primary">{loan.code} Transactions</h1>

      <div className="mx-3 overflow-hidden rounded-xl bg-card shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <div className="flex gap-3 p-3">
          <div className="flex size-24 shrink-0 items-center justify-center rounded-lg border border-border p-2 text-center text-sm font-bold text-muted-foreground">
            No image available
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between">
              <p className="truncate text-lg font-bold">{borrower?.name}</p>
              <p className="text-lg">{loan.code}</p>
            </div>
            <p className="text-base">{borrower?.work ?? "Na"}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xl">{nextDue?.date ?? loan.endDate}</p>
              <span className="rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground">
                EMI {inr(loan.perInstallment)}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 px-3 pb-1 text-center text-sm text-muted-foreground">
          <span>Total [{loan.dues.length}]</span>
          <span>Paid [{paidCount}]</span>
          <span>Pending [{pendingCount}]</span>
          <span>Balance [{loan.dues.length - paidCount}]</span>
        </div>
        <div className="relative m-2 h-6 overflow-hidden rounded-full bg-teal">
          <div className="h-full bg-success" style={{ width: `${t.percent}%` }} />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-teal-foreground">
            {t.percent}%
          </span>
        </div>
      </div>

      <table className="mt-4 w-full border-collapse text-center text-base">
        <thead>
          <tr className="bg-muted text-muted-foreground">
            <th className="border border-border py-2 font-medium">Due</th>
            <th className="border border-border py-2 font-medium">Due Date</th>
            <th className="border border-border py-2 font-medium">Paid</th>
            <th className="border border-border py-2 font-medium">Paid Date</th>
          </tr>
        </thead>
        <tbody>
          {loan.dues.map((d) => (
            <tr key={d.no}>
              <td className="border border-border py-3">{d.no}</td>
              <td className="border border-border py-3">{d.date}</td>
              <td className="border border-border py-3">{d.paid ? inr(d.amount) : "₹ 0"}</td>
              <td className="border border-border py-3">{d.paidDate ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {nextDue && (
        <button
          onClick={() => setPayOpen(true)}
          className="fixed bottom-6 right-4 z-20 flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-lg tracking-wide text-primary-foreground shadow-lg"
        >
          <HandCoins className="size-6" />
          COLLECT PAYMENT
        </button>
      )}

      {payOpen && nextDue && (
        <Modal onClose={() => setPayOpen(false)}>
          <h2 className="mb-6 text-center text-2xl font-bold">{loan.code} Payment</h2>
          <div className="space-y-6">
            <Field label="Name">
              <input className="field-input" readOnly value={borrower?.name ?? ""} />
            </Field>
            <Field label="Due No">
              <input className="field-input" readOnly value={nextDue.no} />
            </Field>
            <Field label="Due Amount">
              <input className="field-input" readOnly value={inr(nextDue.amount)} />
            </Field>
            <Field label="Due Date">
              <input className="field-input" readOnly value={nextDue.date} />
            </Field>
            <Field label="Paid Date">
              <input
                className="field-input"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
              />
            </Field>
            <Field label="Collected By">
              <select
                className="field-input"
                value={collectedBy}
                onChange={(e) => setCollectedBy(e.target.value)}
              >
                <option value="">Select</option>
                {collectors.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setPayOpen(false)}
              className="flex-1 rounded-md border border-border py-4 text-base font-bold tracking-wide text-foreground"
            >
              CLOSE
            </button>
            <button
              onClick={confirmPay}
              className="flex-1 rounded-md bg-brand py-4 text-base font-bold tracking-wide text-brand-foreground"
            >
              PAY LOAN
            </button>
          </div>
        </Modal>
      )}

      {receipt && (
        <Modal onClose={() => setReceipt(null)}>
          <button
            onClick={() => setReceipt(null)}
            className="absolute right-5 top-4 text-destructive"
            aria-label="Close receipt"
          >
            <X className="size-8" />
          </button>
          <div className="flex flex-col items-center pt-4">
            <span className="flex size-20 items-center justify-center rounded-full bg-success">
              <Check className="size-12 text-success-foreground" strokeWidth={3} />
            </span>
            <h2 className="mt-4 text-3xl font-bold text-success">Payment Successful!</h2>
            <p className="mt-3 text-lg">{loan.code} Payment report</p>
          </div>
          <div className="my-6 border-t border-dashed border-border" />
          <div className="grid grid-cols-2 gap-y-6 px-2 text-lg">
            <span>{borrower?.name}</span>
            <span>Due {receipt.no}</span>
            <span>Due {receipt.date}</span>
            <span>Paid {receipt.paidDate}</span>
          </div>
          <p className="mt-6 text-center text-2xl font-bold">{inr(receipt.amount)}</p>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {["Text share", "Image share", "WhatsApp", "SMS"].map((label) => (
              <button
                key={label}
                className="rounded-md bg-brand px-1 py-3 text-sm font-medium text-brand-foreground"
              >
                {label}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/50 p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-card p-5 shadow-xl">
        {children}
      </div>
    </div>
  );
}
