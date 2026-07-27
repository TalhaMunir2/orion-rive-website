"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "SNCodeX", href: "/sncodex" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function Brand() {
  return (
    <span className="inline-flex items-center gap-3">
      <Image src="/images/orion-rive-logo.png" alt="Orion Rive logo" width={48} height={48} sizes="44px" className="h-11 w-11 object-contain" />
      <span>
        <span className="block text-base font-bold tracking-[-0.02em] text-slate-950">
          ORION RIVE
        </span>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Enterprise Technology
        </span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) return () => { document.body.style.overflow = ""; };

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-950/[0.02] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Orion Rive home"
            className="shrink-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-4"
          >
            <Brand />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="ml-auto hidden items-center gap-0.5 xl:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold transition ${
                  isActive(item.href)
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-[19px] h-0.5 rounded-full bg-sky-500" />
                )}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="ml-auto hidden shrink-0 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 xl:ml-5 xl:inline-flex"
          >
            Schedule Consultation
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M4 10h12m0 0-5-5m5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((open) => !open)}
            className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 xl:hidden"
          >
            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {isOpen && <>
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm xl:hidden"
      />

      <aside
        ref={drawerRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed bottom-0 right-0 top-20 z-40 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl xl:hidden"
      >
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Navigation
          </p>
          <div className="mt-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    d="m8 5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </nav>
        <div className="border-t border-slate-200 bg-slate-50 p-5">
          <p className="mb-4 text-xs leading-5 text-slate-500">
            Ready to modernize your enterprise operations?
          </p>
          <Link
            href="/contact"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700"
          >
            Schedule Consultation
          </Link>
        </div>
      </aside>
      </>}
    </>
  );
}
