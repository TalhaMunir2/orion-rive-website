import { groq } from "next-sanity";

import { sanityClient } from "../../lib/sanity";

export const revalidate = 60;

type Service = {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
};

const servicesQuery = groq`
  *[_type == "service"] | order(title asc) {
    _id,
    title,
    description,
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

export default async function Home() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_left,_rgba(37,99,235,0.16),_transparent_30%)]" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-sky-400">
              Orion Rive
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Transforming Business Through Automation, AI, and Enterprise
              Technology
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              We design resilient digital systems that streamline operations,
              accelerate decisions, and help enterprise teams move with
              confidence.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Schedule Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 py-20 text-slate-950 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Our capabilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Enterprise solutions built for measurable outcomes
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              From strategy through implementation, our services connect
              technology investment to lasting operational value.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service._id}
                  className="group rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-2xl text-sky-700 ring-1 ring-sky-100">
                    {service.icon || "→"}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="mt-3 leading-7 text-slate-600">
                      {service.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              Services published in Sanity will appear here automatically.
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
              Start a conversation
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Ready to modernize how your business operates?
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-100"
          >
            Schedule Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
