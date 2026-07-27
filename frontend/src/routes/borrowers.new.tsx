import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Field } from "@/components/app-shell";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/borrowers/new")({
  head: () => ({
    meta: [
      { title: "Create New Borrower — LoanBook" },
      {
        name: "description",
        content: "Register a new borrower with Aadhar, contact numbers, shop details and address.",
      },
      { property: "og:title", content: "Create New Borrower — LoanBook" },
      { property: "og:description", content: "Add borrower KYC and contact details in one form." },
    ],
  }),
  component: NewBorrowerPage,
});

function NewBorrowerPage() {
  const { addBorrower, notifySuccess, notifyError } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    mobile: "",
    mobile2: "",
    work: "",
    address: "",
  });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
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

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-10">
      <header className="border-b border-border px-4 py-3">
        <Link to="/borrowers">
          <ArrowLeft className="size-6 text-brand" />
        </Link>
      </header>

      <form onSubmit={submit} className="space-y-7 px-4 pt-5">
        <h1 className="text-2xl font-bold text-brand">Create new borrower</h1>

<Field label="Name" required>
          <input className="field-input" value={form.name} onChange={set("name")} />
        </Field>
        <Field label="Father Name" required>
          <input className="field-input" value={form.fatherName} onChange={set("fatherName")} />
        </Field>
        <Field label="Mobile" required>
          <input
            className="field-input"
            inputMode="numeric"
            value={form.mobile}
            onChange={set("mobile")}
          />
        </Field>
        <Field label="Mobile2">
          <input
            className="field-input"
            inputMode="numeric"
            value={form.mobile2}
            onChange={set("mobile2")}
          />
        </Field>
        <Field label="Shop / Work" required>
          <input className="field-input" value={form.work} onChange={set("work")} />
        </Field>
        <Field label="Address" required>
          <input
            className="field-input"
            value={form.address}
            onChange={set("address")}
            placeholder="Door number, street, city"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-md bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground"
        >
          SAVE BORROWER
        </button>
      </form>
    </div>
  );
}
