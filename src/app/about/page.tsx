import { groq } from "next-sanity";
import Image from "next/image";

import { sanityClient, urlFor } from "../../../lib/sanity";
import { createPageMetadata } from "../../../lib/seo";
import {
  CtaSection,
  PageHero,
  PrimaryButton,
} from "../../components/marketing-shell";

export const revalidate = 60;
export const metadata = createPageMetadata({
  title: "About Our Enterprise Technology Firm | Orion Rive",
  description:
    "Meet Orion Rive, an enterprise consulting firm helping technology leaders modernize operations through platforms, AI, cloud, and engineering.",
  path: "/about",
});

type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: unknown;
  linkedinUrl?: string;
};

const teamQuery = groq`
  *[_type == "teamMember"] | order(name asc) {
    _id, name, role, bio, photo, linkedinUrl
  }
`;

async function getTeam() {
  try {
    return await sanityClient.fetch<TeamMember[]>(
      teamQuery,
      {},
      { next: { revalidate } },
    );
  } catch (error) {
    console.error("Unable to load leadership profiles from Sanity:", error);
    return [];
  }
}

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="About Orion Rive"
        title="Technology transformation with operational reality built in."
        description="We help ambitious enterprises turn complex platforms, fragmented processes, and emerging technology into simpler operations and stronger business performance."
      >
        <PrimaryButton href="/contact">Meet our team</PrimaryButton>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Our story
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Built to close the gap between technology ambition and execution.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Orion Rive was founded on a straightforward observation: large
              organizations rarely struggle because they lack technology. They
              struggle because platforms, data, teams, and decisions are
              disconnected from the work that creates value.
            </p>
            <p>
              We bring together ServiceNow expertise, AI engineering, cloud
              modernization, and custom product development to solve that
              problem at its source. Our teams work alongside business and
              technology leaders—from initial operating-model decisions through
              implementation, adoption, and continuous improvement.
            </p>
            <p>
              The result is not another isolated system. It is a more connected
              enterprise: clearer ownership, faster service, stronger control,
              and technology that earns adoption because it makes work better.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f9fc] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          {[
            [
              "Our mission",
              "To help enterprises transform complex work into connected, intelligent operations—combining platform discipline, thoughtful engineering, and measurable business outcomes.",
            ],
            [
              "Our vision",
              "A future where enterprise technology removes friction instead of creating it, giving every team the clarity and capability to serve customers, employees, and communities better.",
            ],
          ].map(([title, description], index) => (
            <article
              key={title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 sm:p-10"
            >
              <span className="text-xs font-bold text-sky-700">
                0{index + 1}
              </span>
              <h2 className="mt-8 text-3xl font-semibold tracking-tight">
                {title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              What guides us
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Values that show up in the work.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our values are operating principles—used to make decisions,
              resolve trade-offs, and hold every engagement to a higher bar.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "◎",
                "Outcomes over activity",
                "We define success in business terms and keep delivery anchored to the measures executives and operators care about.",
              ],
              [
                "◇",
                "Clarity builds trust",
                "We communicate plainly, surface risk early, and make decisions visible so stakeholders never have to guess where work stands.",
              ],
              [
                "△",
                "Design for adoption",
                "A technically correct solution that people avoid is not a solution. We design around real users, workflows, and incentives.",
              ],
              [
                "↗",
                "Engineer for change",
                "We favor modular architectures, disciplined governance, and maintainable patterns that can evolve with the enterprise.",
              ],
              [
                "✦",
                "Curiosity with rigor",
                "We question assumptions and explore emerging technology, then apply the controls required for enterprise use.",
              ],
              [
                "⊙",
                "Ownership end to end",
                "We take responsibility beyond launch—through quality, enablement, measurable value, and continuous improvement.",
              ],
            ].map(([icon, title, description]) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-xl text-sky-700 transition group-hover:bg-sky-600 group-hover:text-white">
                  {icon}
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Leadership
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Experienced operators. Hands-on technology leaders.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Our leadership team combines enterprise consulting discipline with
              the accountability of people who have built and operated complex
              technology environments.
            </p>
          </div>

          {team.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <article
                  key={member._id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] transition hover:-translate-y-1 hover:border-sky-400/30"
                >
                  {member.photo ? (
                    <Image
                      src={urlFor(member.photo)
                        .width(720)
                        .height(560)
                        .fit("crop")
                        .url()}
                      alt={`${member.name}, ${member.role || "Orion Rive leadership team member"}`}
                      width={720}
                      height={560}
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="text-5xl font-semibold text-sky-300">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${member.name}'s LinkedIn profile`}
                          title={`View ${member.name}'s LinkedIn profile`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#0A66C2] text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#0958a9] focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-[18px] w-[18px]"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6.5 8.2H3.1V19h3.4V8.2ZM4.8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM19.9 12.8c0-3.3-1.8-4.9-4.2-4.9-1.9 0-2.8 1.1-3.3 1.8V8.2H9V19h3.4v-5.3c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19h3.4l.2-6.2Z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    {member.role && (
                      <p className="mt-1 text-sm font-medium text-sky-300">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="mt-4 text-sm leading-6 text-slate-400">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-white/20 bg-white/[0.04] p-10 text-center">
              <p className="font-medium text-white">
                Leadership profiles are being prepared.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Published Team Member documents from Sanity will appear here
                automatically.
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaSection
        eyebrow="Work with Orion Rive"
        title="Bring your most important transformation priorities."
        description="We will bring the platform expertise, engineering discipline, and operating perspective to move them forward."
      />
    </main>
  );
}
