import type { JobApplication } from "../../../../lib/admin-types";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { currentUserHasRole } from "../../../../lib/supabase/roles";
import ApplicationsTable from "../../../components/admin/ApplicationsTable";
import Unauthorized from "../../../components/admin/Unauthorized";
import { Card } from "../../../components/ui/card";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  if (!(await currentUserHasRole(["super_admin", "content_manager"])))
    return <Unauthorized area="Job Applications" />;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return (
      <main className="p-8">
        <ErrorState message={error.message} />
      </main>
    );
  const applications = await Promise.all(
    ((data || []) as JobApplication[]).map(async (application) => {
      const { data: signed } = await supabase.storage
        .from("resumes")
        .createSignedUrl(application.resume_url, 600);
      return { ...application, signed_resume_url: signed?.signedUrl };
    }),
  );
  return (
    <main className="p-5 sm:p-8">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">
          Talent pipeline
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Job Applications
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review candidates, application context, and private resume files.
        </p>
      </div>
      <Card className="mt-7 overflow-hidden">
        <ApplicationsTable applications={applications} />
      </Card>
    </main>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      <p className="font-semibold">Applications could not be loaded.</p>
      <p className="mt-2">{message}</p>
    </div>
  );
}
