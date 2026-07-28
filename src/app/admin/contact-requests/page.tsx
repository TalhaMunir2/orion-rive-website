import type { ContactRequest } from "../../../../lib/admin-types";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { currentUserHasRole } from "../../../../lib/supabase/roles";
import Unauthorized from "../../../components/admin/Unauthorized";
import ContactRequestsTable from "../../../components/admin/ContactRequestsTable";
import { Card } from "../../../components/ui/card";

export const dynamic = "force-dynamic";

export default async function ContactRequestsPage() {
  if (!(await currentUserHasRole(["super_admin", "marketing_manager"])))
    return <Unauthorized area="Contact Requests" />;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_requests")
    .select("id,name,company,email,phone,country,message,status,created_at")
    .order("created_at", { ascending: false });
  return (
    <main className="p-5 sm:p-8">
      <PageHeading
        title="Contact Requests"
        description="Search, review, qualify, and track inbound enterprise opportunities."
      />
      {error ? (
        <ErrorState message={error.message} />
      ) : (
        <Card className="mt-7 overflow-hidden">
          <ContactRequestsTable requests={(data || []) as ContactRequest[]} />
        </Card>
      )}
    </main>
  );
}

function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">
        Customer engagement
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
function ErrorState({ message }: { message: string }) {
  return (
    <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      <p className="font-semibold">Contact requests could not be loaded.</p>
      <p className="mt-2">{message}</p>
      <p className="mt-2">
        Run the provided status-column SQL and confirm the Supabase service-role
        environment variable.
      </p>
    </div>
  );
}
