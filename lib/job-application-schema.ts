import { z } from "zod";

export const MAX_RESUME_SIZE = 5 * 1024 * 1024;
export const PDF_MIME_TYPE = "application/pdf";

export const jobApplicationFieldsSchema = z.object({
  jobSlug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid job reference."),
  fullName: z.string().trim().min(2, "Enter your full name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
  linkedinUrl: z
    .string()
    .trim()
    .max(300)
    .refine(
      (value) => !value || /^https?:\/\/(www\.)?linkedin\.com\//i.test(value),
      "Enter a valid LinkedIn profile URL.",
    ),
  coverLetter: z
    .string()
    .trim()
    .min(50, "Please provide at least 50 characters.")
    .max(5000, "Cover letter must be 5,000 characters or fewer."),
});

export type JobApplicationFields = z.infer<typeof jobApplicationFieldsSchema>;
