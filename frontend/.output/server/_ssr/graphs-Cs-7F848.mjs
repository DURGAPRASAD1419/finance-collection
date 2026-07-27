import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as loanTotals, s as useApp } from "./app-store-D4SC5TF3.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-C5__8-G4.mjs";
import { r as SummaryBar } from "./loan-ui-DKKDAm9J.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/graphs-Cs-7F848.js
var import_jsx_runtime = require_jsx_runtime();
var sections = [
	{
		key: "daily",
		label: "Daily Collections",
		color: "var(--chart-1)"
	},
	{
		key: "weekly",
		label: "Weekly Collections",
		color: "var(--chart-2)"
	},
	{
		key: "monthly",
		label: "Monthly Collections",
		color: "var(--chart-3)"
	},
	{
		key: "all",
		label: "Over All Total",
		color: "var(--brand)"
	}
];
function GraphsPage() {
	const navigate = useNavigate();
	const { loans } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Graphs",
		showSearch: false,
		headerLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/dashboard" }),
			className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6 py-4",
			children: sections.map((s) => {
				const agg = (s.key === "all" ? loans : loans.filter((l) => l.frequency === s.key)).reduce((acc, l) => {
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
				const data = [
					{
						name: "Total",
						value: agg.total
					},
					{
						name: "Paid",
						value: agg.paid
					},
					{
						name: "Pending",
						value: agg.pending
					},
					{
						name: "Balance",
						value: agg.balance
					}
				];
				const hasData = agg.total > 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-5 rounded-sm",
								style: { backgroundColor: s.color }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-foreground",
								children: s.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-64 px-3",
							children: hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "var(--border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											stroke: "var(--muted-foreground)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--muted-foreground)",
											width: 44
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "value",
											fill: s.color,
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center border-b border-l border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xl text-foreground",
									children: "No chart data available"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryBar, { ...agg })
					]
				}, s.key);
			})
		})
	});
}
//#endregion
export { GraphsPage as component };
