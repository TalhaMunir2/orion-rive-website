"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { JobOpening } from "../../lib/careers";
import EmptyState from "./EmptyState";

export default function CareersExplorer({ jobs }: { jobs: JobOpening[] }) {
  const [department, setDepartment] = useState("All departments");
  const [location, setLocation] = useState("All locations");
  const departments = [
    "All departments",
    ...Array.from(new Set(jobs.map((job) => job.department))).sort(),
  ];
  const locations = [
    "All locations",
    ...Array.from(new Set(jobs.map((job) => job.location))).sort(),
  ];
  const filtered = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (department === "All departments" || job.department === department) &&
          (location === "All locations" || job.location === location),
      ),
    [department, jobs, location],
  );

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {filtered.length} open {filtered.length === 1 ? "position" : "positions"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Roles are updated directly from Orion Rive&apos;s talent workspace.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Filter by department" value={department} options={departments} onChange={setDepartment} />
          <Select label="Filter by location" value={location} options={locations} onChange={setLocation} />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {filtered.map((job) => (
          <Link
            key={job._id}
            href={`/careers/${job.slug}`}
            className="group flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">
                  {job.department}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                  {job.employmentType}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight transition group-hover:text-sky-700 sm:text-2xl">
                {job.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{job.location}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-sky-700">
              View opportunity
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-7"><EmptyState
          title="No open positions match these filters"
          description="Reset the department and location filters to review all active opportunities at Orion Rive."
          action={<button type="button" onClick={() => { setDepartment("All departments"); setLocation("All locations"); }} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Clear filters</button>}
        /></div>
      )}
    </>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100 sm:min-w-48"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
