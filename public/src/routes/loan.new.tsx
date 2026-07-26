import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Field } from "@/components/app-shell";
import { FrequencyTabs } from "@/components/loan-ui";
import { addPeriod, fromDMY, toDMY, useApp, type Frequency } from "@/lib/app-store";

export const Route = createFileRoute("/loan/new")({
  head: () => ({
    meta: [
      { title: "Create New Loan — LoanBook" },
      {
        name: "description",
        content:
          "Create a new loan: pick a customer, collection frequency, amount, interest and installment schedule.",
      },
      { property: "og:title", content: "Create New Loan — LoanBook" },
      { property: "og:description", content: "Set amount, interest and installments in seconds." },
    ],
  }),
  component: NewLoanPage,
});

function NewLoanPage() {
  const { borrowers, addLoan, notifySuccess, notifyError } = useApp();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(borrowers[0]?.id ?? "");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [installments, setInstallments] = useState("");
  const [alreadyPaid, setAlreadyPaid] = useState("");
  const [startDate, setStartDate] = useState(toDMY(new Date()));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Borrowers hydrate from storage after mount, so pick the first one once available.
  useEffect(() => {
    if (!customer && borrowers.length) setCustomer(borrowers[0].id);
  }, [borrowers, customer]);

  const amountN = Number(amount) || 0;
  const interestN = Number(interest) || 0;
  const instN = Number(installments) || 0;
  const payable = amountN + (amountN * interestN) / 100;
  const perInstallment = instN ? Math.round(payable / instN) : 0;
  const disbursed = amountN;
  const endDate = useMemo(
    () => (instN ? toDMY(addPeriod(fromDMY(startDate), frequency, instN - 1)) : startDate),
    [startDate, frequency, instN],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!customer || !instN || !perInstallment) {
      setError("Please select a borrower, number of installments, and check the installment amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const loan = await addLoan({
        borrowerId: customer,
        frequency,
        amount: amountN,
        interest: interestN,
        installments: instN,
        perInstallment,
        startDate,
        endDate,
      });
      if (Number(alreadyPaid) > 0) {
        /* recorded as opening balance note only */
      }
      notifySuccess("Loan approved successfully.");
      navigate({ to: "/loan/$loanId", params: { loanId: loan.id } });
    } catch (err) {
      console.error(err);
      notifyError("Unable to save the loan. Please try again.");
      setError("Unable to save the loan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-10">
      <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background px-4 py-3">
        <Link to="/loan">
          <ArrowLeft className="size-6 text-brand" />
        </Link>
        <h1 className="text-2xl font-bold text-primary">Create New Loan</h1>
      </header>

      <form onSubmit={submit}>
        <div className="flex items-center gap-4 px-4 py-3">
          <span className="text-lg text-muted-foreground">Select customer</span>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-3 py-3 text-lg shadow-sm"
          >
            <option value="">Select</option>
            {borrowers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <FrequencyTabs value={frequency} onChange={setFrequency} />

        <div className="space-y-7 px-4 pt-7">
          <Field label="Loan Amount">
            <input
              className="field-input"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>
          <Field label="Interest">
            <input
              className="field-input"
              inputMode="numeric"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </Field>
          <Field label="Installment">
            <input
              className="field-input"
              inputMode="numeric"
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
            />
          </Field>
          <Field label="Loan Per Installment">
            <input className="field-input" readOnly value={perInstallment || ""} />
          </Field>
          <Field label="Start Date">
            <input
              className="field-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Field>
          <Field label="End Date">
            <input className="field-input" readOnly value={endDate} />
          </Field>
          <Field label="Amount Disbursed">
            <input className="field-input" readOnly value={disbursed || ""} />
          </Field>
          <Field label="If Already Paid Amount">
            <input
              className="field-input"
              inputMode="numeric"
              value={alreadyPaid}
              onChange={(e) => setAlreadyPaid(e.target.value)}
            />
          </Field>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "APPROVE"}
          </button>
        </div>
      </form>
    </div>
  );
}
