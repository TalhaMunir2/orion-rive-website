"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { BlogPost } from "../../lib/insights";
import EmptyState from "./EmptyState";

const categories = [
  "All categories",
  "ServiceNow",
  "AI",
  "Cloud",
  "Automation",
  "Enterprise Technology",
];

export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [tag, setTag] = useState("All tags");
  const tags = ["All tags", ...Array.from(new Set(posts.flatMap((post) => post.tags || []))).sort()];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term);
      const matchesCategory =
        category === "All categories" || post.category === category;
      const matchesTag = tag === "All tags" || post.tags?.includes(tag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [category, posts, search, tag]);

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <span className="sr-only">Search insights</span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles and insights"
            className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        >
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select
          aria-label="Filter by tag"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
          className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium outline-none focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
        >
          {tags.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post, index) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
          >
            {post.imageUrl ? (
              <Image src={post.imageUrl} alt={`Editorial cover for ${post.title}`} width={960} height={540} sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw" className="aspect-[16/9] w-full object-cover" />
            ) : (
              <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${index % 2 ? "from-blue-950 via-slate-900 to-cyan-700" : "from-slate-950 via-blue-950 to-sky-700"}`}>
                <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:22px_22px]" />
                <span className="absolute bottom-6 left-6 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-sky-200 backdrop-blur">
                  {post.category}
                </span>
              </div>
            )}
            <div className="p-7">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-[0.12em] text-sky-700">
                  {post.category}
                </span>
                <time className="text-slate-500">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight transition group-hover:text-sky-700">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags?.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8"><EmptyState
          title="No insights match your filters"
          description="Try a broader search, another category, or clear the current filters to view all published perspectives."
          action={<button type="button" onClick={() => { setSearch(""); setCategory("All categories"); setTag("All tags"); }} className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">Clear filters</button>}
        /></div>
      )}
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
