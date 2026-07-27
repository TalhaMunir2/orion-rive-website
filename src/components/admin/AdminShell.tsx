"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import type { AdminRole } from "../../../lib/supabase/roles";
import { logout } from "../../app/admin/actions";

const navItems = [
  { label: "Dashboard Overview", href: "/admin", roles: ["super_admin", "content_manager", "marketing_manager"] },
  { label: "Contact Requests", href: "/admin/contact-requests", roles: ["super_admin", "marketing_manager"] },
  { label: "Job Applications", href: "/admin/applications", roles: ["super_admin", "content_manager"] },
  { label: "Team Members", href: "/admin/team-members", roles: ["super_admin", "content_manager"] },
] as const;

const roleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  marketing_manager: "Marketing Manager",
};

export default function AdminShell({ children, email, role }: { children: ReactNode; email?: string; role: AdminRole | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (pathname === "/admin/login") return <>{children}</>;

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-950 text-slate-300">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 text-[11px] font-bold text-white">OR</span>
        <div><p className="text-sm font-bold text-white">ORION RIVE</p><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">Control Center</p></div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Admin navigation">
        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">Workspace</p>
        {navItems.map((item) => {
          if (!role || !(item.roles as readonly string[]).includes(role)) return null;
          const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/[0.06] hover:text-white"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-sky-400" : "bg-slate-700"}`} />{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="mb-4 px-2"><p className="truncate text-xs font-semibold text-white">{email || "Admin user"}</p><p className="mt-1 text-[10px] text-slate-500">{role ? roleLabels[role] : "Role not assigned"}</p></div>
        <form action={logout}><button type="submit" className="flex w-full items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">Log out</button></form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <button type="button" onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 lg:hidden" aria-label="Open admin navigation">☰</button>
          <div className="ml-auto flex items-center gap-3"><span className="hidden text-xs text-slate-500 sm:inline">Secure staff workspace</span><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.1)]" /></div>
        </header>
        {children}
      </div>
      {mobileOpen && <><button type="button" aria-label="Close admin navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden" /><aside className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl lg:hidden">{sidebar}</aside></>}
    </div>
  );
}
