import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useApp } from "./app-store-D4SC5TF3.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Field } from "./app-shell-C5__8-G4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/borrowers.new-B_ga9fTc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewBorrowerPage() {
	const { addBorrower, notifySuccess, notifyError } = useApp();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		fatherName: "",
		mobile: "",
		mobile2: "",
		work: "",
		address: ""
	});
	const set = (k) => (e) => setForm((f) => ({
		...f,
		[k]: e.target.value
	}));
	const submit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.fatherName || !form.mobile || !form.work || !form.address) {
			notifyError("Please complete all required fields.");
			return;
		}
		try {
			await addBorrower(form);
			notifySuccess("Borrower added successfully.");
			navigate({ to: "/borrowers" });
		} catch (err) {
			console.error(err);
			notifyError("Unable to create borrower. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen w-full max-w-md bg-background pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/borrowers",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6 text-brand" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-7 px-4 pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-brand",
					children: "Create new borrower"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						value: form.name,
						onChange: set("name")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Father Name",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						value: form.fatherName,
						onChange: set("fatherName")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Mobile",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						inputMode: "numeric",
						value: form.mobile,
						onChange: set("mobile")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Mobile2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						inputMode: "numeric",
						value: form.mobile2,
						onChange: set("mobile2")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Shop / Work",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						value: form.work,
						onChange: set("work")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Address",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field-input",
						value: form.address,
						onChange: set("address"),
						placeholder: "Door number, street, city"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "w-full rounded-md bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground",
					children: "SAVE BORROWER"
				})
			]
		})]
	});
}
//#endregion
export { NewBorrowerPage as component };
