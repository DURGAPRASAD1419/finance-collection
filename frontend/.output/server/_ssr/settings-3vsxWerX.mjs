import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useApp } from "./app-store-vl_DhqcK.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Upload, m as Database, p as Download, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-WyGsWYV9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-3vsxWerX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const navigate = useNavigate();
	const { exportDatabase, backupDatabase, importDatabase } = useApp();
	const fileInputRef = (0, import_react.useRef)(null);
	const [isExporting, setIsExporting] = (0, import_react.useState)(false);
	const [isBackingUp, setIsBackingUp] = (0, import_react.useState)(false);
	const [isImporting, setIsImporting] = (0, import_react.useState)(false);
	const handleExport = async () => {
		setIsExporting(true);
		try {
			await exportDatabase();
		} finally {
			setIsExporting(false);
		}
	};
	const handleBackup = async () => {
		setIsBackingUp(true);
		try {
			await backupDatabase();
		} finally {
			setIsBackingUp(false);
		}
	};
	const handleImportClick = () => {
		fileInputRef.current?.click();
	};
	const handleImportFile = async (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		setIsImporting(true);
		try {
			await importDatabase(file);
		} finally {
			setIsImporting(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Settings & Database",
		showSearch: false,
		headerLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/dashboard" }),
			className: "rounded-md p-2 text-brand transition hover:bg-slate-100",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 py-4 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-xl font-bold text-foreground",
					children: "Database Management"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted-foreground",
					children: "Backup, export, and import your LoanBook database to protect your data."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleExport,
							disabled: isExporting,
							className: "w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-10 items-center justify-center rounded-full bg-brand/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5 text-brand" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: "Export Database"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Download your database as a file"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: isExporting ? "Exporting..." : "Export"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleBackup,
							disabled: isBackingUp,
							className: "w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-10 items-center justify-center rounded-full bg-emerald-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5 text-emerald-700" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: "Create Backup"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Create a backup copy of your database"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: isBackingUp ? "Backing up..." : "Backup"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleImportClick,
							disabled: isImporting,
							className: "w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-10 items-center justify-center rounded-full bg-orange-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 text-orange-700" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-foreground",
										children: "Import Database"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Restore from a backup file"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: isImporting ? "Importing..." : "Import"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: ".db",
							onChange: handleImportFile,
							className: "hidden",
							"aria-label": "Import database file"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-yellow-200 bg-yellow-50 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-yellow-900 mb-2",
					children: "⚠️ Important"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "text-sm text-yellow-800 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Always keep a backup of your data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Before importing a backup, the current database will be backed up automatically" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Importing will require the server to restart" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Export your data regularly for security" })
					]
				})]
			})]
		})
	});
}
//#endregion
export { SettingsPage as component };
