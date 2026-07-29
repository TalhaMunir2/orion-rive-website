import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { sanityClient, urlFor } from "../../../../lib/sanity";
import { currentUserHasRole } from "../../../../lib/supabase/roles";
import Unauthorized from "../../../components/admin/Unauthorized";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent } from "../../../components/ui/card";

export const dynamic = "force-dynamic";

type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: unknown;
  linkedinUrl?: string;
};

export default async function TeamMembersPage() {
  if (!(await currentUserHasRole(["super_admin", "content_manager"])))
    return <Unauthorized area="Team Members" />;
  const team = await sanityClient.fetch<TeamMember[]>(
    groq`*[_type == "teamMember"] | order(name asc){_id,name,role,bio,photo,linkedinUrl}`,
  );

  return (
    <main className="p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">
            Content operations
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Team Members
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review leadership profiles published through Sanity.
          </p>
        </div>
        <Link
          href="https://orion-rive-cms.sanity.studio/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Open Sanity Studio <span aria-hidden="true">↗</span>
        </Link>
      </div>

      {team.length ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {team.map((member) => (
            <Card key={member._id} className="overflow-hidden">
              {member.photo ? (
                <Image
                  src={urlFor(member.photo)
                    .width(600)
                    .height(360)
                    .fit("crop")
                    .url()}
                  alt={`${member.name}, ${member.role || "Orion Rive team member"}`}
                  width={600}
                  height={360}
                  sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw"
                  className="aspect-[5/3] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[5/3] place-items-center bg-slate-100 text-3xl font-semibold text-slate-500">
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
              <CardContent className="p-5">
                <Badge>{member.role || "Role not set"}</Badge>
                <h2 className="mt-4 text-lg font-semibold">{member.name}</h2>
                {member.bio && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {member.bio}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
          No Team Member documents are published in Sanity.
        </div>
      )}
    </main>
  );
}
