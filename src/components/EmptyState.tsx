import type { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
  compact = false,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-dashed border-slate-300 bg-white text-center shadow-sm ${compact ? "p-8" : "p-10 sm:p-12"}`}>
      <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-sky-700" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path d="M4 6.5h12M4 10h8M4 13.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
