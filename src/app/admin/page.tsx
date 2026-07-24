import { redirect } from "next/navigation";

import { createClient } from "../../../lib/supabase/server";
import { getCurrentUserRole } from "../../../lib/supabase/roles";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

const roleLabels = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  marketing_manager: "Marketing Manager",
} as const;

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const role = await getCurrentUserRole();

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-bold text-white">
              OR
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight">
                ORION RIVE
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Admin Control Center
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user.email}
              </p>
              <p className="text-xs text-slate-500">
                {role ? roleLabels[role] : "Role not assigned"}
              </p>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Administration workspace
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Welcome, {user.email}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Your secure workspace for managing Orion Rive&apos;s digital
                operations and enterprise content.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Access level
              </p>
              <p className="mt-1 font-semibold text-white">
                {role ? roleLabels[role] : "Pending role assignment"}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
              Workspace
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Administration overview
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              [
                "Content management",
                "Manage services, case studies, articles, and team content.",
                "Sanity CMS",
              ],
              [
                "Contact requests",
                "Review and respond to qualified inquiries from the website.",
                "Supabase",
              ],
              [
                "Access management",
                "Control administrator roles and future feature permissions.",
                role ? roleLabels[role] : "Not assigned",
              ],
            ].map(([title, description, status]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.1)]" />
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    {status}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
