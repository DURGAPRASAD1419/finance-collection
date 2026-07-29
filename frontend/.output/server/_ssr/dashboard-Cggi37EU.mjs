import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr, o as toDMY, r as fromDMY, s as useApp } from "./app-store-vl_DhqcK.mjs";
import { t as AppShell } from "./app-shell-WyGsWYV9.mjs";
import { r as SummaryBar } from "./loan-ui-BBydvwfS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Cggi37EU.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { loans, borrowers } = useApp();
	const agg = loans.reduce((acc, l) => {
		const t = loanTotals(l);
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
	const groups = [
		{
			key: "daily",
			label: "Daily Collections"
		},
		{
			key: "weekly",
			label: "Weekly Collections"
		},
		{
			key: "monthly",
			label: "Monthly Collections"
		}
	];
	const today = toDMY(/* @__PURE__ */ new Date());
	const overdueCount = loans.flatMap((loan) => loan.dues).filter((due) => !due.paid && fromDMY(due.date) <= fromDMY(today)).length;
	const topBorrower = borrowers.map((borrower) => {
		return {
			borrower,
			balance: loans.filter((loan) => loan.borrowerId === borrower.id).reduce((sum, loan) => sum + loanTotals(loan).balance, 0)
		};
	}).sort((a, b) => b.balance - a.balance)[0]?.borrower;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryBar, { ...agg }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-3 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Borrowers",
							value: String(borrowers.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Active loans",
							value: String(loans.length)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Collected",
							value: inr(agg.paid)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Outstanding",
							value: inr(agg.balance)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Overdue dues",
							value: String(overdueCount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Top balance",
							value: topBorrower ? `${topBorrower.name}` : "—"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-3 space-y-3",
					children: groups.map((g) => {
						const sub = loans.filter((l) => l.frequency === g.key);
						const t = sub.reduce((acc, l) => {
							const x = loanTotals(l);
							acc.paid += x.paid;
							acc.total += x.total;
							return acc;
						}, {
							paid: 0,
							total: 0
						});
						const percent = t.total ? Math.round(t.paid / t.total * 100) : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-bold text-primary",
										children: g.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [sub.length, " loans"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-3 overflow-hidden rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-brand",
										style: { width: `${percent}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: [
										inr(t.paid),
										" collected of ",
										inr(t.total)
									]
								})
							]
						}, g.key);
					})
				})
			]
		})
	});
}
function StatCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xl font-bold text-primary",
			children: value
		})]
	});
}
//#endregion
export { DashboardPage as component };
