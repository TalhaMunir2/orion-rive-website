import { createClient } from "./server";

export const adminRoles = [
  "super_admin",
  "content_manager",
  "marketing_manager",
] as const;

export type AdminRole = (typeof adminRoles)[number];

export async function getCurrentUserRole(): Promise<AdminRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return adminRoles.includes(data.role as AdminRole)
    ? (data.role as AdminRole)
    : null;
}

export async function currentUserHasRole(
  allowedRoles: readonly AdminRole[],
): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role !== null && allowedRoles.includes(role);
}
