import { groq } from "next-sanity";

import type { JobOpening } from "../../../lib/careers";
import { sanityClient } from "../../../lib/sanity";
import CareersExplorer from "../../components/CareersExplorer";
import { PageHero, PrimaryButton } from "../../components/marketing-shell";

export const revalidate = 60;

const jobsQuery = groq`
  *[_type == "jobOpening" && isActive == true && defined(slug.current)]
  | order(postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    employmentType,
    postedAt
  }
`;

export default async function CareersPage() {
  const jobs = await sanityClient.fetch<JobOpening[]>(
    jobsQuery,
    {},
    { next: { revalidate } },
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="Careers at Orion Rive"
        title="Build the systems that make complex enterprises work better."
        description="Join consultants, engineers, and operators who turn ServiceNow, AI, cloud, and custom technology into measurable improvements for global organizations."
      >
        <PrimaryButton href="#open-positions">Explore open positions</PrimaryButton>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Why Orion Rive</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Work close to the problem—and own the outcome.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                Our teams work directly with the technology and operating leaders accountable for enterprise change. That means understanding why a service is failing, how a workflow crosses organizational boundaries, which controls matter, and what users will actually adopt—not simply completing a backlog of configuration tasks.
              </p>
              <p>
                Orion Rive is intentionally multidisciplinary. ServiceNow consultants collaborate with cloud engineers, AI specialists, product designers, and application developers because the hardest enterprise problems rarely fit inside one platform or discipline. You will be expected to contribute your expertise and learn enough about adjacent domains to make better decisions together.
              </p>
              <p>
                We value clear thinking, direct communication, maintainable engineering, and people who take responsibility beyond launch. Career growth comes through meaningful client responsibility, technical depth, mentorship, and visible contribution to the methods and reusable capabilities that improve every engagement.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Executive access", "Work with the leaders shaping platform, operating-model, and investment decisions."],
              ["02", "Craft over volume", "Build solutions that remain secure, understandable, and maintainable after delivery."],
              ["03", "Cross-domain growth", "Learn across ServiceNow, AI, cloud, automation, and digital product engineering."],
              ["04", "Distributed impact", "Collaborate across client regions while remaining accountable for shared outcomes."],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl">
                <span className="text-xs font-bold text-sky-700">{number}</span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="open-positions" className="scroll-mt-24 border-t border-slate-200 bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Open positions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">Find where your expertise can create leverage.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">Every open role maps to active client or capability priorities. Filter by discipline and working location to find the right fit.</p>
          </div>
          <CareersExplorer jobs={jobs} />
        </div>
      </section>
    </main>
  );
}
