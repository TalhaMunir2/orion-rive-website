"use client";

import { FormEvent, useState } from "react";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("jobSlug", jobSlug);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit your application.");
      form.reset();
      setFileName("");
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

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-32px_rgba(15,23,42,.3)] sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={field.name === "linkedinUrl" ? "sm:col-span-2" : ""}>
                <span className="text-sm font-semibold text-slate-800">
                  {field.label}{field.optional ? <span className="ml-1 font-normal text-slate-400">(optional)</span> : <span className="ml-1 text-sky-700">*</span>}
                </span>
                <input
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={!field.optional}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                />
              </label>
            ))}
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-slate-800">Cover Letter / Message <span className="text-sky-700">*</span></span>
            <textarea
              name="coverLetter"
              rows={7}
              required
              minLength={50}
              maxLength={5000}
              placeholder="Tell us why this opportunity is relevant to your experience and the contribution you want to make."
              className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-[15px] outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
            />
          </label>

          <label className="mt-5 block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-sky-400 hover:bg-sky-50/50">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white text-sky-700 shadow-sm">↑</span>
            <span className="mt-3 block text-sm font-semibold text-slate-800">
              {fileName || "Upload your resume"}
            </span>
            <span className="mt-1 block text-xs text-slate-500">PDF only · maximum 5 MB</span>
            <input
              name="resume"
              type="file"
              accept="application/pdf,.pdf"
              required
              className="sr-only"
              onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            />
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
