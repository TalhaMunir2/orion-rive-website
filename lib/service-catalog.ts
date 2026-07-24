export const serviceCategories = {
  servicenow: {
    number: "01",
    title: "ServiceNow Solutions",
    summary:
      "Strategy, implementation, integration, and optimization across the Now Platform—designed around measurable service outcomes and sustainable platform governance.",
  },
  ai: {
    number: "02",
    title: "AI Solutions",
    summary:
      "Enterprise AI grounded in real work: secure, observable, connected to authoritative data, and designed to improve decisions and execution.",
  },
  cloud: {
    number: "03",
    title: "Cloud Solutions",
    summary:
      "Modern cloud foundations that balance delivery speed with cost, security, resilience, and the controls global enterprises require.",
  },
  development: {
    number: "04",
    title: "Custom Development",
    summary:
      "Secure, maintainable digital products engineered for complex workflows, demanding integrations, and modern user expectations.",
  },
} as const;

export type ServiceCategory = keyof typeof serviceCategories;

export type SanityService = {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
  category: ServiceCategory;
  featured?: boolean;
  displayOrder?: number;
  capabilities?: string[];
  businessOutcomes?: string[];
};
