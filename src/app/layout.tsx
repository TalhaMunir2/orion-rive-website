import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteChrome from "../components/SiteChrome";
import { absoluteUrl, seoConfig } from "../../lib/seo";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: { default: "Enterprise Automation, AI & ServiceNow | Orion Rive", template: "%s | Orion Rive" },
  description: seoConfig.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Enterprise Automation, AI & ServiceNow | Orion Rive",
    description: seoConfig.description,
    url: "/",
    siteName: seoConfig.name,
    type: "website",
    images: [{ url: seoConfig.defaultOgImage, width: 1200, height: 630, alt: "Orion Rive enterprise technology consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Automation, AI & ServiceNow | Orion Rive",
    description: seoConfig.description,
    images: [seoConfig.defaultOgImage],
    ...(seoConfig.twitterHandle ? { site: seoConfig.twitterHandle, creator: seoConfig.twitterHandle } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoConfig.name,
    url: seoConfig.url,
    logo: absoluteUrl(seoConfig.logo),
    description: seoConfig.description,
    sameAs: seoConfig.sameAs,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
