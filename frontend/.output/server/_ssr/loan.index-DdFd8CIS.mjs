import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useApp } from "./app-store-B1Qbf6V1.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as EmptyState, r as Fab, t as AppShell } from "./app-shell-CRyAR8zm.mjs";
import { n as LoanCard, t as FrequencyTabs } from "./loan-ui-CzLGJQ2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loan.index-DdFd8CIS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoanListPage() {
	const navigate = useNavigate();
	const { loans, borrowers } = useApp();
	const [freq, setFreq] = (0, import_react.useState)("daily");
	const list = loans.filter((l) => l.frequency === freq);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Loan",
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
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : list.map((loan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoanCard, {
				loan,
				borrower: borrowers.find((b) => b.id === loan.borrowerId)
			}, loan.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fab, {
				to: "/loan/new",
				label: "ADD LOAN"
			})
		]
	});
}
//#endregion
export { LoanListPage as component };
