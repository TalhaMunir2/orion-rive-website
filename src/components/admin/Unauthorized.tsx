import Link from "next/link";

export default function Unauthorized({ area }: { area: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-xl text-amber-700 ring-1 ring-amber-200">!</span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Access restricted</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">You are not authorized to view {area}.</h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">Your account is authenticated, but its assigned role does not include permission for this workspace. Contact a Super Admin if you believe this is incorrect.</p>
        <Link href="/admin" className="mt-7 inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-sky-700">Return to dashboard</Link>
      </div>
    </div>
  );
}
