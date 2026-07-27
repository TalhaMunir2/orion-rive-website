import { groq } from "next-sanity";

import type { CaseStudy } from "../../../lib/insights";
import { sanityClient } from "../../../lib/sanity";
import CaseStudyExplorer from "../../components/CaseStudyExplorer";
import {
  CtaSection,
  PageHero,
  PrimaryButton,
} from "../../components/marketing-shell";

export const revalidate = 60;

const query = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    "imageUrl": coverImage.asset->url,
    industry,
    serviceType
  }
`;

export default async function CaseStudiesPage() {
  const caseStudies = await sanityClient.fetch<CaseStudy[]>(
    query,
    {},
    { next: { revalidate } },
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="Customer outcomes"
        title="Transformation proven in the work."
        description="Explore how enterprise technology leaders are simplifying operations, strengthening control, and creating measurable value across ServiceNow, AI, cloud, and digital products."
      >
        <PrimaryButton href="/contact">Discuss your transformation</PrimaryButton>
      </PageHero>

      <section className="bg-[#f7f9fc] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Customer stories
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Find the outcomes most relevant to your agenda.
            </h2>
          </div>
          <CaseStudyExplorer caseStudies={caseStudies} />
        </div>
      </section>

      <CtaSection
        eyebrow="Your next success story"
        title="Bring us the business problem behind the technology initiative."
        description="We will help turn it into a focused roadmap, a dependable delivery model, and outcomes your stakeholders can measure."
      />
    </main>
  );
}
