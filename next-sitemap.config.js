const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://orion-rive-website.vercel.app").replace(/\/$/, "");

async function fetchSanityPaths() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return [];
  const query = encodeURIComponent(`*[_type in ["blogPost", "caseStudy", "service", "jobOpening"] && defined(slug.current) && (_type != "jobOpening" || isActive == true)]{_type,"slug":slug.current,"updatedAt":_updatedAt}`);
  try {
    const response = await fetch(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${query}`);
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const { result = [] } = await response.json();
    const sections = { blogPost: "blog", caseStudy: "case-studies", service: "services", jobOpening: "careers" };
    return result.map((document) => ({
      loc: `/${sections[document._type]}/${document.slug}`,
      lastmod: document.updatedAt,
      changefreq: "weekly",
      priority: document._type === "blogPost" ? 0.7 : 0.8,
    }));
  } catch (error) {
    console.warn("Unable to fetch Sanity routes for sitemap:", error.message);
    return [];
  }
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/admin", "/admin/*", "/api/*", "/test-supabase"],
  additionalPaths: fetchSanityPaths,
  robotsTxtOptions: { policies: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/", "/admin/*", "/api/*", "/test-supabase"] }] },
  transform: async (config, path) => ({ loc: path, changefreq: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7, lastmod: new Date().toISOString() }),
};
