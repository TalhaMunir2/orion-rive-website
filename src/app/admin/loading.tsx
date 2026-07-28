export default function AdminLoading() {
  return (
    <main aria-busy="true" className="animate-pulse p-5 sm:p-8">
      <div className="h-3 w-32 rounded-full bg-sky-100" />
      <div className="mt-3 h-9 w-72 max-w-full rounded-lg bg-slate-200" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="h-32 rounded-xl border border-slate-200 bg-white" />)}
      </div>
      <div className="mt-6 h-80 rounded-xl border border-slate-200 bg-white" />
      <span className="sr-only" role="status">Loading dashboard</span>
    </main>
  );
}
