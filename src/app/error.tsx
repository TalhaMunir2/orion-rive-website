"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f7f9fc] px-6 py-20">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-12">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-red-50 text-lg font-bold text-red-700" aria-hidden="true">!</span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">Unable to load this page</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950">The requested content is temporarily unavailable.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">Your request is safe. Try loading the page again, or return shortly if the content service is still recovering.</p>
        <button type="button" onClick={reset} className="mt-7 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-sky-700">Try again</button>
      </div>
    </main>
  );
}
