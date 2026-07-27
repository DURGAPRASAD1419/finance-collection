import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/borrowers._borrowerId-DSWJsXpz.js
var $$splitComponentImporter = () => import("./borrowers._borrowerId-inTjXMkL.mjs");
var Route = createFileRoute("/borrowers/$borrowerId")({
	head: ({ params }) => ({ meta: [
		{ title: `Borrower ${params.borrowerId} — LoanBook` },
		{
			name: "description",
			content: "Borrower details, loan history and outstanding balance."
		},
		{
			property: "og:title",
			content: `Borrower Details — LoanBook`
		},
		{
			property: "og:description",
			content: "View borrower contact info and loan summary."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
