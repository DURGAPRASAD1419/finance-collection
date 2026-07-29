import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr } from "./app-store-vl_DhqcK.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loan-ui-BBydvwfS.js
var import_jsx_runtime = require_jsx_runtime();
function FrequencyTabs({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-between border-b border-border px-4 py-3",
		children: [
			{
				key: "daily",
				label: "Daily\nCollections"
			},
			{
				key: "weekly",
				label: "Weekly\nCollections"
			},
			{
				key: "monthly",
				label: "Monthly\nCollections"
			}
		].map((it) => {
			const active = value === it.key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(it.key),
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-brand" : "border-muted-foreground/50"}`,
					children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-brand" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `whitespace-pre-line text-left text-[15px] leading-tight ${active ? "text-brand" : "text-muted-foreground"}`,
					children: it.label
				})]
			}, it.key);
		})
	});
}
function LoanCard({ loan, borrower }) {
	const t = loanTotals(loan);
	const nextDue = loan.dues.find((d) => !d.paid);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/loan/$loanId",
		params: { loanId: loan.id },
		className: "mx-3 mt-3 block overflow-hidden rounded-xl bg-card shadow-[0_2px_10px_rgba(0,0,0,0.10)]",
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
								className: "truncate text-lg font-bold text-foreground",
								children: borrower?.name ?? "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-foreground",
								children: loan.code
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-foreground",
							children: borrower?.work ?? "Na"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xl text-foreground",
									children: nextDue?.date ?? loan.endDate
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg text-foreground",
									children: nextDue?.no ?? loan.installments
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground",
									children: ["EMI ", inr(loan.perInstallment)]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 px-3 text-center",
				children: [
					["Total", t.total],
					["Paid", t.paid],
					["Pending", t.pending],
					["Balance", t.balance]
				].map(([label, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-bold text-foreground",
					children: inr(val)
				})] }, label))
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
	});
}
function SummaryBar({ total, paid, pending, balance }) {
	const percent = total ? Math.round(paid / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-3 flex items-center justify-between rounded-lg border border-border px-4 py-3",
		children: [[
			["Total", total],
			["Paid", paid],
			["Pending", pending],
			["Balance", balance]
		].map(([label, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-bold text-foreground",
				children: val
			})]
		}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex size-16 items-center justify-center rounded-full border-2 border-border text-base text-muted-foreground",
			children: [percent, " %"]
		})]
	});
}
//#endregion
export { LoanCard as n, SummaryBar as r, FrequencyTabs as t };
