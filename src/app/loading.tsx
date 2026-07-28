export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading page" className="min-h-[70vh] bg-white">
      <div className="bg-slate-950">
        <div className="mx-auto max-w-7xl animate-pulse px-6 py-20 sm:py-28 lg:px-8">
          <div className="h-3 w-40 rounded-full bg-sky-400/20" />
          <div className="mt-7 h-12 max-w-3xl rounded-xl bg-white/10 sm:h-16" />
          <div className="mt-5 h-5 max-w-2xl rounded-lg bg-white/[0.07]" />
          <div className="mt-3 h-5 max-w-xl rounded-lg bg-white/[0.07]" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl animate-pulse gap-5 px-6 py-16 sm:grid-cols-3 lg:px-8">
        {[0, 1, 2].map((item) => <div key={item} className="h-52 rounded-2xl border border-slate-200 bg-slate-50" />)}
      </div>
      <span className="sr-only" role="status">Loading Orion Rive content</span>
    </main>
  );
}
