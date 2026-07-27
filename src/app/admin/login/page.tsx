"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { createClient } from "../../../../lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("The email or password you entered is incorrect.");
      setIsSubmitting(false);
      return;
    }

    const requestedPath = new URLSearchParams(window.location.search).get(
      "next",
    );
    const destination =
      requestedPath?.startsWith("/admin") &&
      !requestedPath.startsWith("//")
        ? requestedPath
        : "/admin";

    router.replace(destination);
    router.refresh();
  };

  return (
    <main className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,.2),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,.18),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />

        <Link
          href="/"
          className="relative inline-flex w-fit items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white shadow-lg shadow-sky-500/20">
            OR
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-white">
              ORION RIVE
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Enterprise Technology
            </span>
          </span>
        </Link>

        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            Orion Rive Control Center
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-white">
            Secure access to your digital operations.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
            Manage content, customer engagement, and enterprise experiences
            from one protected workspace.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              ["Protected", "Cookie sessions"],
              ["Verified", "Server checks"],
              ["Controlled", "Role access"],
            ].map(([title, label]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur"
              >
                <span className="text-sm font-semibold text-white">{title}</span>
                <span className="mt-1 block text-xs text-slate-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">
          Authorized Orion Rive personnel only
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-3 lg:hidden"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-bold text-white">
              OR
            </span>
            <span className="font-bold tracking-tight text-slate-950">
              ORION RIVE
            </span>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_70px_-32px_rgba(15,23,42,.35)] sm:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                Admin portal
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sign in with your authorized administrator account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  placeholder="admin@orionrive.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>
                  <span className="text-xs text-slate-500">
                    Case-sensitive
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in securely"}
              </button>
            </form>

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-500">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              >
                <path
                  d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9m-8 0h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Protected by Supabase authentication
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
