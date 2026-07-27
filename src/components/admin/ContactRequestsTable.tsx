"use client";

import { useMemo, useState, useTransition } from "react";
import type { ContactRequest, ContactStatus } from "../../../lib/admin-types";
import { contactStatuses } from "../../../lib/admin-types";
import { updateContactStatus } from "../../app/admin/actions";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type SortKey = "name" | "company" | "email" | "country" | "created_at" | "status";

export default function ContactRequestsTable({ requests }: { requests: ContactRequest[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [ascending, setAscending] = useState(false);
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const [rows, setRows] = useState(requests);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows
      .filter((row) => !term || [row.name, row.company, row.email, row.country, row.message].some((value) => value.toLowerCase().includes(term)))
      .sort((a, b) => {
        const left = a[sortKey] || "";
        const right = b[sortKey] || "";
        const result = left.localeCompare(right);
        return ascending ? result : -result;
      });
  }, [ascending, rows, search, sortKey]);

  function sort(key: SortKey) {
    if (sortKey === key) setAscending((value) => !value);
    else { setSortKey(key); setAscending(true); }
  }

  function changeStatus(id: string, status: ContactStatus) {
    const previous = rows;
    setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
    setSelected((current) => current?.id === id ? { ...current, status } : current);
    setStatusError(null);
    startTransition(async () => {
      const result = await updateContactStatus(id, status);
      if (!result.success) { setRows(previous); setStatusError(result.error || "Unable to update status."); }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Input aria-label="Search contact requests" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, company, email, country, or message" className="max-w-md" />
        <p className="text-xs text-slate-500">{filtered.length} of {rows.length} requests</p>
      </div>
      {statusError && <p className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{statusError}</p>}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <SortableHead label="Name" field="name" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Company" field="company" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Email" field="email" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Country" field="country" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Submitted" field="created_at" current={sortKey} ascending={ascending} onSort={sort} />
            <SortableHead label="Status" field="status" current={sortKey} ascending={ascending} onSort={sort} />
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id} role="button" tabIndex={0} aria-label={`View contact request from ${row.name}`} onClick={() => setSelected(row)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(row); } }} className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sky-600">
                <TableCell className="font-semibold text-slate-900">{row.name}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(row.created_at)}</TableCell>
                <TableCell onClick={(event) => event.stopPropagation()}>
                  <select aria-label={`Update status for ${row.name}`} value={row.status || "New"} disabled={isPending} onChange={(event) => changeStatus(row.id, event.target.value as ContactStatus)} className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
                    {contactStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && <p className="p-12 text-center text-sm text-slate-500">No contact requests match your search.</p>}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && <div>
            <div className="border-b border-slate-200 p-7 pr-16"><Badge className="mb-4 bg-sky-50 text-sky-700">{selected.status}</Badge><DialogTitle>{selected.name}</DialogTitle><DialogDescription className="mt-2">Contact request from {selected.company}</DialogDescription></div>
            <div className="space-y-7 p-7">
              <Detail label="Email" value={selected.email} /><Detail label="Phone" value={selected.phone} /><Detail label="Country" value={selected.country} /><Detail label="Submitted" value={formatDateTime(selected.created_at)} />
              <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Message</p><p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">{selected.message}</p></div>
              <div><label htmlFor="contact-detail-status" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Update status</label><select id="contact-detail-status" value={selected.status || "New"} onChange={(event) => changeStatus(selected.id, event.target.value as ContactStatus)} className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-semibold focus:ring-2 focus:ring-sky-100">{contactStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>
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
