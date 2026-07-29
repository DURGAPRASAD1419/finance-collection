import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr, o as toDMY, s as useApp } from "./app-store-vl_DhqcK.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as HandCoins, g as Check, o as Share2, t as X, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Field } from "./app-shell-WyGsWYV9.mjs";
import { t as Route } from "./loan._loanId-BhiPhAKz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loan._loanId-PfPe5pux.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var collectors = [
	"Self",
	"Agent 1",
	"Agent 2"
];
function LoanDetailPage() {
	const { loanId } = Route.useParams();
	const { loans, borrowers, payDue, notifySuccess, notifyError } = useApp();
	const navigate = useNavigate();
	const loan = loans.find((l) => l.id === loanId);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	const [paidDate, setPaidDate] = (0, import_react.useState)(toDMY(/* @__PURE__ */ new Date()));
	const [collectedBy, setCollectedBy] = (0, import_react.useState)("");
	if (!loan) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex min-h-screen max-w-md items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/loan" }),
			className: "text-brand underline",
			children: "Loan not found — back to loans"
		})
	});
	const borrower = borrowers.find((b) => b.id === loan.borrowerId);
	const t = loanTotals(loan);
	const nextDue = loan.dues.find((d) => !d.paid);
	const paidCount = loan.dues.filter((d) => d.paid).length;
	const pendingCount = loan.dues.filter((d) => !d.paid && new Date(d.date.split("/").reverse().join("-")) <= /* @__PURE__ */ new Date()).length;
	const confirmPay = async () => {
		if (!nextDue) return;
		try {
			await payDue(loan.id, nextDue.no, paidDate, collectedBy || "Self");
			setReceipt({
				...nextDue,
				paid: true,
				paidDate,
				collectedBy: collectedBy || "Self"
			});
			setPayOpen(false);
			notifySuccess("Payment recorded successfully.");
		} catch (err) {
			console.error(err);
			notifyError("Unable to record payment. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen w-full max-w-md bg-background pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loan",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6 text-brand" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-6 text-brand" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "px-4 pb-3 text-2xl font-bold text-primary",
				children: [loan.code, " Transactions"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 overflow-hidden rounded-xl bg-card shadow-[0_2px_10px_rgba(0,0,0,0.10)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-24 shrink-0 items-center justify-center rounded-lg border border-border p-2 text-center text-sm font-bold text-muted-foreground",
							children: "No image available"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-lg font-bold",
										children: borrower?.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg",
										children: loan.code
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-base",
									children: borrower?.work ?? "Na"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl",
										children: nextDue?.date ?? loan.endDate
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground",
										children: ["EMI ", inr(loan.perInstallment)]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 px-3 pb-1 text-center text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Total [",
								loan.dues.length,
								"]"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Paid [",
								paidCount,
								"]"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Pending [",
								pendingCount,
								"]"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Balance [",
								loan.dues.length - paidCount,
								"]"
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative m-2 h-6 overflow-hidden rounded-full bg-teal",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-success",
							style: { width: `${t.percent}%` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute inset-0 flex items-center justify-center text-sm font-bold text-teal-foreground",
							children: [t.percent, "%"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-4 w-full border-collapse text-center text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "bg-muted text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-border py-2 font-medium",
							children: "Due"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-border py-2 font-medium",
							children: "Due Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-border py-2 font-medium",
							children: "Paid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border border-border py-2 font-medium",
							children: "Paid Date"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: loan.dues.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border py-3",
						children: d.no
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border py-3",
						children: d.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border py-3",
						children: d.paid ? inr(d.amount) : "₹ 0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border border-border py-3",
						children: d.paidDate ?? ""
					})
				] }, d.no)) })]
			}),
			nextDue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setPayOpen(true),
				className: "fixed bottom-6 right-4 z-20 flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-lg tracking-wide text-primary-foreground shadow-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandCoins, { className: "size-6" }), "COLLECT PAYMENT"]
			}),
			payOpen && nextDue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setPayOpen(false),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-6 text-center text-2xl font-bold",
						children: [loan.code, " Payment"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: borrower?.name ?? ""
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due No",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: nextDue.no
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due Amount",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: inr(nextDue.amount)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Due Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									readOnly: true,
									value: nextDue.date
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Paid Date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field-input",
									value: paidDate,
									onChange: (e) => setPaidDate(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Collected By",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field-input",
									value: collectedBy,
									onChange: (e) => setCollectedBy(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select"
									}), collectors.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPayOpen(false),
							className: "flex-1 rounded-md border border-border py-4 text-base font-bold tracking-wide text-foreground",
							children: "CLOSE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: confirmPay,
							className: "flex-1 rounded-md bg-brand py-4 text-base font-bold tracking-wide text-brand-foreground",
							children: "PAY LOAN"
						})]
					})
				]
			}),
			receipt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				onClose: () => setReceipt(null),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setReceipt(null),
						className: "absolute right-5 top-4 text-destructive",
						"aria-label": "Close receipt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-20 items-center justify-center rounded-full bg-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									className: "size-12 text-success-foreground",
									strokeWidth: 3
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-3xl font-bold text-success",
								children: "Payment Successful!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-lg",
								children: [loan.code, " Payment report"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 border-t border-dashed border-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-y-6 px-2 text-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: borrower?.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Due ", receipt.no] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Due ", receipt.date] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Paid ", receipt.paidDate] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-2xl font-bold",
						children: inr(receipt.amount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-4 gap-2",
						children: [
							"Text share",
							"Image share",
							"WhatsApp",
							"SMS"
						].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "rounded-md bg-brand px-1 py-3 text-sm font-medium text-brand-foreground",
							children: label
						}, label))
					})
				]
			})
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
//#endregion
export { LoanDetailPage as component };
