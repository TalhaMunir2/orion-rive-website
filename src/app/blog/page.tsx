import { groq } from "next-sanity";

import type { BlogPost } from "../../../lib/insights";
import { sanityClient } from "../../../lib/sanity";
import BlogExplorer from "../../components/BlogExplorer";
import {
  CtaSection,
  PageHero,
} from "../../components/marketing-shell";

export const revalidate = 60;

const query = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": coverImage.asset->url,
    category,
    tags,
    publishedAt
  }
`;

export default async function BlogPage() {
  const posts = await sanityClient.fetch<BlogPost[]>(
    query,
    {},
    { next: { revalidate } },
  );

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <PageHero
        eyebrow="Orion Rive insights"
        title="Practical thinking for enterprise technology leaders."
        description="Perspectives on ServiceNow, responsible AI, cloud platforms, automation, and the operating decisions that turn technology investment into business performance."
      />
      <section className="bg-[#f7f9fc] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
              Latest perspectives
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Insight grounded in implementation.
            </h2>
          </div>
          <BlogExplorer posts={posts} />
        </div>
      </section>
      <CtaSection
        eyebrow="Apply the insight"
        title="Turn the next idea into an operating advantage."
        description="Connect with Orion Rive to discuss how these approaches apply to your platform, organization, and transformation roadmap."
      />
    </main>
  );
}
