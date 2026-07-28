import { groq } from "next-sanity";
import Link from "next/link";

import { sanityClient } from "../../lib/sanity";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Enterprise Automation, AI & ServiceNow | Orion Rive",
  description:
    "Modernize enterprise operations with ServiceNow, responsible AI, cloud platforms, automation, and custom software from Orion Rive.",
  path: "/",
});

export const revalidate = 60;

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  icon?: string;
  category: string;
};

const servicesQuery = groq`
  *[
    _type == "service" &&
    featured == true &&
    defined(category) &&
    defined(slug.current)
  ] | order(displayOrder asc, title asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    category
  }
`;

const serviceNowCapabilities = [
  {
    number: "01",
    title: "IT Service Management",
    description:
      "Standardize service delivery across regions and business units with intelligent routing, governed self-service, trusted knowledge, and experience-level reporting.",
  },
  {
    number: "02",
    title: "IT Operations & AIOps",
    description:
      "Connect infrastructure signals to business services, reduce event noise, and automate remediation before operational disruption reaches employees or customers.",
  },
  {
    number: "03",
    title: "Security Operations",
    description:
      "Orchestrate vulnerability and incident response across security, IT, and asset data with clear ownership, measurable response times, and auditable decisions.",
  },
  {
    number: "04",
    title: "Integrated Risk Management",
    description:
      "Replace fragmented assessments with connected controls, continuous evidence, and decision-ready risk visibility for executives, auditors, and control owners.",
  },
  {
    number: "05",
    title: "Customer & Employee Workflows",
    description:
      "Unify customer, HR, workplace, and shared-service journeys so people receive consistent service while teams operate from one accountable workflow.",
  },
  {
    number: "06",
    title: "Platform Engineering",
    description:
      "Establish the architecture, development standards, integrations, release controls, and product governance required to scale the Now Platform safely.",
  },
];

const deliveryStages = [
  {
    number: "01",
    title: "Discover",
    description:
      "We align executive sponsors, service owners, architects, and delivery teams around the operating problem. Current performance, platform constraints, risk, and value measures become a fact-based transformation brief.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We define the target operating model, workflow experience, architecture, data model, controls, and delivery roadmap. Every design decision is traced to adoption, resilience, and measurable business value.",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Cross-functional teams build in governed increments with automated quality checks, transparent decision logs, and early user validation. Enablement and operational readiness progress with the technology—not after it.",
  },
  {
    number: "04",
    title: "Optimize",
    description:
      "We measure service performance, adoption, control effectiveness, and realized value against the baseline. The resulting evidence drives backlog priorities and continuous platform improvement.",
  },
];

const industries = [
  "Financial Services",
  "Healthcare",
  "Technology",
  "Public Sector",
  "Manufacturing",
  "Professional Services",
];

const outcomes = [
  {
    title: "Faster service",
    description:
      "Shorten fulfillment and resolution time by removing avoidable queues, handoffs, and manual coordination.",
  },
  {
    title: "Better experiences",
    description:
      "Give employees and customers consistent, low-friction service across channels, regions, and business functions.",
  },
  {
    title: "Stronger control",
    description:
      "Embed security, compliance, approval, and audit requirements directly into the flow of operational work.",
  },
  {
    title: "Actionable intelligence",
    description:
      "Turn workflow and operational data into timely decisions about demand, risk, capacity, and service performance.",
  },
];

