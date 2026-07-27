import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as inr, o as toDMY, r as fromDMY, s as useApp } from "./app-store-D4SC5TF3.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as EmptyState, t as AppShell } from "./app-shell-C5__8-G4.mjs";
import { t as FrequencyTabs } from "./loan-ui-DKKDAm9J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection-QoGqMG6w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollectionPage() {
	const navigate = useNavigate();
	const { loans, borrowers } = useApp();
	const [freq, setFreq] = (0, import_react.useState)("daily");
	const today = toDMY(/* @__PURE__ */ new Date());
	const rows = loans.filter((l) => l.frequency === freq).flatMap((l) => l.dues.filter((d) => !d.paid && fromDMY(d.date) <= fromDMY(today)).map((d) => ({
		loan: l,
		due: d
	})));
	const totalDue = rows.reduce((s, r) => s + r.due.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Collection",
		headerLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/dashboard" }),
			className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrequencyTabs, {
				value: freq,
				onChange: setFreq
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-base text-muted-foreground",
					children: ["Due up to ", today]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-bold text-primary",
					children: inr(totalDue)
				})]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { label: "No collections due right now." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: rows.map(({ loan, due }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold text-foreground",
						children: borrowers.find((b) => b.id === loan.borrowerId)?.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							loan.code,
							" · Due ",
							due.no,
							" · ",
							due.date
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-primary px-3 py-2 text-base font-bold text-primary-foreground",
						children: inr(due.amount)
					})]
				}, `${loan.id}-${due.no}`))
			})
		]
	});
}
//#endregion
export { CollectionPage as component };
