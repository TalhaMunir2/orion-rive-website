import Link from "next/link";

import {
  ArrowIcon,
  CtaSection,
  PageHero,
  PrimaryButton,
} from "../../components/marketing-shell";

export default function SNCodeXPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="SNCodeX · ServiceNow Excellence Center"
        title="Build a ServiceNow platform that compounds in value."
        description="SNCodeX combines strategy, architecture, engineering, governance, and adoption expertise to help enterprises turn ServiceNow into a trusted operating platform—not another collection of applications."
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/contact">Speak with SNCodeX</PrimaryButton>
          <a
            href="#expertise"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore our expertise
          </a>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              About SNCodeX
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Your center of excellence for the Now Platform.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              ServiceNow can connect service delivery across technology,
              employees, customers, security, risk, and operations. Realizing
              that potential requires more than implementing modules. It
              requires a coherent platform strategy, disciplined architecture,
              trusted data, strong product ownership, and sustained adoption.
            </p>
            <p>
              SNCodeX gives CIOs and platform leaders one accountable team for
              those capabilities. We work across the platform lifecycle—from
              roadmap and operating model through implementation, integration,
              release governance, and continuous value realization.
            </p>
          </div>
        </div>
      </section>

      <section id="expertise" className="bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Platform expertise
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Deep capability across the enterprise workflow portfolio.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["ITSM", "Modern service operations, employee self-service, knowledge, service-level management, and continual improvement."],
              ["ITOM & AIOps", "Discovery, service mapping, event intelligence, cloud visibility, and service-aware operational resilience."],
              ["CSM", "Connected customer service that coordinates front-office engagement with fulfillment across the enterprise."],
              ["HRSD", "Employee journeys, case management, enterprise service delivery, and a unified digital employee experience."],
              ["SecOps & IRM", "Integrated security response, risk, compliance, controls, audit, and third-party risk workflows."],
              ["App Engine", "Governed custom applications and reusable workflow capabilities built for upgradeability and scale."],
            ].map(([title, description], index) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <span className="text-xs font-bold text-sky-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
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
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                Platform implementations
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Implement for adoption, control, and long-term velocity.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We combine process design, user experience, platform
                architecture, data, testing, enablement, and governance in one
                delivery model.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {[
                ["Strategy & roadmap", "Prioritized platform investment tied to service outcomes, capability maturity, and enterprise architecture."],
                ["Greenfield implementation", "A governed foundation with clear ownership, reliable data, purposeful configuration, and adoption built in."],
                ["Platform modernization", "Reduce technical debt, rationalize customization, improve performance, and restore upgrade confidence."],
                ["Global rollout", "A scalable global template with controlled localization for business units, regions, languages, and regulations."],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="bg-slate-950 p-7 transition hover:bg-white/[0.05]"
                >
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                eyebrow: "Integration services",
                title: "Make ServiceNow part of the enterprise architecture.",
                description:
                  "We design secure, observable integrations that connect ServiceNow to the systems where critical identity, asset, customer, financial, security, and operational data lives.",
                bullets: [
                  "IntegrationHub spokes and flow-based orchestration",
                  "API-led integration and reusable service contracts",
                  "ERP, CRM, IAM, monitoring, security, and cloud platforms",
                  "Data quality, error handling, observability, and support design",
                ],
              },
              {
                eyebrow: "Automation solutions",
                title: "Move from tickets to intelligent fulfillment.",
                description:
                  "We identify high-friction work, redesign it end to end, and orchestrate action across ServiceNow, people, AI services, and connected enterprise systems.",
                bullets: [
                  "Cross-functional workflow automation",
                  "Virtual Agent, Now Assist, and intelligent triage",
                  "Approval, provisioning, remediation, and exception handling",
                  "Performance analytics and continuous optimization",
                ],
              },
            ].map((section) => (
              <article
                key={section.eyebrow}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                  {section.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                  {section.title}
                </h2>
                <p className="mt-5 leading-7 text-slate-600">
                  {section.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm font-medium text-slate-700"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f7f9fc] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Customer success scenarios
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                The outcomes SNCodeX is designed to create.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Representative engagement scenarios. Named client case studies
              and verified metrics will be published as they become available.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              ["Global financial services", "From regional fragmentation to one governed ITSM model", "A multi-region service organization consolidates inconsistent processes, catalogs, and reporting into a global template with controlled localization and executive-level service insight.", "ITSM · Governance · Global rollout"],
              ["Enterprise technology provider", "Service-aware operations across a hybrid estate", "Discovery, service mapping, event correlation, and incident automation connect infrastructure signals to critical services—giving operations teams faster context and cleaner escalation.", "ITOM · AIOps · Integrations"],
              ["Regulated healthcare enterprise", "Continuous risk visibility instead of periodic evidence collection", "Integrated controls, automated evidence, issue management, and policy workflows replace spreadsheet-heavy assurance activity while preserving audit traceability.", "IRM · Automation · Compliance"],
            ].map(([industry, title, description, tags]) => (
              <article
                key={title}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
              >
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-sky-700">
                  {industry}
                </p>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                  {description}
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-xs font-medium text-slate-500">
                    {tags}
                  </span>
                  <span className="text-sky-700 transition group-hover:translate-x-1">
                    <ArrowIcon />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Platform stewardship
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Keep value growing after go-live.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              SNCodeX can operate as your ongoing platform engineering and
              optimization function—improving health, accelerating releases,
              enabling product owners, and maintaining architectural
              discipline as demand grows.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-600"
            >
              Discuss a center-of-excellence model <ArrowIcon />
            </Link>
          </div>
          <div className="rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
              Continuous value cycle
            </p>
            <div className="mt-8 space-y-6">
              {[
                ["01", "Measure", "Platform health, adoption, service performance, and realized value."],
                ["02", "Prioritize", "Demand based on business impact, risk, experience, and architectural fit."],
                ["03", "Release", "Predictable increments with quality controls, enablement, and transparent governance."],
                ["04", "Improve", "Feedback and operational insight translated into the next highest-value change."],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-5">
                  <span className="text-xs font-bold text-sky-300">{number}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="Build platform momentum"
        title="Make ServiceNow a strategic operating advantage."
        description="Whether you are planning a new implementation, modernizing an established instance, or building a global center of excellence, SNCodeX can help."
      />
    </main>
  );
}
