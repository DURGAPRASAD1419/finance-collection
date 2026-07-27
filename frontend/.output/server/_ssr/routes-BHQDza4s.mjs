import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useApp } from "./app-store-D4SC5TF3.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as User, s as Lock } from "../_libs/lucide-react.mjs";
import { i as Field } from "./app-shell-C5__8-G4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BHQDza4s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login, loggedIn } = useApp();
	const navigate = useNavigate();
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("admin");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (loggedIn) navigate({ to: "/dashboard" });
	}, [loggedIn, navigate]);
	const submit = async (e) => {
		e.preventDefault();
		if (!username.trim() || !password.trim()) {
			setError("Enter username and password.");
			return;
		}
		try {
			if (!(await fetch("http://localhost:4000/api/auth/login", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username,
					password
				})
			})).ok) {
				setError("Invalid credentials.");
				return;
			}
			login();
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError("Unable to authenticate. Make sure the backend is running.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-brand-foreground",
					children: "₹"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-bold text-primary",
					children: "LoanBook"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base text-muted-foreground",
					children: "Collections, borrowers and reports in one place."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-12 space-y-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Username",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field-input pr-12",
							value: username,
							onChange: (e) => setUsername(e.target.value),
							placeholder: "admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Password",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field-input pr-12",
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" })]
					})
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "w-full rounded-lg bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground",
					children: "LOGIN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm text-muted-foreground",
					children: "Forgot PIN? Contact your administrator."
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
