import { groq } from "next-sanity";
import { redirect } from "next/navigation";
import type { ContactRequest, JobApplication } from "../../../lib/admin-types";
import { sanityClient } from "../../../lib/sanity";
import { createAdminClient } from "../../../lib/supabase/admin";
import { getCurrentUserRole } from "../../../lib/supabase/roles";
import { createClient } from "../../../lib/supabase/server";
import Unauthorized from "../../components/admin/Unauthorized";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user) redirect("/admin/login");
  const role = await getCurrentUserRole();
  if (!role) return <Unauthorized area="the administration dashboard" />;

  const canViewContacts =
    role === "super_admin" || role === "marketing_manager";
  const canViewApplications =
    role === "super_admin" || role === "content_manager";
  const admin = createAdminClient();

  const [contactsResult, applicationsResult, jobs] = await Promise.all([
    canViewContacts
      ? admin
          .from("contact_requests")
          .select("id,name,company,email,country,status,created_at")
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] as Partial<ContactRequest>[], error: null }),
    canViewApplications
      ? admin
          .from("job_applications")
          .select("id,full_name,email,job_title,created_at")
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] as Partial<JobApplication>[], error: null }),
    canViewApplications
      ? sanityClient.fetch<Array<{ title: string; department: string }>>(
          groq`*[_type == "jobOpening"]{title, department}`,
        )
      : Promise.resolve([]),
  ]);

  const contacts = contactsResult.data || [];
  const applications = applicationsResult.data || [];
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentContacts = contacts.filter(
    (item) => new Date(item.created_at || 0).getTime() >= thirtyDaysAgo,
  ).length;
  const departmentByTitle = new Map(
    jobs.map((job) => [job.title, job.department]),
  );
  const applicationsByDepartment = applications.reduce<Record<string, number>>(
    (counts, item) => {
      const department = departmentByTitle.get(item.job_title || "") || "Other";
      counts[department] = (counts[department] || 0) + 1;
      return counts;
    },
    {},
  );
  const activity = [
    ...contacts.map((item) => ({
      id: `contact-${item.id}`,
      type: "Contact",
      title: item.name || "Unknown contact",
      detail: item.company || item.email || "Contact request",
      date: item.created_at || "",
    })),
    ...applications.map((item) => ({
      id: `application-${item.id}`,
      type: "Application",
      title: item.full_name || "Unknown applicant",
      detail: item.job_title || "Job application",
      date: item.created_at || "",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <main className="p-5 sm:p-8">
      <PageHeading
        eyebrow="Dashboard overview"
        title={`Welcome, ${user.email}`}
        description="A role-aware view of customer demand, talent activity, and recent operational events."
      />
      {(contactsResult.error || applicationsResult.error) && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Some dashboard data could not be loaded. Confirm the required Supabase
          table changes and server environment variables are configured.
        </div>
      )}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {canViewContacts && (
          <>
            <StatCard
              label="Contact requests"
              value={contacts.length}
              note="All time"
            />
            <StatCard
              label="New demand"
              value={recentContacts}
              note="Last 30 days"
            />
          </>
        )}
        {canViewApplications && (
          <StatCard
            label="Job applications"
            value={applications.length}
            note="All active and historical roles"
          />
        )}
        <StatCard
          label="Access role"
          value={role.replaceAll("_", " ")}
          note="Current permission scope"
          text
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <Card>
          <CardHeader className="border-b border-slate-100">
            <CardTitle>Recent activity</CardTitle>
            <p className="text-sm text-slate-500">
              Latest permitted contact and recruitment events.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            {activity.length ? (
              <div className="divide-y divide-slate-100">
                {activity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${item.type === "Contact" ? "bg-sky-500" : "bg-slate-500"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {item.detail}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge>{item.type}</Badge>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-10 text-center text-sm text-slate-500">
                No activity is available for your role.
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-b border-slate-100">
            <CardTitle>Applications by department</CardTitle>
            <p className="text-sm text-slate-500">
              Recruitment demand distribution.
            </p>
          </CardHeader>
          <CardContent className="pt-5">
            {canViewApplications &&
            Object.keys(applicationsByDepartment).length ? (
              <div className="space-y-4">
                {Object.entries(applicationsByDepartment)
                  .sort((a, b) => b[1] - a[1])
                  .map(([department, count]) => (
                    <div key={department}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          {department}
                        </span>
                        <span className="font-semibold">{count}</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-1.5 rounded-full bg-sky-500"
                          style={{
                            width: `${Math.max(12, (count / applications.length) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-slate-500">
                {canViewApplications
                  ? "No application data yet."
                  : "Your role does not include recruitment data."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}
function StatCard({
  label,
  value,
  note,
  text = false,
}: {
  label: string;
  value: number | string;
  note: string;
  text?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p
          className={`mt-3 font-semibold tracking-tight text-slate-950 ${text ? "text-xl capitalize" : "text-3xl"}`}
        >
          {value}
        </p>
        <p className="mt-2 text-[11px] text-slate-400">{note}</p>
      </CardContent>
    </Card>
  );
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
