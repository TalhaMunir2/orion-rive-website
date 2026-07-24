import { groq } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  type SanityService,
  serviceCategories,
} from "../../../../lib/service-catalog";
import { sanityClient } from "../../../../lib/sanity";
import {
  ArrowIcon,
  CtaSection,
  PageHero,
  PrimaryButton,
} from "../../../components/marketing-shell";

export const revalidate = 60;

const serviceQuery = groq`
  *[
    _type == "service" &&
    slug.current == $slug &&
    defined(category)
  ][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    category,
    capabilities,
    businessOutcomes
  }
`;

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await sanityClient.fetch<SanityService | null>(
    serviceQuery,
    { slug: params.slug },
    { next: { revalidate } },
  );

  if (!service || !serviceCategories[service.category]) {
    notFound();
  }

  const category = serviceCategories[service.category];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow={`${category.title} · ${service.icon || "OR"}`}
        title={service.title}
        description={service.shortDescription}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/contact">Discuss this capability</PrimaryButton>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            All services <ArrowIcon />
          </Link>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Capability overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Designed for dependable enterprise value.
            </h2>
          </div>
          <p className="text-lg leading-8 text-slate-600">
            {service.fullDescription || service.shortDescription}
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <ListCard
            number="01"
            title="What we deliver"
            items={service.capabilities || []}
          />
          <ListCard
            number="02"
            title="Business outcomes"
            items={service.businessOutcomes || []}
          />
        </div>
      </section>

      <CtaSection
        eyebrow={service.title}
        title="Move from capability planning to measurable progress."
        description="Share your current environment, priorities, and constraints. Orion Rive will help define a practical path from strategy through production."
      />
    </main>
  );
}

function ListCard({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
      <span className="text-xs font-bold text-sky-700">{number}</span>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-8 space-y-5">
        {items.map((item) => (
          <li key={item} className="flex gap-4 text-slate-700">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
              ✓
            </span>
            <span className="leading-6">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
