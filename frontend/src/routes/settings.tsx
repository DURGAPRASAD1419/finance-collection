import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, Upload, Database } from "lucide-react";
import { useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Database — LoanBook" },
      {
        name: "description",
        content: "Backup, export, and import your LoanBook database.",
      },
      { property: "og:title", content: "Settings & Database — LoanBook" },
      { property: "og:description", content: "Manage your database backups and exports." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const { exportDatabase, backupDatabase, importDatabase } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

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

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      await importDatabase(file);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <AppShell
      title="Settings & Database"
      showSearch={false}
      headerLeft={
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="rounded-md p-2 text-brand transition hover:bg-slate-100"
        >
          <ArrowLeft className="size-6" />
        </button>
      }
    >
      <div className="space-y-6 py-4 px-4">
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Database Management</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Backup, export, and import your LoanBook database to protect your data.
          </p>

          <div className="space-y-3">
            {/* Export Database */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-brand/10">
                  <Download className="size-5 text-brand" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Export Database</p>
                  <p className="text-xs text-muted-foreground">Download your database as a file</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {isExporting ? "Exporting..." : "Export"}
              </span>
            </button>

            {/* Backup Database */}
            <button
              onClick={handleBackup}
              disabled={isBackingUp}
              className="w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                  <Database className="size-5 text-emerald-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Create Backup</p>
                  <p className="text-xs text-muted-foreground">Create a backup copy of your database</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {isBackingUp ? "Backing up..." : "Backup"}
              </span>
            </button>

            {/* Import Database */}
            <button
              onClick={handleImportClick}
              disabled={isImporting}
              className="w-full flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-orange-100">
                  <Upload className="size-5 text-orange-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Import Database</p>
                  <p className="text-xs text-muted-foreground">Restore from a backup file</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {isImporting ? "Importing..." : "Import"}
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".db"
              onChange={handleImportFile}
              className="hidden"
              aria-label="Import database file"
            />
          </div>
        </section>

        <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Important</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Always keep a backup of your data</li>
            <li>• Before importing a backup, the current database will be backed up automatically</li>
            <li>• Importing will require the server to restart</li>
            <li>• Export your data regularly for security</li>
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
