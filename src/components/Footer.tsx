import Image from "next/image";
import type { ReactNode } from "react";
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

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/orion-rive-solutions/",
    icon: "linkedin",
    color: "bg-[#0A66C2] text-white hover:bg-[#0958a9]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595834760200",
    icon: "facebook",
    color: "bg-[#1877F2] text-white hover:bg-[#1266d4]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/orionrive/",
    icon: "instagram",
    color:
      "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white hover:brightness-110",
  },
  {
    label: "X (Twitter)",
    href: "",
    icon: "x",
    color: "bg-white text-black hover:bg-slate-200",
  },
] as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];

function SocialIcon({ name }: { name: SocialIconName }) {
  const paths: Record<SocialIconName, ReactNode> = {
    linkedin: (
      <path d="M6.5 8.2H3.1V19h3.4V8.2ZM4.8 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM19.9 12.8c0-3.3-1.8-4.9-4.2-4.9-1.9 0-2.8 1.1-3.3 1.8V8.2H9V19h3.4v-5.3c0-1.4.3-2.8 2.1-2.8 1.8 0 1.8 1.7 1.8 2.9V19h3.4l.2-6.2Z" />
    ),
    facebook: (
      <path d="M13.8 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V13h2.8v8h3.5Z" />
    ),
    instagram: (
      <>
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.6" cy="6.6" r="1.1" />
      </>
    ),
    x: (
      <path d="M4.2 3.5h4.3l4.6 6.2 5.4-6.2h1.4l-6.2 7.2 6.6 9.8H16l-5-6.8-5.9 6.8H3.7l6.6-7.8-6.1-9.2Zm3.6 1.2H6.5l10.2 14.6H18L7.8 4.7Z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="sm:text-right">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        Follow Orion Rive
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5 sm:justify-end">
        {socialLinks.map((social) => {
          const className = `grid h-10 w-10 place-items-center rounded-xl border border-white/10 shadow-lg shadow-black/15 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${social.color}`;

          return social.href ? (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className={className}
            >
              <SocialIcon name={social.icon} />
            </a>
          ) : (
            <span
              key={social.label}
              role="link"
              aria-label={`${social.label} link coming soon`}
              aria-disabled="true"
              title={`${social.label} link coming soon`}
              className={`${className} cursor-not-allowed`}
            >
              <SocialIcon name={social.icon} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

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
              href="mailto:orion.rivesolutions@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              orion.rivesolutions@gmail.com <span aria-hidden="true">↗</span>
            </a>
          </div>

          <FooterLinks title="Services" links={serviceLinks} />
          <FooterLinks title="Company" links={companyLinks} />
          <FooterLinks title="Insights" links={insightLinks} />
        </div>

        <div className="flex flex-col gap-7 pt-7 text-xs text-slate-500 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} Orion Rive Solutions. All rights
              reserved.
            </p>
            <p className="mt-1.5">
              Serving enterprises across the USA, UK, Canada, and Middle East.
            </p>
          </div>
          <div className="flex flex-col gap-5 sm:items-end">
            <SocialLinks />
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
