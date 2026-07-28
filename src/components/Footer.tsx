import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  ["ServiceNow Solutions", "/services"],
  ["AI & Automation", "/services"],
  ["Cloud Engineering", "/services"],
  ["Custom Development", "/services"],
];

const companyLinks = [
  ["About", "/about"],
  ["SNCodeX", "/sncodex"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

const insightLinks = [
  ["Case Studies", "/case-studies"],
  ["Insights & Blog", "/blog"],
];

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h2>
      <ul className="mt-5 space-y-3.5 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="inline-flex text-slate-400 transition duration-200 hover:translate-x-0.5 hover:text-sky-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8 lg:pt-16">
        <div className="mb-14 flex flex-col gap-7 rounded-3xl border border-white/10 bg-white/[0.045] px-6 py-7 shadow-2xl shadow-black/10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-9">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              Strategic technology partnership
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
              Build the operating advantage your technology investments should
              deliver.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Schedule consultation{" "}
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-md sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <Image
                src="/images/orion-rive-logo.png"
                alt="Orion Rive Solutions"
                width={52}
                height={52}
                sizes="52px"
                className="h-[52px] w-[52px] object-contain"
              />
              <span>
                <span className="block text-base font-bold tracking-tight text-white">
                  ORION RIVE
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Enterprise Technology
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Enterprise transformation across ServiceNow, responsible AI, cloud
              platforms, automation, and custom software—designed for measurable
              operational impact.
            </p>
            <a
              href="mailto:hello@orionrive.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              hello@orionrive.com <span aria-hidden="true">↗</span>
            </a>
          </div>

          <FooterLinks title="Services" links={serviceLinks} />
          <FooterLinks title="Company" links={companyLinks} />
          <FooterLinks title="Insights" links={insightLinks} />
        </div>

        <div className="flex flex-col gap-5 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} Orion Rive Solutions. All rights
              reserved.
            </p>
            <p className="mt-1.5">
              Serving enterprises across the USA, UK, Canada, and Middle East.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
