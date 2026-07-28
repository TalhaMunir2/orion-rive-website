"use client";

import { FormEvent, useState } from "react";
import {
  jobApplicationFieldsSchema,
  MAX_RESUME_SIZE,
  PDF_MIME_TYPE,
  type JobApplicationFields,
} from "../../lib/job-application-schema";

const fields = [
  { name: "fullName", label: "Full Name", type: "text", autoComplete: "name", placeholder: "Your full name", optional: false },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com", optional: false },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "+1 (555) 000-0000", optional: false },
  { name: "linkedinUrl", label: "LinkedIn URL", type: "url", autoComplete: "url", placeholder: "https://linkedin.com/in/your-profile", optional: true },
] as const;

export default function JobApplicationForm({
  jobTitle,
  jobSlug,
}: {
  jobTitle: string;
  jobSlug: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof JobApplicationFields | "resume", string>>
  >({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("jobSlug", jobSlug);
    const values = {
      jobSlug,
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      linkedinUrl: String(formData.get("linkedinUrl") || ""),
      coverLetter: String(formData.get("coverLetter") || ""),
    };
    const validation = jobApplicationFieldsSchema.safeParse(values);
    const resume = formData.get("resume");
    const nextErrors: Partial<Record<keyof JobApplicationFields | "resume", string>> = {};

    if (!validation.success) {
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as keyof JobApplicationFields;
        nextErrors[field] ||= issue.message;
      }
    }
    if (!(resume instanceof File) || resume.size === 0) {
      nextErrors.resume = "Select a PDF resume to continue.";
    } else if (resume.type !== PDF_MIME_TYPE && !resume.name.toLowerCase().endsWith(".pdf")) {
      nextErrors.resume = "Resume must be a PDF file.";
    } else if (resume.size > MAX_RESUME_SIZE) {
      nextErrors.resume = "Resume must be 5 MB or smaller.";
    }

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setError("Review the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit your application.");
      form.reset();
      setFileName("");
      setFieldErrors({});
      setSuccess(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your application. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="apply" className="scroll-mt-28 border-t border-slate-200 bg-[#f7f9fc] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Apply to Orion Rive</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Bring your experience to work that matters.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Apply for <strong className="text-slate-900">{jobTitle}</strong>. Our talent team reviews every complete application against the role&apos;s requirements and will contact shortlisted candidates directly.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600 shadow-sm">
            Your application and resume are handled as confidential recruitment information. Resume files are stored in private object storage and are not publicly accessible.
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-32px_rgba(15,23,42,.3)] sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} htmlFor={`application-${field.name}`} className={field.name === "linkedinUrl" ? "sm:col-span-2" : ""}>
                <span className="text-sm font-semibold text-slate-800">
                  {field.label}{field.optional ? <span className="ml-1 font-normal text-slate-500">(optional)</span> : <span className="ml-1 text-sky-700" aria-hidden="true">*</span>}
                </span>
                <input
                  id={`application-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={!field.optional}
                  aria-invalid={Boolean(fieldErrors[field.name])}
                  aria-describedby={`application-${field.name}-error`}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] outline-none placeholder:text-slate-500 focus:border-sky-600 focus:ring-4 focus:ring-sky-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-50"
                />
                <span id={`application-${field.name}-error`} className="mt-1.5 block min-h-5 text-xs font-medium text-red-600">{fieldErrors[field.name]}</span>
              </label>
            ))}
          </div>

          <label htmlFor="application-coverLetter" className="mt-5 block">
            <span className="text-sm font-semibold text-slate-800">Cover Letter / Message <span className="text-sky-700">*</span></span>
            <textarea
              id="application-coverLetter"
              name="coverLetter"
              rows={7}
              required
              minLength={50}
              maxLength={5000}
              placeholder="Tell us why this opportunity is relevant to your experience and the contribution you want to make."
              aria-invalid={Boolean(fieldErrors.coverLetter)}
              aria-describedby="application-coverLetter-error"
              className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-[15px] outline-none placeholder:text-slate-500 focus:border-sky-600 focus:ring-4 focus:ring-sky-100 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-4 aria-[invalid=true]:ring-red-50"
            />
            <span id="application-coverLetter-error" className="mt-1.5 block min-h-5 text-xs font-medium text-red-600">{fieldErrors.coverLetter}</span>
          </label>

          <label htmlFor="application-resume" className={`mt-5 block cursor-pointer rounded-2xl border border-dashed bg-slate-50 p-6 text-center hover:bg-sky-50/50 ${fieldErrors.resume ? "border-red-400 ring-4 ring-red-50" : "border-slate-300 hover:border-sky-400"}`}>
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white text-sky-700 shadow-sm">↑</span>
            <span className="mt-3 block text-sm font-semibold text-slate-800">
              {fileName || "Upload your resume"}
            </span>
            <span className="mt-1 block text-xs text-slate-500">PDF only · maximum 5 MB</span>
            <input
              id="application-resume"
              name="resume"
              type="file"
              accept="application/pdf,.pdf"
              required
              aria-invalid={Boolean(fieldErrors.resume)}
              aria-describedby="application-resume-error"
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
            <span id="application-resume-error" className="mt-2 block min-h-5 text-xs font-medium text-red-600">{fieldErrors.resume}</span>
          </label>

          {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          {success && <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Application received. Thank you for your interest in Orion Rive.</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting application..." : "Submit application"}
          </button>
        </form>
      </div>
    </section>
  );
}
