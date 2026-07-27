export const contactStatuses = ["New", "Contacted", "Qualified", "Closed"] as const;
export type ContactStatus = (typeof contactStatuses)[number];

export type ContactRequest = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  status: ContactStatus;
  created_at: string;
};

export type JobApplication = {
  id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string | null;
  cover_letter: string;
  resume_url: string;
  signed_resume_url?: string;
  created_at: string;
};
