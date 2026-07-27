import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { Field } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — LoanBook Collections Manager" },
      {
        name: "description",
        content:
          "Sign in to LoanBook to manage borrowers, daily, weekly and monthly loan collections, payments and reports.",
      },
      { property: "og:title", content: "Sign in — LoanBook Collections Manager" },
      {
        property: "og:description",
        content: "Manage borrowers, loans and daily collections from one simple app.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, loggedIn } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      navigate({ to: "/dashboard" });
    }
  }, [loggedIn, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Enter username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError("Invalid credentials.");
        return;
      }
      login();
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError("Unable to authenticate. Make sure the backend is running.");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background px-6">
      <div className="pt-20">
        <div className="mb-8 flex size-16 items-center justify-center rounded-2xl bg-brand text-3xl font-bold text-brand-foreground">
          ₹
        </div>
        <h1 className="text-4xl font-bold text-primary">LoanBook</h1>
        <p className="mt-2 text-base text-muted-foreground">
          Collections, borrowers and reports in one place.
        </p>
      </div>

      <form onSubmit={submit} className="mt-12 space-y-7">
        <Field label="Username" required>
          <div className="relative">
            <input
              className="field-input pr-12"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
            <User className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>

        <Field label="Password" required>
          <div className="relative">
            <input
              className="field-input pr-12"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
            />
            <Lock className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-brand py-4 text-lg font-bold tracking-wide text-brand-foreground"
        >
          LOGIN
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Forgot PIN? Contact your administrator.
        </p>
      </form>
    </div>
  );
}
