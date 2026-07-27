import type { PortableTextBlock } from "@portabletext/types";

export type JobOpening = {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Remote";
  description?: PortableTextBlock[];
  requirements?: string[];
  postedAt: string;
};
