import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { groq } from "next-sanity";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { BlogPost } from "../../../../lib/insights";
import { sanityClient } from "../../../../lib/sanity";
import { absoluteUrl, createPageMetadata, seoConfig, seoTitle } from "../../../../lib/seo";
import { CtaSection } from "../../../components/marketing-shell";

export const revalidate = 60;

const detailQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": coverImage.asset->url,
    category,
    tags,
    publishedAt,
    "updatedAt": _updatedAt,
    body
  }
`;

export async function generateStaticParams() {
  return sanityClient.fetch<Array<{ slug: string }>>(
    groq`*[_type == "blogPost" && defined(slug.current)]{"slug": slug.current}`,
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await sanityClient.fetch<BlogPost | null>(detailQuery, {
    slug: params.slug,
  });
  if (!post) return {};
  return createPageMetadata({
    title: seoTitle(post.title),
    description: post.excerpt.slice(0, 157),
    path: `/blog/${post.slug}`,
    image: post.imageUrl,
    type: "article",
  });
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 text-3xl font-semibold tracking-[-0.025em] text-slate-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl font-semibold text-slate-950">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-8 text-slate-600">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-sky-500 bg-sky-50 px-7 py-6 text-xl font-medium leading-8 text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 ml-6 list-disc space-y-3 text-lg leading-8 text-slate-600">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 ml-6 list-decimal space-y-3 text-lg leading-8 text-slate-600">
        {children}
      </ol>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await sanityClient.fetch<BlogPost | null>(
    detailQuery,
    { slug: params.slug },
    { next: { revalidate } },
  );
  if (!post) notFound();

  const readingTime = estimateReadingTime(post);
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: post.title, description: post.excerpt,
    image: [absoluteUrl(post.imageUrl || seoConfig.defaultOgImage)],
    datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Organization", name: seoConfig.name, url: seoConfig.url },
    publisher: { "@type": "Organization", name: seoConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl(seoConfig.logo) } },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />
      <article>
        <header className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(14,165,233,.2),transparent_30%)]" />
          <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28 lg:px-8">
            <Link
              href="/blog"
              className="text-sm font-semibold text-sky-300 transition hover:text-sky-200"
            >
              ← All insights
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-sky-400/10 px-3 py-1.5 font-bold uppercase tracking-[0.14em] text-sky-300 ring-1 ring-sky-400/20">
                {post.category}
              </span>
              <time className="text-slate-400">{formatDate(post.publishedAt)}</time>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{readingTime} min read</span>
            </div>
            <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
          {post.body && <PortableText value={post.body} components={components} />}
          <div className="mt-14 flex flex-wrap gap-2 border-t border-slate-200 pt-8">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <CtaSection
        eyebrow="Continue the conversation"
        title="Make the insight practical for your enterprise."
        description="Talk with Orion Rive about the platform, operating-model, and delivery decisions behind your next technology priority."
      />
    </main>
  );
}

function estimateReadingTime(post: BlogPost) {
  const words =
    post.body
      ?.flatMap((block) =>
        block._type === "block" && "children" in block
          ? (block.children as Array<{ text?: string }>).map(
              (child) => child.text || "",
            )
          : [],
      )
      .join(" ")
      .trim()
      .split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 220));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
