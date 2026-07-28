import { groq } from "next-sanity";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { CaseStudy } from "../../../../lib/insights";
import { sanityClient } from "../../../../lib/sanity";
import { absoluteUrl, createPageMetadata, seoTitle } from "../../../../lib/seo";
import {
  CtaSection,
} from "../../../components/marketing-shell";

export const revalidate = 60;

const detailQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    "imageUrl": coverImage.asset->url,
    industry,
    serviceType,
    clientChallenge,
    proposedSolution,
    implementation,
    results,
    technologiesUsed,
    metrics
  }
`;

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<Array<{ slug: string }>>(
    groq`*[_type == "caseStudy" && defined(slug.current)]{"slug": slug.current}`,
  );
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await sanityClient.fetch<CaseStudy | null>(detailQuery, {
    slug: params.slug,
  });
  if (!item) return {};
  return createPageMetadata({
    title: seoTitle(item.title),
    description: item.summary.slice(0, 157),
    path: `/case-studies/${item.slug}`,
    image: item.imageUrl,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await sanityClient.fetch<CaseStudy | null>(
    detailQuery,
    { slug: params.slug },
    { next: { revalidate } },
  );

  if (!item) notFound();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: absoluteUrl("/case-studies") },
      { "@type": "ListItem", position: 3, name: item.title, item: absoluteUrl(`/case-studies/${item.slug}`) },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
          >
            ← All case studies
          </Link>
          <div className="mt-10 flex flex-wrap gap-2">
            {[item.serviceType, item.industry].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {item.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            {item.summary}
          </p>
        </div>
      </section>

      {item.metrics && item.metrics.length > 0 && (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="px-6 py-10 text-center">
                <p className="text-3xl font-semibold tracking-tight text-sky-700 sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl space-y-16 px-6 lg:px-8">
          <StorySection number="01" title="Client Challenge" body={item.clientChallenge} />
          <StorySection number="02" title="Proposed Solution" body={item.proposedSolution} />
          <StorySection number="03" title="Implementation" body={item.implementation} />
          <StorySection number="04" title="Results" body={item.results} accent />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Technologies used
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {item.technologiesUsed?.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Create measurable value"
        title="Ready to move a complex transformation forward?"
        description="Talk with Orion Rive about the operating challenge, the technology landscape, and the outcomes your organization needs."
      />
    </main>
  );
}

function StorySection({
  number,
  title,
  body,
  accent = false,
}: {
  number: string;
  title: string;
  body?: string;
  accent?: boolean;
}) {
  return (
    <article
      className={
        accent
          ? "rounded-3xl bg-slate-950 p-8 text-white shadow-xl sm:p-12"
          : "grid gap-5 border-t border-slate-200 pt-10 md:grid-cols-[220px_1fr]"
      }
    >
      <div>
        <span className={`text-xs font-bold ${accent ? "text-sky-300" : "text-sky-700"}`}>
          {number}
        </span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <p className={`text-lg leading-8 ${accent ? "mt-6 text-slate-300 md:mt-8" : "text-slate-600"}`}>
        {body}
      </p>
    </article>
  );
}
