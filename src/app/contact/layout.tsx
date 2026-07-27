import { createPageMetadata } from "../../../lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Enterprise Technology Experts | Orion Rive",
  description: "Talk with Orion Rive about your ServiceNow, AI, cloud, automation, integration, or custom software transformation priorities.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
