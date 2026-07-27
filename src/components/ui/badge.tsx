import type { HTMLAttributes } from "react";

import { cn } from "../../../lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600",
        className,
      )}
      {...props}
    />
  );
}
