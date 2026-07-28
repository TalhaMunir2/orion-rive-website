"use client";

import { useMemo, useState } from "react";
import type { JobApplication } from "../../../lib/admin-types";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import EmptyState from "../EmptyState";

type SortKey = "full_name" | "job_title" | "email" | "created_at";

export default function ApplicationsTable({ applications }: { applications: JobApplication[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [ascending, setAscending] = useState(false);
  const [selected, setSelected] = useState<JobApplication | null>(null);
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return applications
      .filter((row) => !term || [row.full_name, row.job_title, row.email, row.phone, row.cover_letter].some((value) => value.toLowerCase().includes(term)))
      .sort((a, b) => {
        const result = a[sortKey].localeCompare(b[sortKey]);
        return ascending ? result : -result;
      });
  }, [applications, ascending, search, sortKey]);

  function sort(key: SortKey) {
    if (sortKey === key) setAscending((value) => !value);
    else { setSortKey(key); setAscending(true); }
  }

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search job applications" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applicant, position, email, or cover letter" className="max-w-md" />
        <p className="text-xs text-slate-500">{filtered.length} of {applications.length} applications</p>
      </div>
      <div className="space-y-3 p-4 md:hidden">
        {filtered.map((row) => (
          <article key={row.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <button type="button" onClick={() => setSelected(row)} className="w-full text-left">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><h2 className="truncate text-sm font-semibold text-slate-950">{row.full_name}</h2><p className="mt-1 truncate text-xs text-slate-500">{row.email}</p></div>
                <span className="shrink-0 text-[10px] font-medium text-slate-500">{formatDate(row.created_at)}</span>
              </div>
              <Badge className="mt-3">{row.job_title}</Badge>
              <span className="mt-4 block text-xs font-semibold text-sky-700">View application →</span>
            </button>
            {row.signed_resume_url && <a href={row.signed_resume_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:border-sky-200 hover:text-sky-700">Open resume PDF</a>}
          </article>
        ))}
        {filtered.length === 0 && <EmptyState compact title="No matching applications" description="Adjust your search to review candidates in the current talent pipeline." />}
      </div>
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader><TableRow>
            <SortableHead label="Applicant" field="full_name" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Position" field="job_title" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Email" field="email" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Submitted" field="created_at" current={sortKey} ascending={ascending} onSort={sort} />
            <TableHead>Resume</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} role="button" tabIndex={0} aria-label={`View application from ${row.full_name}`} onClick={() => setSelected(row)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(row); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600">
                <TableCell className="font-semibold text-slate-900">{row.full_name}</TableCell>
                <TableCell><Badge>{row.job_title}</Badge></TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(row.created_at)}</TableCell>
                <TableCell onClick={(event) => event.stopPropagation()}>{row.signed_resume_url ? <a href={row.signed_resume_url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-sky-700 hover:underline">View PDF</a> : <span className="text-xs text-slate-400">Unavailable</span>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && <div className="p-6"><EmptyState compact title="No matching applications" description="Adjust your search to review candidates in the current talent pipeline." /></div>}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && <div>
            <div className="border-b border-slate-200 p-7 pr-16"><Badge className="mb-4 bg-sky-50 text-sky-700">{selected.job_title}</Badge><DialogTitle>{selected.full_name}</DialogTitle><DialogDescription className="mt-2">Submitted {formatDateTime(selected.created_at)}</DialogDescription></div>
            <div className="space-y-7 p-7">
              <Detail label="Email" value={selected.email} /><Detail label="Phone" value={selected.phone} />
              {selected.linkedin_url && <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">LinkedIn</p><a href={selected.linkedin_url} target="_blank" rel="noreferrer" className="mt-1.5 block break-all text-sm font-medium text-sky-700 hover:underline">{selected.linkedin_url}</a></div>}
              <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Cover letter</p><p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">{selected.cover_letter}</p></div>
              {selected.signed_resume_url ? <a href={selected.signed_resume_url} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-sky-700">View or download resume</a> : <p className="text-sm text-amber-700">A signed resume link could not be generated.</p>}
              <p className="text-xs leading-5 text-slate-400">Resume links are temporary and expire after ten minutes. Refresh this page to generate a new link.</p>
            </div>
          </div>}
        </DialogContent>
      </Dialog>
    </>
  );
}

function SortableHead({ label, field, current, ascending, onSort }: { label: string; field: SortKey; current: SortKey; ascending: boolean; onSort: (key: SortKey) => void }) {
  return <TableHead aria-sort={current === field ? (ascending ? "ascending" : "descending") : "none"}><button type="button" aria-label={`Sort by ${label}`} onClick={() => onSort(field)} className="inline-flex items-center gap-1.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">{label}<span aria-hidden="true" className="text-slate-500">{current === field ? (ascending ? "↑" : "↓") : "↕"}</span></button></TableHead>;
}
function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-1.5 text-sm font-medium text-slate-800">{value}</p></div>; }
function formatDate(value: string) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)); }
function formatDateTime(value: string) { return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); }
