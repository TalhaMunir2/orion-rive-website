import { groq } from "next-sanity";
import Link from "next/link";

import {
  type SanityService,
  type ServiceCategory,
  serviceCategories,
} from "../../../lib/service-catalog";
import { sanityClient } from "../../../lib/sanity";
import {
  ArrowIcon,
  CtaSection,
  PageHero,
  PrimaryButton,
} from "../../components/marketing-shell";

export const revalidate = 60;

const servicesQuery = groq`
  *[
    _type == "service" &&
    defined(category) &&
    defined(slug.current)
  ] | order(displayOrder asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    icon,
    category,
    featured,
    displayOrder,
    capabilities,
    businessOutcomes
  }
`;

async function getServices() {
  try {
    return await sanityClient.fetch<SanityService[]>(
      servicesQuery,
      {},
      { next: { revalidate } },
    );
  } catch (error) {
    console.error("Unable to load services from Sanity:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();
  const categories = Object.entries(serviceCategories) as Array<
    [ServiceCategory, (typeof serviceCategories)[ServiceCategory]]
  >;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="Enterprise technology services"
        title="From platform strategy to production impact."
        description="Orion Rive brings together ServiceNow, AI, cloud, and product engineering capabilities to modernize operations without fragmenting your technology landscape."
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/contact">Discuss your priorities</PrimaryButton>
          <a
            href="#capabilities"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View capabilities
          </a>
        </div>
      </PageHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-8 sm:grid-cols-4 lg:px-8">
          {categories.map(([id, category]) => (
            <a
              key={id}
              href={`#${id}`}
              className="border-l border-slate-200 px-4 py-3 transition hover:bg-slate-50 sm:px-6"
            >
              <span className="text-xs font-bold text-sky-700">
                {category.number}
              </span>
              <span className="mt-1 block text-sm font-semibold">
                {category.title.replace(" Solutions", "")}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="capabilities" className="bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Integrated capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Solve across the enterprise—not in isolated workstreams.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Every service below is managed in Sanity, giving Orion Rive one
              trusted catalog across the website and a scalable foundation for
              service-specific content.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="mt-12 space-y-5">
              {categories.map(([id, category], categoryIndex) => {
                const categoryServices = services.filter(
                  (service) => service.category === id,
                );

                if (categoryServices.length === 0) return null;

                return (
                  <details
                    key={id}
                    id={id}
                    open={categoryIndex === 0}
                    className="group scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 marker:hidden sm:p-8">
                      <div className="flex gap-5 sm:gap-8">
                        <span className="pt-1 text-xs font-bold text-sky-700">
                          {category.number}
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                            {category.title}
                          </h3>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                            {category.summary}
                          </p>
                        </div>
                      </div>
                      <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-200 text-xl text-slate-600 transition group-open:rotate-45 group-open:border-sky-200 group-open:bg-sky-50 group-open:text-sky-700">
                        +
                      </span>
                    </summary>
                    <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryServices.map((service) => (
                        <Link
                          key={service._id}
                          href={`/services/${service.slug}`}
                          className="group/card bg-white p-7 transition hover:bg-slate-950 sm:p-8"
                        >
                          <div className="flex items-center justify-between">
                            <span className="grid h-11 min-w-11 place-items-center rounded-xl bg-sky-50 px-2 text-xs font-bold text-sky-700 transition group-hover/card:bg-white/10 group-hover/card:text-sky-300">
                              {service.icon || "OR"}
                            </span>
                            <span className="text-slate-300 transition group-hover/card:translate-x-1 group-hover/card:text-sky-300">
                              <ArrowIcon />
                            </span>
                          </div>
                          <h4 className="mt-8 text-lg font-semibold transition group-hover/card:text-white">
                            {service.title}
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-slate-600 transition group-hover/card:text-slate-300">
                            {service.shortDescription}
                          </p>
                          <span className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.14em] text-sky-700 group-hover/card:text-sky-300">
                            Explore service
                          </span>
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-semibold text-slate-800">
                The service catalog is temporarily unavailable.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Please refresh shortly or contact Orion Rive for immediate
                assistance.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Delivery that scales
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              The right engagement model for the outcome.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our teams can lead a defined transformation, augment an existing
              program, establish a product-aligned delivery pod, or provide
              ongoing platform engineering and optimization.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Advisory", "Roadmaps, business cases, operating models, architecture, and governance."],
              ["Implementation", "Outcome-led delivery from design through launch, adoption, and stabilization."],
              ["Engineering pods", "Cross-functional teams aligned to a platform, product, or business capability."],
              ["Managed optimization", "Continuous improvement, release management, platform health, and value realization."],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Define the next move"
        title="Turn a complex technology agenda into a practical delivery plan."
        description="Share your priorities, constraints, and current environment. Our specialists will help identify the highest-value path forward."
      />
    </main>
  );
}
