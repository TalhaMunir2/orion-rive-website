import type { Metadata } from "next";

export const seoConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Orion Rive",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://orion-rive-website.vercel.app").replace(/\/$/, ""),
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Orion Rive helps enterprises modernize operations with ServiceNow, responsible AI, cloud platforms, automation, and custom software.",
  defaultOgImage: process.env.NEXT_PUBLIC_DEFAULT_OG_IMAGE || "/images/orion-rive-og.jpg",
  logo: process.env.NEXT_PUBLIC_SITE_LOGO || "/images/orion-rive-logo.png",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "",
  sameAs: (process.env.NEXT_PUBLIC_SOCIAL_LINKS || "").split(",").map((url) => url.trim()).filter(Boolean),
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${seoConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoTitle(subject: string, suffix = " | Orion Rive") {
  const available = 59 - suffix.length;
  const shortened = subject.length > available ? `${subject.slice(0, available - 1).trim()}…` : subject;
  return `${shortened}${suffix}`;
}

export function createPageMetadata({ title, description, path, image, type = "website" }: {
  title: string; description: string; path: string; image?: string; type?: "website" | "article";
}): Metadata {
  const imageUrl = absoluteUrl(image || seoConfig.defaultOgImage);
  return {
    title: { absolute: title }, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: seoConfig.name, type, images: [{ url: imageUrl, width: 1200, height: 630, alt: `${seoConfig.name} — enterprise technology consulting` }] },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl], ...(seoConfig.twitterHandle ? { site: seoConfig.twitterHandle, creator: seoConfig.twitterHandle } : {}) },
  };
}
