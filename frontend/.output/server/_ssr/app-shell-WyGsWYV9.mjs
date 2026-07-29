import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, i as inr, s as useApp } from "./app-store-vl_DhqcK.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChartColumn, d as House, h as ClipboardList, l as ListChecks, n as Users, s as Search, t as X, u as IndianRupee } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-WyGsWYV9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: House
	},
	{
		to: "/collection",
		label: "Collection",
		icon: IndianRupee
	},
	{
		to: "/loan",
		label: "Loan",
		icon: ListChecks
	},
	{
		to: "/borrowers",
		label: "Borrowers",
		icon: Users
	},
	{
		to: "/graphs",
		label: "Reports",
		icon: ChartColumn
	}
];
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "field-label",
			children: [
				label,
				" ",
				required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-destructive",
					children: "*"
				})
			]
		}), children]
	});
}
function AppShell({ title, children, showSearch = true, searchQuery, onSearchChange, headerLeft, reportCallback }) {
	const { loggedIn, borrowers, loans, toasts, removeToast, logout } = useApp();
	const navigate = useNavigate();
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [localSearchQuery, setLocalSearchQuery] = (0, import_react.useState)("");
	const activeSearchQuery = searchQuery ?? localSearchQuery;
	const activeOnSearchChange = onSearchChange ?? setLocalSearchQuery;
	const suggestions = (0, import_react.useMemo)(() => {
		const value = activeSearchQuery.trim().toLowerCase();
		if (!value) return [];
		return borrowers.filter((b) => b.name.toLowerCase().includes(value) || b.mobile.toLowerCase().includes(value) || b.work.toLowerCase().includes(value) || (b.address ?? "").toLowerCase().includes(value)).slice(0, 5).map((b) => {
			const borrowerLoans = loans.filter((loan) => loan.borrowerId === b.id);
			const totalTaken = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).total, 0);
			const totalPaid = borrowerLoans.reduce((sum, loan) => sum + loanTotals(loan).paid, 0);
			return {
				borrower: b,
				totalTaken,
				totalPaid,
				totalBalance: totalTaken - totalPaid
			};
		});
	}, [
		activeSearchQuery,
		borrowers,
		loans
	]);
	(0, import_react.useEffect)(() => {
		if (!loggedIn) navigate({ to: "/" });
	}, [loggedIn, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen w-full max-w-md flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-background px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [headerLeft, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-primary",
							children: title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							showSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSearchOpen((open) => !open),
								className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
								"aria-label": "Toggle search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "size-6",
									strokeWidth: 2.5
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: logout,
								className: "rounded-md bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/20",
								type: "button",
								children: "Logout"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => reportCallback ? reportCallback() : navigate({ to: "/graphs" }),
								className: "flex size-10 items-center justify-center rounded-full border border-border shadow-sm transition hover:bg-slate-100",
								type: "button",
								"aria-label": "View reports",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5 text-brand" })
							})
						]
					})]
				}), searchOpen && activeOnSearchChange ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input w-full",
						value: activeSearchQuery,
						onChange: (e) => activeOnSearchChange(e.target.value),
						placeholder: "Search borrowers",
						autoFocus: true
					}), activeSearchQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-3 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: "Search suggestions"
						}), suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No borrowers found."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: suggestions.map(({ borrower, totalTaken, totalPaid, totalBalance }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									activeOnSearchChange(borrower.name);
									setSearchOpen(false);
									navigate({
										to: "/borrowers/$borrowerId",
										params: { borrowerId: borrower.id }
									});
								},
								className: "w-full rounded-xl border border-border bg-background p-3 text-left transition hover:bg-slate-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold text-foreground",
											children: borrower.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: borrower.mobile
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-brand/10 px-2 py-1 text-xs font-semibold text-brand",
										children: borrower.work
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "uppercase tracking-[0.2em]",
											children: "Taken"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-semibold text-foreground",
											children: inr(totalTaken)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "uppercase tracking-[0.2em]",
											children: "Paid"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-semibold text-foreground",
											children: inr(totalPaid)
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "uppercase tracking-[0.2em]",
											children: "Balance"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-semibold text-foreground",
											children: inr(totalBalance)
										})] })
									]
								})]
							}) }, borrower.id))
						})]
					}) : null]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pb-24",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-28 right-4 z-30 flex flex-col items-end gap-3",
				children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `pointer-events-auto flex w-full max-w-sm items-start justify-between gap-3 rounded-2xl border px-4 py-3 shadow-xl transition ${toast.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-destructive-200 bg-destructive-50 text-destructive-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: toast.type === "success" ? "Success" : "Error"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-current",
							children: toast.message
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => removeToast(toast.id),
						className: "rounded-full p-1 text-current opacity-70 transition hover:opacity-100",
						"aria-label": "Dismiss notification",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}, toast.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 mx-auto flex max-w-md justify-between border-t border-border bg-background px-2 py-2",
				children: nav.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					className: "flex flex-1 flex-col items-center gap-1 text-muted-foreground",
					activeProps: { className: "flex flex-1 flex-col items-center gap-1 text-brand" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs",
						children: label
					})]
				}, to))
			})
		]
	});
}
function EmptyState({ label = "There's nothing here, yet." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4 py-28 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-32 items-center justify-center rounded-[45%] bg-brand-soft",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
				className: "size-14 text-brand/40",
				strokeWidth: 1.2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-brand",
			children: label
		})]
	});
}
function Fab({ to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "fixed bottom-24 right-4 z-20 flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-medium tracking-wide text-brand-foreground shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xl leading-none",
			children: "+"
		}), label]
	});
}
//#endregion
export { Field as i, EmptyState as n, Fab as r, AppShell as t };
