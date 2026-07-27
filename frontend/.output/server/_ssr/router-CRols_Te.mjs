import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as AppProvider } from "./app-store-D4SC5TF3.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$11 } from "./borrowers._borrowerId-ZZv7MoQl.mjs";
import { t as Route$12 } from "./loan._loanId-BKtB_LXu.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CRols_Te.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BL3tdAVT.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "LoanBook — Loan Collections Manager" },
			{
				name: "description",
				content: "Manage borrowers, daily, weekly and monthly loan collections, payments and reports from your phone."
			},
			{
				name: "author",
				content: "LoanBook"
			},
			{
				property: "og:title",
				content: "LoanBook — Loan Collections Manager"
			},
			{
				property: "og:description",
				content: "Borrowers, loans, collections and reports in one simple app."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-BHQDza4s.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sign in — LoanBook Collections Manager" },
		{
			name: "description",
			content: "Sign in to LoanBook to manage borrowers, daily, weekly and monthly loan collections, payments and reports."
		},
		{
			property: "og:title",
			content: "Sign in — LoanBook Collections Manager"
		},
		{
			property: "og:description",
			content: "Manage borrowers, loans and daily collections from one simple app."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./collection-QoGqMG6w.mjs");
var Route$8 = createFileRoute("/collection")({
	head: () => ({ meta: [
		{ title: "Today's Collection — LoanBook" },
		{
			name: "description",
			content: "See every installment due today and mark collections as they are received."
		},
		{
			property: "og:title",
			content: "Today's Collection — LoanBook"
		},
		{
			property: "og:description",
			content: "Daily collection sheet for your field agents."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-BDEtLWxV.mjs");
var Route$7 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — LoanBook Collections" },
		{
			name: "description",
			content: "Overview of total loan value, amount collected, pending dues and outstanding balance."
		},
		{
			property: "og:title",
			content: "Dashboard — LoanBook Collections"
		},
		{
			property: "og:description",
			content: "Totals, collections and pending dues at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./graphs-Cs-7F848.mjs");
var Route$6 = createFileRoute("/graphs")({
	head: () => ({ meta: [
		{ title: "Graphs & Collection Reports — LoanBook" },
		{
			name: "description",
			content: "Charts comparing daily, weekly and monthly collections against total loan value."
		},
		{
			property: "og:title",
			content: "Graphs & Collection Reports — LoanBook"
		},
		{
			property: "og:description",
			content: "Visualise collections and outstanding balances."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./settings-D2DNpggz.mjs");
var Route$5 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings & Database — LoanBook" },
		{
			name: "description",
			content: "Backup, export, and import your LoanBook database."
		},
		{
			property: "og:title",
			content: "Settings & Database — LoanBook"
		},
		{
			property: "og:description",
			content: "Manage your database backups and exports."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var BASE_URL = "";
var Route$4 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/dashboard",
				changefreq: "daily",
				priority: "0.9"
			},
			{
				path: "/collection",
				changefreq: "daily",
				priority: "0.8"
			},
			{
				path: "/loan",
				changefreq: "daily",
				priority: "0.8"
			},
			{
				path: "/loan/new",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/borrowers",
				changefreq: "daily",
				priority: "0.8"
			},
			{
				path: "/borrowers/new",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/graphs",
				changefreq: "daily",
				priority: "0.7"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$3 = () => import("./borrowers.index-kJuQjjX7.mjs");
var Route$3 = createFileRoute("/borrowers/")({
	head: () => ({ meta: [
		{ title: "Borrowers — Customer Records | LoanBook" },
		{
			name: "description",
			content: "All borrower records with contact details, work and address information."
		},
		{
			property: "og:title",
			content: "Borrowers — Customer Records | LoanBook"
		},
		{
			property: "og:description",
			content: "Search and manage every borrower in one list."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./borrowers.new-B_ga9fTc.mjs");
var Route$2 = createFileRoute("/borrowers/new")({
	head: () => ({ meta: [
		{ title: "Create New Borrower — LoanBook" },
		{
			name: "description",
			content: "Register a new borrower with Aadhar, contact numbers, shop details and address."
		},
		{
			property: "og:title",
			content: "Create New Borrower — LoanBook"
		},
		{
			property: "og:description",
			content: "Add borrower KYC and contact details in one form."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./loan.index-BwjnCuFK.mjs");
var Route$1 = createFileRoute("/loan/")({
	head: () => ({ meta: [
		{ title: "Loans — Daily, Weekly & Monthly Collections" },
		{
			name: "description",
			content: "Browse every active loan by collection frequency with EMI, paid, pending and balance figures."
		},
		{
			property: "og:title",
			content: "Loans — Daily, Weekly & Monthly Collections"
		},
		{
			property: "og:description",
			content: "Every active loan with EMI and repayment progress."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./loan.new-Cf6oaTJg.mjs");
var Route = createFileRoute("/loan/new")({
	head: () => ({ meta: [
		{ title: "Create New Loan — LoanBook" },
		{
			name: "description",
			content: "Create a new loan: pick a customer, collection frequency, amount, interest and installment schedule."
		},
		{
			property: "og:title",
			content: "Create New Loan — LoanBook"
		},
		{
			property: "og:description",
			content: "Set amount, interest and installments in seconds."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var CollectionRoute = Route$8.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => Route$10
});
var DashboardRoute = Route$7.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$10
});
var GraphsRoute = Route$6.update({
	id: "/graphs",
	path: "/graphs",
	getParentRoute: () => Route$10
});
var SettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$10
});
var SitemapDotxmlRoute = Route$4.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$10
});
var BorrowersIndexRoute = Route$3.update({
	id: "/borrowers/",
	path: "/borrowers/",
	getParentRoute: () => Route$10
});
var BorrowersBorrowerIdRoute = Route$11.update({
	id: "/borrowers/$borrowerId",
	path: "/borrowers/$borrowerId",
	getParentRoute: () => Route$10
});
var BorrowersNewRoute = Route$2.update({
	id: "/borrowers/new",
	path: "/borrowers/new",
	getParentRoute: () => Route$10
});
var LoanIndexRoute = Route$1.update({
	id: "/loan/",
	path: "/loan/",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	CollectionRoute,
	DashboardRoute,
	GraphsRoute,
	SettingsRoute,
	SitemapDotxmlRoute,
	BorrowersBorrowerIdRoute,
	BorrowersNewRoute,
	LoanLoanIdRoute: Route$12.update({
		id: "/loan/$loanId",
		path: "/loan/$loanId",
		getParentRoute: () => Route$10
	}),
	LoanNewRoute: Route.update({
		id: "/loan/new",
		path: "/loan/new",
		getParentRoute: () => Route$10
	}),
	BorrowersIndexRoute,
	LoanIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
