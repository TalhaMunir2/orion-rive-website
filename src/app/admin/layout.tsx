import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getCurrentUserRole } from "../../../lib/supabase/roles";
import { createClient } from "../../../lib/supabase/server";
import AdminShell from "../../components/admin/AdminShell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const role = user ? await getCurrentUserRole() : null;
  return <AdminShell email={user?.email} role={role}>{children}</AdminShell>;
}
