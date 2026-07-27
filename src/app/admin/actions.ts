"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { type ContactStatus, contactStatuses } from "../../../lib/admin-types";
import { createAdminClient } from "../../../lib/supabase/admin";
import { currentUserHasRole } from "../../../lib/supabase/roles";
import { createClient } from "../../../lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<{ success: boolean; error?: string }> {
  const allowed = await currentUserHasRole(["super_admin", "marketing_manager"]);
  if (!allowed) return { success: false, error: "You are not authorized to update contact requests." };
  if (!id || !contactStatuses.includes(status)) return { success: false, error: "Invalid status update." };

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_requests").update({ status }).eq("id", id);
    if (error) return { success: false, error: error.message };
    revalidatePath("/admin/contact-requests");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to update status." };
  }
}
