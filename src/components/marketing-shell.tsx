import Link from "next/link";
import type { ReactNode } from "react";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 44 44" aria-hidden="true" className="h-10 w-10">
        <defs>
          <linearGradient id="brand-gradient" x1="4" y1="4" x2="40" y2="40">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <rect width="44" height="44" rx="12" fill="url(#brand-gradient)" />
        <ellipse
          cx="22"
          cy="22"
          rx="14"
          ry="7"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          transform="rotate(-35 22 22)"
          opacity=".72"
        />
        <circle cx="32.5" cy="13.5" r="2.4" fill="white" />
        <path
          d="M15.5 27V17h4.2c3.2 0 5.3 1.9 5.3 5s-2.1 5-5.3 5h-4.2Zm3-2.5h1c1.5 0 2.4-.8 2.4-2.5s-.9-2.5-2.4-2.5h-1v5Z"
          fill="white"
        />
      </svg>
      <span>
        <span
          className={`block text-base font-bold tracking-[-0.02em] ${
            inverse ? "text-white" : "text-slate-950"
          }`}
        >
          ORION RIVE
        </span>
        <span
          className={`block text-[9px] font-semibold uppercase tracking-[0.2em] ${
            inverse ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Enterprise Technology
        </span>
      </span>
    </span>
  );
}

export function ArrowIcon() {
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

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Orion Rive home"
          className="rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-4"
        >
          <BrandLogo />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <Link
            href="/services"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
          >
            Services
          </Link>
          <Link
            href="/sncodex"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
          >
            SNCodeX
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
          >
            About
          </Link>
          <Link
            href="/#industries"
            className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
          >
            Industries
          </Link>
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:px-5 sm:py-3"
        >
          <span className="hidden sm:inline">Talk to an expert</span>
          <span className="sm:hidden">Contact</span>
          <ArrowIcon />
        </Link>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <BrandLogo inverse />
            <p className="mt-5 text-sm leading-6">
              Enterprise transformation across ServiceNow, automation, AI,
              cloud, and connected digital operations.
            </p>
          </div>
          <FooterLinks
            title="Solutions"
            links={[
              ["ServiceNow", "/sncodex"],
              ["AI & Automation", "/services#ai"],
              ["Cloud", "/services#cloud"],
              ["Custom Development", "/services#development"],
            ]}
          />
          <FooterLinks
            title="Company"
            links={[
              ["About", "/about"],
              ["Services", "/services"],
              ["SNCodeX", "/sncodex"],
              ["Contact", "/contact"],
            ]}
          />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              Start a conversation
            </h3>
            <p className="mt-5 text-sm leading-6">
              Tell us what you want to transform. We&apos;ll help define the
              next practical step.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              Get in touch <ArrowIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Orion Rive. All rights reserved.</p>
          <p>ServiceNow is a trademark of ServiceNow, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(14,165,233,.19),transparent_30%),radial-gradient(circle_at_15%_90%,rgba(37,99,235,.16),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            {description}
          </p>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function CtaSection({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-sky-600">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-100">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-sky-100">{description}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
        >
          Start a conversation <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
