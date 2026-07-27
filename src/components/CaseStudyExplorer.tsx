"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { CaseStudy } from "../../lib/insights";

export default function CaseStudyExplorer({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All industries");
  const [serviceType, setServiceType] = useState("All services");

  const industries = [
    "All industries",
    ...Array.from(new Set(caseStudies.map((item) => item.industry))),
  ];
  const serviceTypes = [
    "All services",
    ...Array.from(new Set(caseStudies.map((item) => item.serviceType))),
  ];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return caseStudies.filter((item) => {
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term);
      const matchesIndustry =
        industry === "All industries" || item.industry === industry;
      const matchesService =
        serviceType === "All services" || item.serviceType === serviceType;
      return matchesSearch && matchesIndustry && matchesService;
    });
  }, [caseStudies, industry, search, serviceType]);

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <span className="sr-only">Search case studies</span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          >
            <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or business outcome"
            className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <FilterSelect
          label="Filter by industry"
          value={industry}
          options={industries}
          onChange={setIndustry}
        />
        <FilterSelect
          label="Filter by service"
          value={serviceType}
          options={serviceTypes}
          onChange={setServiceType}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <strong className="text-slate-800">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "story" : "stories"}
        </p>
        {(search || industry !== "All industries" || serviceType !== "All services") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setIndustry("All industries");
              setServiceType("All services");
            }}
            className="text-sm font-semibold text-sky-700 hover:text-sky-600"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, index) => (
            <Link
              key={item._id}
              href={`/case-studies/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <Visual
                imageUrl={item.imageUrl}
                title={item.title}
                index={index}
                label={item.serviceType}
              />
              <div className="p-7">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">
                    {item.serviceType}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                    {item.industry}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight transition group-hover:text-sky-700">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                  Read customer story
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-800">No matching case studies</p>
          <p className="mt-2 text-sm text-slate-500">
            Try a broader search or clear one of the filters.
          </p>
        </div>
      )}
    </>
  );
}

function FilterSelect({
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
        className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Visual({
  imageUrl,
  title,
  index,
  label,
}: {
  imageUrl?: string;
  title: string;
  index: number;
  label: string;
}) {
  if (imageUrl) {
    return <Image src={imageUrl} alt={`Case study cover for ${title}`} width={960} height={540} sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover" />;
  }

  const gradients = [
    "from-blue-950 via-slate-900 to-sky-700",
    "from-slate-950 via-blue-950 to-cyan-700",
    "from-indigo-950 via-slate-900 to-blue-700",
  ];

  return (
    <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/20" />
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <span className="max-w-[70%] text-lg font-semibold leading-tight text-white">
          {title}
        </span>
        <span className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-200 backdrop-blur">
          {label}
        </span>
      </div>
    </div>
  );
}
