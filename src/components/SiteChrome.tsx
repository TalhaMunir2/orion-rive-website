"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return <>
    <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg transition focus:translate-y-0">
      Skip to main content
    </a>
    <Navbar />
    <div id="main-content" tabIndex={-1}>{children}</div>
    <Footer />
  </>;
}
