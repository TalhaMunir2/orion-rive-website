import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { JobOpening } from "../../../../lib/careers";
import { sanityClient } from "../../../../lib/sanity";
import JobApplicationForm from "../../../components/JobApplicationForm";

export const revalidate = 60;

const jobQuery = groq`
  *[_type == "jobOpening" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    employmentType,
    description,
    requirements,
    postedAt
  }
`;

export async function generateStaticParams() {
  return sanityClient.fetch<Array<{ slug: string }>>(
    groq`*[_type == "jobOpening" && isActive == true && defined(slug.current)]{"slug": slug.current}`,
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await sanityClient.fetch<JobOpening | null>(jobQuery, { slug: params.slug });
  if (!job) return {};
  return {
    title: `${job.title} | Careers at Orion Rive`,
    description: `Join Orion Rive as ${job.title} in ${job.location}. Explore the role, requirements, and apply online.`,
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-slate-950">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-950">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-8 text-slate-600">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-8 ml-6 list-disc space-y-3 text-lg leading-8 text-slate-600">{children}</ul>,
    number: ({ children }) => <ol className="mb-8 ml-6 list-decimal space-y-3 text-lg leading-8 text-slate-600">{children}</ol>,
  },
};

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await sanityClient.fetch<JobOpening | null>(
    jobQuery,
    { slug: params.slug },
    { next: { revalidate } },
  );
  if (!job) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <Link href="/careers" className="text-sm font-semibold text-sky-300 transition hover:text-sky-200">← All careers</Link>
          <div className="mt-10 flex flex-wrap gap-2">
            {[job.department, job.employmentType].map((item) => (
              <span key={item} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-200">{item}</span>
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{job.title}</h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
            <span>{job.location}</span>
            <span>Posted {formatDate(job.postedAt)}</span>
          </div>
          <a href="#apply" className="mt-10 inline-flex items-center rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-sky-400">Apply Now</a>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <article>{job.description && <PortableText value={job.description} components={portableTextComponents} />}</article>
          <aside>
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-[#f7f9fc] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">What you bring</p>
              <ul className="mt-6 space-y-4">
                {job.requirements?.map((requirement) => (
                  <li key={requirement} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-100 text-[10px] font-bold text-sky-700">✓</span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <JobApplicationForm jobTitle={job.title} jobSlug={job.slug} />
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}