async function getServices() {
  try {
    return await sanityClient.fetch<Service[]>(
      servicesQuery,
      {},
      { next: { revalidate } },
    );
  } catch (error) {
    console.error("Unable to load featured services from Sanity:", error);
    return [];
  }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function Home() {
  const services = await getServices();

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_16%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_15%_88%,rgba(37,99,235,0.14),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-32">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-sky-400"
                aria-hidden="true"
              />
              ServiceNow · AI · Enterprise Automation
            </p>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Turn enterprise technology into
              <span className="block bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                operating advantage.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Orion Rive designs and delivers governed ServiceNow platforms,
              responsible AI, cloud foundations, and enterprise applications
              that reduce service friction, strengthen control, and give
              technology leaders a clearer path from investment to measurable
              value.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Schedule Consultation <ArrowIcon />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
              >
                Explore Services <ArrowIcon />
              </Link>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {[
                "Board-aligned transformation roadmaps",
                "Governed platform engineering",
                "Responsible AI with production controls",
              ].map((item) => (
                <span key={item} className="flex items-start gap-2.5 leading-6">
                  <span className="mt-0.5 shrink-0 text-sky-400">
                    <CheckIcon />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-lg"
            aria-label="Connected enterprise workflow model"
          >
            <div className="absolute -inset-10 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    Enterprise workflow control plane
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    One operating model. Shared accountability.
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-emerald-300">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]"
                    aria-hidden="true"
                  />
                  Governed
                </span>
              </div>
              <div className="relative my-7 grid grid-cols-2 gap-3">
                {[
                  ["IT", "Service delivery", "Standardized"],
                  ["OPS", "Operations", "Observable"],
                  ["SEC", "Security", "Controlled"],
                  ["EXP", "Enterprise experience", "Connected"],
                ].map(([tag, title, state]) => (
                  <div
                    key={tag}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-400/10 text-[10px] font-bold text-sky-300">
                        {tag}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                        {state}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">
                      {title}
                    </p>
                  </div>
                ))}
                <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-bold text-white shadow-[0_0_40px_rgba(14,165,233,.4)]">
                  OR
                </div>
              </div>
              <div className="rounded-2xl border border-sky-400/15 bg-sky-400/[0.07] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Transformation foundations
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-medium text-slate-200 sm:grid-cols-4">
                  {["Architecture", "Data", "Governance", "Adoption"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Enterprise credibility */}
      <section
        aria-label="Enterprise delivery credentials"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
          {[
            [
              "Strategy to scale",
              "Executive alignment through sustainable operating capability",
            ],
            [
              "ServiceNow platform expertise",
              "Architecture, implementation, integration, and governance",
            ],
            [
              "AI-powered workflow innovation",
              "Production AI connected to authoritative enterprise data",
            ],
            [
              "Enterprise-grade security and governance",
              "Controls designed into platforms and delivery",
            ],
          ].map(([title, description]) => (
            <div key={title} className="px-5 py-7 sm:min-h-32 lg:px-6">
              <h2 className="text-sm font-semibold leading-6 text-slate-950">
                {title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ServiceNow expertise */}
      <section id="expertise" className="bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                ServiceNow expertise
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Make the Now Platform accountable to business performance.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We connect platform strategy, architecture, implementation,
                data, governance, and adoption so ServiceNow becomes a durable
                enterprise operating platform—not a collection of disconnected
                modules.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:gap-3 hover:text-sky-600"
              >
                Explore ServiceNow capabilities <ArrowIcon />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceNowCapabilities.map((capability) => (
                <article
                  key={capability.number}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <span className="text-xs font-bold text-sky-700">
                    {capability.number}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {capability.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured services from Sanity */}
      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Featured services
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Capabilities structured around enterprise outcomes.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm leading-7 text-slate-600">
                Engage Orion Rive for a focused capability, a multi-platform
                program, or an accountable transformation partnership spanning
                strategy through optimization.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-600"
              >
                View all services <ArrowIcon />
              </Link>
            </div>
          </div>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service._id}
                  className="group flex min-h-72 flex-col bg-white p-7 transition duration-300 hover:bg-slate-950 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 min-w-12 place-items-center rounded-xl bg-sky-50 px-2 text-lg text-sky-700 transition group-hover:bg-white/10 group-hover:text-sky-300">
                      {service.icon || "◆"}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950 transition group-hover:text-white">
                    {service.title}
                  </h3>
                  {service.shortDescription && (
                    <p className="mt-3 leading-7 text-slate-600 transition group-hover:text-slate-300">
                      {service.shortDescription}
                    </p>
                  )}
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-sky-700 transition group-hover:gap-3 group-hover:text-sky-300"
                  >
                    Explore service <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:flex-row sm:items-center sm:p-10">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-slate-950">
                  Explore the complete Orion Rive service portfolio.
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  Review our ServiceNow, AI, cloud, and custom development
                  capabilities organized around the operating priorities of
                  complex enterprises.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Explore Services <ArrowIcon />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. Delivery approach */}
      <section id="approach" className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Delivery approach
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Transformation governed from executive intent to operational
                value.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-300">
              A four-stage model keeps business outcomes, user adoption,
              architecture, security, and delivery economics connected
              throughout the program.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {deliveryStages.map((stage) => (
              <article
                key={stage.number}
                className="border-t border-white/20 pt-6 transition duration-300 hover:border-sky-400"
              >
                <span className="text-sm font-semibold text-sky-300">
                  {stage.number}
                </span>
                <h3 className="mt-8 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {stage.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries and outcomes */}
      <section
        id="industries"
        className="border-y border-slate-200 bg-white py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Built for complex enterprises
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Technology decisions shaped by industry reality.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Global programs must work across regulatory regimes, legacy
                estates, regional operating models, security obligations, and
                demanding service expectations. We design for that complexity
                from the outset.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {industries.map((industry) => (
                  <div
                    key={industry}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-sky-500"
                      aria-hidden="true"
                    />
                    {industry}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-[0_24px_70px_-36px_rgba(15,23,42,.3)] sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                Business outcomes
              </p>
              <div className="mt-6 space-y-6">
                {outcomes.map((outcome) => (
                  <div key={outcome.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-700">
                      <CheckIcon />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {outcome.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {outcome.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final consultation CTA */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(14,165,233,.24),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(37,99,235,.18),transparent_32%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Executive consultation
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Move your highest-priority technology initiative from uncertainty
              to an executable plan.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Bring us the operating challenge, platform constraint, or
              transformation objective. We will help frame the decisions,
              dependencies, and delivery path required to create measurable
              enterprise value.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-sky-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Contact Orion Rive <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
