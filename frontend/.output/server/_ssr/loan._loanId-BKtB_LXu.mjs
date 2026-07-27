import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loan._loanId-BKtB_LXu.js
var $$splitComponentImporter = () => import("./loan._loanId-Cor3oMEL.mjs");
var Route = createFileRoute("/loan/$loanId")({
	head: () => ({ meta: [
		{ title: "Loan Transactions & Payments — LoanBook" },
		{
			name: "description",
			content: "Full installment schedule for a loan with due dates, paid dates and payment collection."
		},
		{
			property: "og:title",
			content: "Loan Transactions & Payments — LoanBook"
		},
		{
			property: "og:description",
			content: "Track every due and collect payments instantly."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
