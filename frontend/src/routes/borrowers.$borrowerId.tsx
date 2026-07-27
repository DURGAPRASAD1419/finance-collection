import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell, Field } from "@/components/app-shell";
import { fromDMY, inr, loanTotals, toDMY, type Due, useApp } from "@/lib/app-store";

export const Route = createFileRoute("/borrowers/$borrowerId")({
  head: ({ params }) => ({
    meta: [
      { title: `Borrower ${params.borrowerId} — LoanBook` },
      {
        name: "description",
        content: "Borrower details, loan history and outstanding balance.",
      },
      { property: "og:title", content: `Borrower Details — LoanBook` },
      { property: "og:description", content: "View borrower contact info and loan summary." },
    ],
  }),
  component: BorrowerDetailPage,
});

function BorrowerDetailPage() {
  const { borrowerId } = Route.useParams();
  const navigate = useNavigate();
  const { borrowers, loans, payDue, updateBorrower, notifySuccess, notifyError } = useApp();
  const borrower = borrowers.find((b) => b.id === borrowerId);
  const [loadingDueNo, setLoadingDueNo] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [collectOpen, setCollectOpen] = useState(false);
  const [paidDate, setPaidDate] = useState(toDMY(new Date()));
  const [collectedBy, setCollectedBy] = useState("Admin");
  const [receipt, setReceipt] = useState<{ loanCode: string; due: Due } | null>(null);
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    mobile2: "",
    work: "",
    address: "",
  });

  useEffect(() => {
    if (!borrower) return;
    setForm({
      name: borrower.name,
      fatherName: borrower.fatherName,
      mobile: borrower.mobile,
      mobile2: borrower.mobile2 ?? "",
      work: borrower.work,
      address: borrower.address ?? "",
    });
  }, [borrower]);

  if (!borrower) {
    return (
      <AppShell title="Borrower not found">
        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-20 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">Borrower not found</p>
            <p className="mt-3 text-sm text-muted-foreground">
              The selected borrower could not be found. Please go back and try a different record.
            </p>
            <Link
              to="/borrowers"
              className="mt-6 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"
            >
              Back to borrowers
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const borrowerLoans = loans.filter((loan) => loan.borrowerId === borrower.id);
  const totals = borrowerLoans.reduce(
    (acc, loan) => {
      const t = loanTotals(loan);
      acc.total += t.total;
      acc.paid += t.paid;
      acc.pending += t.pending;
      acc.balance += t.balance;
      return acc;
    },
    { total: 0, paid: 0, pending: 0, balance: 0 },
  );

  const nextDue = useMemo(() => {
    const openDues = borrowerLoans
      .flatMap((loan) => loan.dues.map((due) => ({ loan, due })))
      .filter(({ due }) => !due.paid)
      .sort((a, b) => fromDMY(a.due.date).getTime() - fromDMY(b.due.date).getTime());
    return openDues[0];
  }, [borrowerLoans]);

  async function handlePay(loanId: string, dueNo: number) {
    try {
      setLoadingDueNo(dueNo);
      await payDue(loanId, dueNo, toDMY(new Date()), "Admin");
      notifySuccess("Payment successfully recorded.");
    } catch (err) {
      console.error(err);
      notifyError("Unable to record payment. Please try again.");
    } finally {
      setLoadingDueNo(null);
    }
  }

  const collectors = ["Admin", "Agent 1", "Agent 2"];

  async function handleSave() {
    if (!borrower) return;
    if (!form.name || !form.fatherName || !form.mobile || !form.work || !form.address) {
      notifyError("Please fill all required borrower fields.");
      return;
    }
    try {
      await updateBorrower(borrower.id, {
        name: form.name,
        fatherName: form.fatherName,
        mobile: form.mobile,
        mobile2: form.mobile2,
        work: form.work,
        address: form.address,
      });
      setEditMode(false);
      notifySuccess("Borrower details updated.");
    } catch (err) {
      console.error(err);
      notifyError("Unable to save borrower details.");
    }
  }

  async function confirmCollect() {
    if (!nextDue) return;
    try {
      setLoadingDueNo(nextDue.due.no);
      await payDue(nextDue.loan.id, nextDue.due.no, paidDate, collectedBy || "Admin");
      setCollectOpen(false);
      setReceipt({
        loanCode: nextDue.loan.code,
        due: { ...nextDue.due, paid: true, paidDate, collectedBy: collectedBy || "Admin" },
      });
      notifySuccess("Payment collected successfully.");
    } catch (err) {
      console.error(err);
      notifyError("Unable to collect payment. Please try again.");
    } finally {
      setLoadingDueNo(null);
    }
  }

  function generateBorrowerReport() {
    const reportWindow = window.open("", "Borrower Report", "width=800,height=1000");
    if (!reportWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Borrower Report</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
          .header h1 { font-size: 24px; margin-bottom: 5px; }
          .header .date { font-size: 12px; color: #666; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 14px; font-weight: bold; background: #f0f0f0; padding: 8px; margin-bottom: 10px; border-left: 4px solid #2563eb; }
          .field-row { display: grid; grid-template-columns: 1fr 2fr; margin-bottom: 8px; font-size: 13px; }
          .field-label { font-weight: bold; color: #555; }
          .field-value { color: #000; }
          .loan-row { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 10px; padding: 8px; border-bottom: 1px solid #ddd; font-size: 12px; }
          .loan-header { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; gap: 10px; padding: 8px; background: #f0f0f0; font-weight: bold; font-size: 12px; border-bottom: 2px solid #000; }
          .summary { background: #f9f9f9; padding: 12px; border-left: 4px solid #2563eb; }
          .summary-row { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 6px; font-size: 13px; }
          .summary-label { font-weight: bold; }
          .summary-value { text-align: right; }
          .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #ddd; padding-top: 15px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Borrower Report</h1>
          <div class="date">Generated on ${new Date().toLocaleString()}</div>
        </div>

        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="field-row">
            <div class="field-label">Name</div>
            <div class="field-value">${borrower.name}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Name</div>
            <div class="field-value">${borrower.fatherName}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mobile</div>
            <div class="field-value">${borrower.mobile}</div>
          </div>
          ${borrower.mobile2 ? `
          <div class="field-row">
            <div class="field-label">Alternate Mobile</div>
            <div class="field-value">${borrower.mobile2}</div>
          </div>` : ''}
          <div class="field-row">
            <div class="field-label">Occupation</div>
            <div class="field-value">${borrower.work}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Address</div>
            <div class="field-value">${borrower.address || '—'}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Account Summary</div>
          <div class="summary">
            <div class="summary-row">
              <div class="summary-label">Total Taken</div>
              <div class="summary-value">₹${totals.total.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Total Paid</div>
              <div class="summary-value">₹${totals.paid.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Pending Due</div>
              <div class="summary-value">₹${totals.pending.toLocaleString()}</div>
            </div>
            <div class="summary-row">
              <div class="summary-label">Outstanding Balance</div>
              <div class="summary-value">₹${totals.balance.toLocaleString()}</div>
            </div>
          </div>
        </div>

        ${borrowerLoans.length > 0 ? `
        <div class="section">
          <div class="section-title">Loan Details</div>
          <div class="loan-header">
            <div>Loan Code</div>
            <div>Frequency</div>
            <div>Total Amount</div>
            <div>Paid</div>
            <div>Balance</div>
          </div>
          ${borrowerLoans.map(loan => {
            const t = loanTotals(loan);
            return `
            <div class="loan-row">
              <div>${loan.code}</div>
              <div>${loan.frequency}</div>
              <div>₹${t.total.toLocaleString()}</div>
              <div>₹${t.paid.toLocaleString()}</div>
              <div>₹${t.balance.toLocaleString()}</div>
            </div>`;
          }).join('')}
        </div>` : ''}

        <div class="footer">
          <p>This is a computer-generated report. For official records, please retain the printed copy.</p>
        </div>

        <script>
          window.print();
        </script>
      </body>
      </html>
    `;
    reportWindow.document.write(html);
    reportWindow.document.close();
  }

  return (
    <AppShell 
      title="Borrower Details" 
      reportCallback={generateBorrowerReport}
      headerLeft={<button onClick={() => window.history.back()} className="rounded-md p-2 text-brand transition hover:bg-slate-100"><ArrowLeft className="size-6" /></button>}
    >
      <div className="mx-4 space-y-6 py-4">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-foreground">{borrower.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{borrower.work}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditMode((open) => !open)}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-50"
              >
                {editMode ? "Cancel" : "Edit borrower"}
              </button>
            </div>
          </div>

          {editMode ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
              className="mt-5 space-y-4"
            >
              <Field label="Name" required>
                <input
                  className="field-input"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </Field>
              <Field label="Father name" required>
                <input
                  className="field-input"
                  value={form.fatherName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fatherName: e.target.value }))}
                />
              </Field>
              <Field label="Mobile" required>
                <input
                  className="field-input"
                  value={form.mobile}
                  onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value }))}
                />
              </Field>
              <Field label="Alt mobile">
                <input
                  className="field-input"
                  value={form.mobile2}
                  onChange={(e) => setForm((prev) => ({ ...prev, mobile2: e.target.value }))}
                />
              </Field>
              <Field label="Shop / Work" required>
                <input
                  className="field-input"
                  value={form.work}
                  onChange={(e) => setForm((prev) => ({ ...prev, work: e.target.value }))}
                />
              </Field>
              <Field label="Address" required>
                <input
                  className="field-input"
                  value={form.address}
                  onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                />
              </Field>
              <button
                type="submit"
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
              >
                Save borrower
              </button>
            </form>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailTile label="Mobile" value={borrower.mobile} />
              <DetailTile label="Alternate mobile" value={borrower.mobile2 ?? "—"} />
              <DetailTile label="Father name" value={borrower.fatherName} />
              <DetailTile label="Address" value={borrower.address ?? "—"} />
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <SummaryTile label="Total taken" value={inr(totals.total)} />
          <SummaryTile label="Total paid" value={inr(totals.paid)} />
          <SummaryTile label="Pending due" value={inr(totals.pending)} />
          <SummaryTile label="Outstanding" value={inr(totals.balance)} />
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-bold text-primary">Loan history</p>
            <div className="flex flex-wrap items-center gap-2">
              {nextDue ? (
                <div className="rounded-2xl bg-brand/5 px-4 py-2 text-sm font-semibold text-brand">
                  Next due: {nextDue.due.date} • {nextDue.loan.code}
                </div>
              ) : (
                <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  All dues paid
                </div>
              )}
              {nextDue ? (
                <button
                  type="button"
                  onClick={() => setCollectOpen(true)}
                  className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90"
                >
                  Collect payment
                </button>
              ) : null}
            </div>
          </div>
          {borrowerLoans.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No loans found for this borrower.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {borrowerLoans.map((loan) => {
                const t = loanTotals(loan);
                return (
                  <li key={loan.id} className="rounded-2xl border border-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-foreground">{loan.code}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {loan.frequency} loan • {loan.dues.length} installments
                        </p>
                      </div>
                      <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                        {loan.perInstallment ? `EMI ${inr(loan.perInstallment)}` : "EMI —"}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-4 text-sm text-muted-foreground">
                      <HistoryField label="Total" value={inr(t.total)} />
                      <HistoryField label="Paid" value={inr(t.paid)} />
                      <HistoryField label="Pending" value={inr(t.pending)} />
                      <HistoryField label="Balance" value={inr(t.balance)} />
                    </div>
                    <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Loan schedule</p>
                          <p className="text-xs text-muted-foreground">Paid and upcoming installments for {loan.code}</p>
                        </div>
                        <span className="rounded-full bg-muted/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {loan.dues.filter((d) => d.paid).length}/{loan.dues.length} paid
                        </span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {loan.dues.map((due) => (
                          <div
                            key={`${loan.id}-${due.no}`}
                            className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <p className="text-sm font-semibold text-foreground">Installment {due.no}</p>
                              <p className="text-xs text-muted-foreground">Due date: {due.date}</p>
                              <p className="mt-1 text-xs font-medium text-foreground">
                                {due.paid ? "Paid" : "Unpaid"}
                              </p>
                            </div>
                            <div className="flex flex-col items-start gap-2 sm:items-end">
                              <p className="text-sm font-semibold text-foreground">{inr(due.amount)}</p>
                              <div className="flex items-center gap-2">
                                {due.paid ? (
                                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    Paid
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                    Unpaid
                                  </span>
                                )}
                                {!due.paid ? (
                                  <button
                                    type="button"
                                    onClick={() => handlePay(loan.id, due.no)}
                                    disabled={loadingDueNo === due.no}
                                    className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/40"
                                  >
                                    {loadingDueNo === due.no ? "Saving..." : "Collect payment"}
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {collectOpen && nextDue ? (
        <Modal onClose={() => setCollectOpen(false)}>
          <h2 className="mb-6 text-center text-2xl font-bold">Collect payment</h2>
          <div className="space-y-6">
            <Field label="Borrower">
              <input className="field-input" readOnly value={borrower.name} />
            </Field>
            <Field label="Loan code">
              <input className="field-input" readOnly value={nextDue.loan.code} />
            </Field>
            <Field label="Due installment">
              <input className="field-input" readOnly value={nextDue.due.no} />
            </Field>
            <Field label="Due date">
              <input className="field-input" readOnly value={nextDue.due.date} />
            </Field>
            <Field label="Amount">
              <input className="field-input" readOnly value={inr(nextDue.due.amount)} />
            </Field>
            <Field label="Paid date">
              <input
                className="field-input"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
              />
            </Field>
            <Field label="Collected by">
              <select
                className="field-input"
                value={collectedBy}
                onChange={(e) => setCollectedBy(e.target.value)}
              >
                {collectors.map((collector) => (
                  <option key={collector} value={collector}>
                    {collector}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => setCollectOpen(false)}
              className="flex-1 rounded-md border border-border py-4 text-base font-bold tracking-wide text-foreground"
            >
              Close
            </button>
            <button
              type="button"
              onClick={confirmCollect}
              className="flex-1 rounded-md bg-brand py-4 text-base font-bold tracking-wide text-brand-foreground"
            >
              Collect payment
            </button>
          </div>
        </Modal>
      ) : null}

      {receipt ? (
        <Modal onClose={() => setReceipt(null)}>
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700">
              ✓
            </div>
            <h2 className="text-center text-2xl font-bold">Payment collected</h2>
            <p className="text-center text-sm text-muted-foreground">
              {receipt.loanCode} installment {receipt.due.no} has been marked paid.
            </p>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <span>Borrower</span>
              <span>{borrower.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Amount</span>
              <span>{inr(receipt.due.amount)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Paid date</span>
              <span>{receipt.due.paidDate}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span>Collected by</span>
              <span>{receipt.due.collectedBy}</span>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
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
                    <div class="field"><div class="label">Loan</div><div class="value">${receipt.loanCode}</div></div>
                    <div class="field"><div class="label">Borrower</div><div class="value">${borrower.name}</div></div>
                    <div class="field"><div class="label">Installment</div><div class="value">Due ${receipt.due.no}</div></div>
                    <div class="field"><div class="label">Due date</div><div class="value">${receipt.due.date}</div></div>
                    <div class="field"><div class="label">Paid date</div><div class="value">${receipt.due.paidDate}</div></div>
                    <div class="field"><div class="label">Collected by</div><div class="value">${receipt.due.collectedBy}</div></div>
                    <div class="field"><div class="label">Amount</div><div class="value">${inr(receipt.due.amount)}</div></div>
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
              }}
              className="rounded-md bg-emerald-600 px-4 py-4 text-sm font-medium text-emerald-foreground"
            >
              Print receipt
            </button>
            <button
              type="button"
              onClick={() => setReceipt(null)}
              className="rounded-md bg-brand px-4 py-4 text-sm font-medium text-brand-foreground"
            >
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </AppShell>
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

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function HistoryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
