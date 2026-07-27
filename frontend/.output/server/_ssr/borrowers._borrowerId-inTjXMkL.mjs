import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr, o as toDMY, r as fromDMY, s as useApp } from "./app-store-B1Qbf6V1.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./borrowers._borrowerId-DSWJsXpz.mjs";
import { v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Field, t as AppShell } from "./app-shell-CRyAR8zm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/borrowers._borrowerId-inTjXMkL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BorrowerDetailPage() {
	const { borrowerId } = Route.useParams();
	useNavigate();
	const { borrowers, loans, payDue, updateBorrower, notifySuccess, notifyError } = useApp();
	const borrower = borrowers.find((b) => b.id === borrowerId);
	const [loadingDueNo, setLoadingDueNo] = (0, import_react.useState)(null);
	const [editMode, setEditMode] = (0, import_react.useState)(false);
	const [collectOpen, setCollectOpen] = (0, import_react.useState)(false);
	const [paidDate, setPaidDate] = (0, import_react.useState)(toDMY(/* @__PURE__ */ new Date()));
	const [collectedBy, setCollectedBy] = (0, import_react.useState)("Admin");
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		fatherName: "",
		mobile: "",
		mobile2: "",
		work: "",
		address: ""
	});
	(0, import_react.useEffect)(() => {
		if (!borrower) return;
		setForm({
			name: borrower.name,
			fatherName: borrower.fatherName,
			mobile: borrower.mobile,
			mobile2: borrower.mobile2 ?? "",
			work: borrower.work,
			address: borrower.address ?? ""
		});
	}, [borrower]);
	if (!borrower) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Borrower not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-20 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-bold text-foreground",
					children: "Borrower not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "The selected borrower could not be found. Please go back and try a different record."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/borrowers",
					className: "mt-6 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground",
					children: "Back to borrowers"
				})
			] })
		})
	});
	const borrowerLoans = loans.filter((loan) => loan.borrowerId === borrower.id);
	const totals = borrowerLoans.reduce((acc, loan) => {
		const t = loanTotals(loan);
		acc.total += t.total;
		acc.paid += t.paid;
		acc.pending += t.pending;
		acc.balance += t.balance;
		return acc;
	}, {
		total: 0,
		paid: 0,
		pending: 0,
		balance: 0
	});
	const nextDue = (0, import_react.useMemo)(() => {
		return borrowerLoans.flatMap((loan) => loan.dues.map((due) => ({
			loan,
			due
		}))).filter(({ due }) => !due.paid).sort((a, b) => fromDMY(a.due.date).getTime() - fromDMY(b.due.date).getTime())[0];
	}, [borrowerLoans]);
	async function handlePay(loanId, dueNo) {
		try {
			setLoadingDueNo(dueNo);
			await payDue(loanId, dueNo, toDMY(/* @__PURE__ */ new Date()), "Admin");
			notifySuccess("Payment successfully recorded.");
		} catch (err) {
			console.error(err);
			notifyError("Unable to record payment. Please try again.");
		} finally {
			setLoadingDueNo(null);
		}
	}
	const collectors = [
		"Admin",
		"Agent 1",
		"Agent 2"
	];
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
				address: form.address
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
				due: {
					...nextDue.due,
					paid: true,
					paidDate,
					collectedBy: collectedBy || "Admin"
				}
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
          <div class="date">Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</div>
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
          </div>` : ""}
          <div class="field-row">
            <div class="field-label">Occupation</div>
            <div class="field-value">${borrower.work}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Address</div>
            <div class="field-value">${borrower.address || "—"}</div>
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
          ${borrowerLoans.map((loan) => {
			const t = loanTotals(loan);
			return `
            <div class="loan-row">
              <div>${loan.code}</div>
              <div>${loan.frequency}</div>
              <div>₹${t.total.toLocaleString()}</div>
              <div>₹${t.paid.toLocaleString()}</div>
              <div>₹${t.balance.toLocaleString()}</div>
            </div>`;
		}).join("")}
        </div>` : ""}

        <div class="footer">
          <p>This is a computer-generated report. For official records, please retain the printed copy.</p>
        </div>

        <script>
          window.print();
        <\/script>
      </body>
      </html>
    `;
		reportWindow.document.write(html);
		reportWindow.document.close();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Borrower Details",
		reportCallback: generateBorrowerReport,
		headerLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => window.history.back(),
			className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 space-y-6 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-bold text-foreground",
								children: borrower.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: borrower.work
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditMode((open) => !open),
									className: "rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-50",
									children: editMode ? "Cancel" : "Edit borrower"
								})
							})]
						}), editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (event) => {
								event.preventDefault();
								handleSave();
							},
							className: "mt-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Name",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.name,
										onChange: (e) => setForm((prev) => ({
											...prev,
											name: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Father name",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.fatherName,
										onChange: (e) => setForm((prev) => ({
											...prev,
											fatherName: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Mobile",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.mobile,
										onChange: (e) => setForm((prev) => ({
											...prev,
											mobile: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Alt mobile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.mobile2,
										onChange: (e) => setForm((prev) => ({
											...prev,
											mobile2: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Shop / Work",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.work,
										onChange: (e) => setForm((prev) => ({
											...prev,
											work: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Address",
									required: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field-input",
										value: form.address,
										onChange: (e) => setForm((prev) => ({
											...prev,
											address: e.target.value
										}))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground",
									children: "Save borrower"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailTile, {
									label: "Mobile",
									value: borrower.mobile
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailTile, {
									label: "Alternate mobile",
									value: borrower.mobile2 ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailTile, {
									label: "Father name",
									value: borrower.fatherName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailTile, {
									label: "Address",
									value: borrower.address ?? "—"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
								label: "Total taken",
								value: inr(totals.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
								label: "Total paid",
								value: inr(totals.paid)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
								label: "Pending due",
								value: inr(totals.pending)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryTile, {
								label: "Outstanding",
								value: inr(totals.balance)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base font-bold text-primary",
								children: "Loan history"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [nextDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-brand/5 px-4 py-2 text-sm font-semibold text-brand",
									children: [
										"Next due: ",
										nextDue.due.date,
										" • ",
										nextDue.loan.code
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700",
									children: "All dues paid"
								}), nextDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCollectOpen(true),
									className: "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90",
									children: "Collect payment"
								}) : null]
							})]
						}), borrowerLoans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "No loans found for this borrower."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: borrowerLoans.map((loan) => {
								const t = loanTotals(loan);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-2xl border border-border p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-base font-semibold text-foreground",
												children: loan.code
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: [
													loan.frequency,
													" loan • ",
													loan.dues.length,
													" installments"
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand",
												children: loan.perInstallment ? `EMI ${inr(loan.perInstallment)}` : "EMI —"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid gap-2 sm:grid-cols-4 text-sm text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryField, {
													label: "Total",
													value: inr(t.total)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryField, {
													label: "Paid",
													value: inr(t.paid)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryField, {
													label: "Pending",
													value: inr(t.pending)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryField, {
													label: "Balance",
													value: inr(t.balance)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 rounded-2xl border border-border bg-background p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-semibold text-foreground",
													children: "Loan schedule"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: ["Paid and upcoming installments for ", loan.code]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-full bg-muted/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground",
													children: [
														loan.dues.filter((d) => d.paid).length,
														"/",
														loan.dues.length,
														" paid"
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 space-y-3",
												children: loan.dues.map((due) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-sm font-semibold text-foreground",
															children: ["Installment ", due.no]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-xs text-muted-foreground",
															children: ["Due date: ", due.date]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-1 text-xs font-medium text-foreground",
															children: due.paid ? "Paid" : "Unpaid"
														})
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col items-start gap-2 sm:items-end",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm font-semibold text-foreground",
															children: inr(due.amount)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [due.paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700",
																children: "Paid"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700",
																children: "Unpaid"
															}), !due.paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => handlePay(loan.id, due.no),
																disabled: loadingDueNo === due.no,
																className: "inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90 disabled:cursor-not-allowed disabled:bg-brand/40",
																children: loadingDueNo === due.no ? "Saving..." : "Collect payment"
															}) : null]
														})]
													})]
												}, `${loan.id}-${due.no}`))
											})]
										})
									]
								}, loan.id);
							})
						})]
					})
				]
			}),
			collectOpen && nextDue ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setCollectOpen(false),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-6 text-center text-2xl font-bold",
						children: "Collect payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Borrower",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: borrower.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Loan code",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: nextDue.loan.code
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due installment",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: nextDue.due.no
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: nextDue.due.date
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Amount",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: inr(nextDue.due.amount)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Paid date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									value: paidDate,
									onChange: (e) => setPaidDate(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Collected by",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "field-input",
									value: collectedBy,
									onChange: (e) => setCollectedBy(e.target.value),
									children: collectors.map((collector) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: collector,
										children: collector
									}, collector))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCollectOpen(false),
							className: "flex-1 rounded-md border border-border py-4 text-base font-bold tracking-wide text-foreground",
							children: "Close"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: confirmCollect,
							className: "flex-1 rounded-md bg-brand py-4 text-base font-bold tracking-wide text-brand-foreground",
							children: "Collect payment"
						})]
					})
				]
			}) : null,
			receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setReceipt(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-4 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700",
								children: "✓"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-center text-2xl font-bold",
								children: "Payment collected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-center text-sm text-muted-foreground",
								children: [
									receipt.loanCode,
									" installment ",
									receipt.due.no,
									" has been marked paid."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Borrower" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: borrower.name })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(receipt.due.amount) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paid date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: receipt.due.paidDate })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collected by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: receipt.due.collectedBy })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
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
                    <script>window.print();<\/script>
                  </body>
                  </html>
                `;
								const win = window.open("", "Payment Receipt", "width=600,height=800");
								if (win) {
									win.document.write(content);
									win.document.close();
								}
							},
							className: "rounded-md bg-emerald-600 px-4 py-4 text-sm font-medium text-emerald-foreground",
							children: "Print receipt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setReceipt(null),
							className: "rounded-md bg-brand px-4 py-4 text-sm font-medium text-brand-foreground",
							children: "Close"
						})]
					})
				]
			}) : null
		]
	});
}
function Modal({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex items-center justify-center bg-foreground/50 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-card p-5 shadow-xl",
			children
		})]
	});
}
function DetailTile({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-background p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-base font-semibold text-foreground",
			children: value
		})]
	});
}
function SummaryTile({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-background p-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-lg font-bold text-foreground",
			children: value
		})]
	});
}
function HistoryField({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-semibold text-foreground",
		children: value
	})] });
}
//#endregion
export { BorrowerDetailPage as component };
