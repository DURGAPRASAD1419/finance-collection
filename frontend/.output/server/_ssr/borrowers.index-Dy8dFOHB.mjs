import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr, r as fromDMY, s as useApp } from "./app-store-vl_DhqcK.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trash2, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as Fab, t as AppShell } from "./app-shell-WyGsWYV9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/borrowers.index-Dy8dFOHB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BorrowersPage() {
	const navigate = useNavigate();
	const { borrowers, loans, deleteBorrower, notifyError } = useApp();
	const [query, setQuery] = (0, import_react.useState)("");
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const value = query.trim().toLowerCase();
		if (!value) return borrowers;
		return borrowers.filter((b) => b.name.toLowerCase().includes(value) || b.mobile.toLowerCase().includes(value) || b.work.toLowerCase().includes(value) || (b.address ?? "").toLowerCase().includes(value));
	}, [borrowers, query]);
	async function handleDeleteBorrower(id, name) {
		if (!window.confirm(`Delete borrower ${name}?`)) return;
		setDeletingId(id);
		try {
			await deleteBorrower(id);
		} catch (error) {
			console.error(error);
			notifyError("Unable to delete borrower. Please try again.");
		} finally {
			setDeletingId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Borrowers",
		searchQuery: query,
		onSearchChange: setQuery,
		headerLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/dashboard" }),
			className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
		}),
		children: [
			query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-4 rounded-xl border border-border bg-card p-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground",
					children: "Search suggestions"
				}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"No borrower matches found for \"",
						query,
						"\"."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: filtered.slice(0, 5).map((b) => {
						const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
						const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
						const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
						const totalBalance = totalTaken - totalPaid;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-border bg-background px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-base font-semibold text-foreground",
										children: b.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-sm text-muted-foreground",
										children: [
											b.mobile,
											" · ",
											b.work
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
									children: "Balance"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-2 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground",
										children: "Taken"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold text-foreground",
										children: inr(totalTaken)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground",
										children: "Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold text-foreground",
										children: inr(totalPaid)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground",
										children: "Balance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold text-foreground",
										children: inr(totalBalance)
									})] })
								]
							})]
						}, b.id);
					})
				})]
			}) : null,
			filtered.length === 0 && !query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "No borrower matched your search." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: filtered.map((b) => {
					const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
					const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
					const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
					const totalBalance = totalTaken - totalPaid;
					const overdueCount = borrowerLoans.flatMap((loan) => loan.dues).filter((due) => !due.paid && fromDMY(due.date) <= /* @__PURE__ */ new Date()).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `space-y-3 rounded-2xl border px-4 py-4 shadow-sm transition ${query.trim().toLowerCase() === b.name.toLowerCase() ? "border-brand bg-brand/5" : "border-border bg-background hover:bg-slate-50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-12 items-center justify-center rounded-full bg-brand-soft text-lg font-bold text-brand",
											children: b.name.charAt(0).toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-lg font-bold text-foreground",
												children: b.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm text-muted-foreground",
												children: [
													b.mobile,
													" · ",
													b.work
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1 text-xs font-semibold ${overdueCount ? "bg-destructive/10 text-destructive" : "bg-emerald-50 text-emerald-700"}`,
										children: overdueCount ? `${overdueCount} overdue` : "On track"
									})]
								}), overdueCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive",
									children: [overdueCount, " overdue"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700",
									children: "current"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
										children: "Taken"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-lg font-bold text-foreground",
										children: inr(totalTaken)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
										children: "Paid"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-lg font-bold text-foreground",
										children: inr(totalPaid)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
										children: "Balance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-lg font-bold text-foreground",
										children: inr(totalBalance)
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleDeleteBorrower(b.id, b.name),
									disabled: deletingId === b.id,
									className: "inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20 disabled:cursor-not-allowed disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), deletingId === b.id ? "Deleting..." : "Delete"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/borrowers/$borrowerId",
									params: { borrowerId: b.id },
									className: "inline-flex rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition hover:bg-brand/90",
									children: "View details"
								})]
							})
						]
					}, b.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fab, {
				to: "/borrowers/new",
				label: "ADD BORROWER"
			})
		]
	});
}
//#endregion
export { BorrowersPage as component };
