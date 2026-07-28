import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[72vh] place-items-center overflow-hidden bg-slate-950 px-6 py-24 text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,.2),transparent_30%),radial-gradient(circle_at_20%_90%,rgba(37,99,235,.16),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">404 · Page not found</p>
        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">This page is outside the current workflow.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">The address may have changed or the page may no longer be available. Return to Orion Rive or continue exploring our enterprise technology services.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 hover:bg-sky-400">Return Home</Link>
          <Link href="/services" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10">Explore Services</Link>
        </div>
      </div>
    </main>
  );
}
