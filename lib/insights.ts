import type { PortableTextBlock } from "@portabletext/types";

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  imageUrl?: string;
  industry: string;
  serviceType: string;
  clientChallenge?: string;
  proposedSolution?: string;
  implementation?: string;
  results?: string;
  technologiesUsed?: string[];
  metrics?: CaseStudyMetric[];
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  body?: PortableTextBlock[];
};
