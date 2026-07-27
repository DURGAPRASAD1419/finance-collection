import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as addPeriod, o as toDMY, r as fromDMY, s as useApp } from "./app-store-B1Qbf6V1.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Field } from "./app-shell-CRyAR8zm.mjs";
import { t as FrequencyTabs } from "./loan-ui-CzLGJQ2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loan.new-pZivQimo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewLoanPage() {
	const { borrowers, addLoan, notifySuccess, notifyError } = useApp();
	const navigate = useNavigate();
	const [customer, setCustomer] = (0, import_react.useState)(borrowers[0]?.id ?? "");
	const [frequency, setFrequency] = (0, import_react.useState)("daily");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [interest, setInterest] = (0, import_react.useState)("");
	const [installments, setInstallments] = (0, import_react.useState)("");
	const [alreadyPaid, setAlreadyPaid] = (0, import_react.useState)("");
	const [startDate, setStartDate] = (0, import_react.useState)(toDMY(/* @__PURE__ */ new Date()));
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!customer && borrowers.length) setCustomer(borrowers[0].id);
	}, [borrowers, customer]);
	const amountN = Number(amount) || 0;
	const interestN = Number(interest) || 0;
	const instN = Number(installments) || 0;
	const payable = amountN + amountN * interestN / 100;
	const perInstallment = instN ? Math.round(payable / instN) : 0;
	const disbursed = amountN;
	const endDate = (0, import_react.useMemo)(() => instN ? toDMY(addPeriod(fromDMY(startDate), frequency, instN - 1)) : startDate, [
		startDate,
		frequency,
		instN
	]);
	const submit = async (e) => {
		e.preventDefault();
		setError("");
		if (!customer || !instN || !perInstallment) {
			setError("Please select a borrower, number of installments, and check the installment amount.");
			return;
		}
		setIsSubmitting(true);
		try {
			const loan = await addLoan({
				borrowerId: customer,
				frequency,
				amount: amountN,
				interest: interestN,
				installments: instN,
				perInstallment,
				startDate,
				endDate
			});
			if (Number(alreadyPaid) > 0) {}
			notifySuccess("Loan approved successfully.");
			navigate({
				to: "/loan/$loanId",
				params: { loanId: loan.id }
			});
		} catch (err) {
			console.error(err);
			notifyError("Unable to save the loan. Please try again.");
			setError("Unable to save the loan. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto min-h-screen w-full max-w-md bg-background pb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/loan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6 text-brand" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-primary",
				children: "Create New Loan"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg text-muted-foreground",
						children: "Select customer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: customer,
						onChange: (e) => setCustomer(e.target.value),
						className: "flex-1 rounded-md border border-border bg-background px-3 py-3 text-lg shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select"
						}), borrowers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: b.id,
							children: b.name
						}, b.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrequencyTabs, {
					value: frequency,
					onChange: setFrequency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-7 px-4 pt-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Loan Amount",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								inputMode: "numeric",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Interest",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								inputMode: "numeric",
								value: interest,
								onChange: (e) => setInterest(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Installment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								inputMode: "numeric",
								value: installments,
								onChange: (e) => setInstallments(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Loan Per Installment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								readOnly: true,
								value: perInstallment || ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Start Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								value: startDate,
								onChange: (e) => setStartDate(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								readOnly: true,
								value: endDate
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Amount Disbursed",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								readOnly: true,
								value: disbursed || ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "If Already Paid Amount",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field-input",
								inputMode: "numeric",
								value: alreadyPaid,
								onChange: (e) => setAlreadyPaid(e.target.value)
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isSubmitting,
							className: "w-full rounded-md bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground disabled:opacity-50",
							children: isSubmitting ? "Saving..." : "APPROVE"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { NewLoanPage as component };
