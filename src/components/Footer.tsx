import Link from "next/link";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["SNCodeX", "/sncodex"],
  ["Case Studies", "/case-studies"],
  ["Blog", "/blog"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-sm font-bold text-white">
                OR
              </span>
              <span>
                <span className="block text-base font-bold text-white">
                  ORION RIVE
                </span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Enterprise Technology
                </span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-7">
              We help global enterprises modernize operations through
              ServiceNow, responsible AI, cloud engineering, and custom digital
              products.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Quick links
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm lg:grid-cols-1">
              {quickLinks.slice(0, 4).map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Resources
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.slice(4).map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Connect
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <a
                href="mailto:hello@orionrive.com"
                className="block font-medium text-sky-300 transition hover:text-sky-200"
              >
                hello@orionrive.com
              </a>
              <p className="leading-6">
                Serving clients across the USA, UK, Canada, and Middle East.
              </p>
              <div className="flex gap-3 pt-2">
                {["in", "X", "YT"].map((social) => (
                  <span
                    key={social}
                    aria-label={`${social} social link placeholder`}
                    className="grid h-9 w-9 cursor-default place-items-center rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold text-slate-300"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orion Rive. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
