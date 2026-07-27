import { groq } from "next-sanity";
import Link from "next/link";

import { sanityClient } from "../../lib/sanity";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Enterprise Automation, AI & ServiceNow | Orion Rive",
  description: "Modernize enterprise operations with ServiceNow, responsible AI, cloud platforms, automation, and custom software from Orion Rive.",
  path: "/",
});

export const revalidate = 60;

type Service = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  icon?: string;
};

const servicesQuery = groq`
  *[
    _type == "service" &&
    featured == true &&
    defined(category) &&
    defined(slug.current)
  ] | order(displayOrder asc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon
  }
`;

async function getServices() {
  return sanityClient.fetch<Service[]>(
    servicesQuery,
    {},
    { next: { revalidate } },
  );
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
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.2),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.18),transparent_34%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              ServiceNow · AI · Enterprise Automation
            </div>
            <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.4rem]">
              Make work flow.
              <span className="block bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                Make transformation real.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Orion Rive helps enterprises modernize operations on the
              ServiceNow platform—connecting people, processes, data, and AI
              into workflows that produce measurable business outcomes.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Schedule a consultation
                <ArrowIcon />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Explore our capabilities
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
              {[
                "Outcome-led strategy",
                "Platform engineering",
                "Responsible AI adoption",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="text-sky-400">
                    <CheckIcon />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-12 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
                    Connected enterprise
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    One platform. Shared intelligence.
                  </p>
                </div>
                <span className="flex items-center gap-2 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
                  Operational
                </span>
              </div>
              <div className="relative my-7 grid grid-cols-2 gap-3">
                {[
                  ["IT", "Service Management", "99.9%"],
                  ["OPS", "Operations", "24/7"],
                  ["SEC", "Security", "Live"],
                  ["HR", "Employee Workflows", "+42%"],
                ].map(([tag, title, stat]) => (
                  <div
                    key={tag}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-400/10 text-[10px] font-bold text-sky-300">
                        {tag}
                      </span>
                      <span className="text-xs font-semibold text-emerald-300">
                        {stat}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-medium text-white">{title}</p>
                  </div>
                ))}
                <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-slate-950 bg-gradient-to-br from-sky-400 to-blue-600 text-xs font-bold text-white shadow-[0_0_40px_rgba(14,165,233,.45)]">
                  NOW
                </div>
              </div>
              <div className="rounded-2xl border border-sky-400/15 bg-sky-400/[0.07] p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Workflow health</p>
                    <p className="mt-1 text-2xl font-semibold text-white">94%</p>
                  </div>
                  <div className="flex h-12 items-end gap-1">
                    {[35, 48, 42, 65, 58, 78, 72, 92].map((height, i) => (
                      <span
                        key={i}
                        className="w-2 rounded-t bg-gradient-to-t from-blue-600 to-sky-300"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-6 py-8 sm:grid-cols-4 lg:px-8">
          {[
            ["Strategy to scale", "End-to-end delivery"],
            ["ServiceNow", "Platform expertise"],
            ["AI-powered", "Workflow innovation"],
            ["Enterprise-grade", "Security & governance"],
          ].map(([title, label]) => (
            <div key={title} className="px-4 py-3 text-center">
              <p className="text-base font-semibold text-slate-950">{title}</p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="expertise" className="bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                ServiceNow expertise
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">
                Unlock more value from the Now Platform.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                We align platform capabilities to business priorities—then
                design, implement, integrate, and optimize workflows built for
                adoption and scale.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-600"
              >
                Discuss your platform roadmap
                <ArrowIcon />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "01",
                  "IT Service Management",
                  "Modernize service delivery with intelligent routing, self-service, knowledge, and measurable experience improvement.",
                ],
                [
                  "02",
                  "IT Operations & AIOps",
                  "Build service-aware operations with stronger visibility, event intelligence, automation, and operational resilience.",
                ],
                [
                  "03",
                  "Security Operations",
                  "Connect security teams, tools, and workflows to accelerate response while maintaining control and auditability.",
                ],
                [
                  "04",
                  "Integrated Risk Management",
                  "Replace fragmented risk activity with connected controls, continuous monitoring, and decision-ready insight.",
                ],
                [
                  "05",
                  "Customer & Employee Workflows",
                  "Create seamless service experiences across customer operations, HR, facilities, and shared services.",
                ],
                [
                  "06",
                  "Platform Engineering",
                  "Establish scalable architecture, integrations, governance, and custom applications on a trusted platform foundation.",
                ],
              ].map(([number, title, description]) => (
                <article
                  key={number}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <span className="text-xs font-bold text-sky-700">{number}</span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Our services
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                The capabilities to move from ambition to outcome.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Flexible support across the complete transformation lifecycle,
              grounded in enterprise architecture and measurable value.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service._id}
                  className="group min-h-64 bg-white p-8 transition hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-sky-50 text-xl text-sky-700 transition group-hover:bg-white/10 group-hover:text-sky-300">
                      {service.icon || "◆"}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-500">
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
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition group-hover:text-sky-300"
                  >
                    Explore service <ArrowIcon />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <p className="font-medium text-slate-700">
                Your Sanity services will appear here automatically.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Publish a Service document to populate this section.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="approach" className="bg-slate-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              How we work
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Transformation engineered for lasting adoption.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Our delivery model keeps business value, user experience,
              architecture, and governance connected from day one.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Discover",
                "Align stakeholders, baseline performance, and define the outcomes worth pursuing.",
              ],
              [
                "02",
                "Design",
                "Shape the operating model, experience, architecture, data, and delivery roadmap.",
              ],
              [
                "03",
                "Deliver",
                "Build iteratively with transparent governance, quality engineering, and enablement.",
              ],
              [
                "04",
                "Optimize",
                "Measure value, improve adoption, and continuously evolve the platform at scale.",
              ],
            ].map(([number, title, description]) => (
              <article
                key={number}
                className="border-t border-white/20 pt-6"
              >
                <span className="text-sm font-semibold text-sky-300">
                  {number}
                </span>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Built for complex enterprises
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Industry context changes everything.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Enterprise workflows must account for regulatory obligations,
                legacy technology, operating risk, and the realities of how
                people work. Our approach is designed around that complexity.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Financial Services",
                  "Healthcare",
                  "Technology",
                  "Public Sector",
                  "Manufacturing",
                  "Professional Services",
                ].map((industry) => (
                  <div
                    key={industry}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {industry}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Business outcomes
              </p>
              <div className="mt-6 space-y-6">
                {[
                  [
                    "Faster service",
                    "Reduce manual handoffs and cycle time through orchestrated workflows.",
                  ],
                  [
                    "Better experiences",
                    "Give employees and customers simple, consistent ways to get work done.",
                  ],
                  [
                    "Stronger control",
                    "Embed security, compliance, auditability, and governance into daily work.",
                  ],
                  [
                    "Actionable intelligence",
                    "Turn operational data into insight that improves decisions and performance.",
                  ],
                ].map(([title, description]) => (
                  <div key={title} className="flex gap-4">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-700">
                      <CheckIcon />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-950">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-sky-600">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-100">
              Ready to move forward?
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Let&apos;s build the workflow advantage your enterprise needs.
            </h2>
            <p className="mt-5 text-lg text-sky-100">
              Start with a focused conversation about your priorities,
              platform, and path to measurable value.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-600"
          >
            Contact Orion Rive
            <ArrowIcon />
          </Link>
        </div>
      </section>

    </main>
  );
}
