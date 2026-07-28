"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  contactSchema,
  type ContactFormValues,
} from "../../../lib/contact-schema";

const fields: Array<{
  name: keyof ContactFormValues;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}> = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your full name",
    autoComplete: "name",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Company name",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Your country",
    autoComplete: "country-name",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    setSubmitted(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      reset();
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_15%_100%,rgba(37,99,235,0.14),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
              Talk to an enterprise specialist
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Turn your next technology initiative into measurable impact.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your priorities with our team. We&apos;ll help you identify
              the right path across automation, AI, cloud, and enterprise
              platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8 lg:py-20">
        <aside>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
            What to expect
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            A focused conversation, not a sales pitch.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            We start by understanding your operating model, current technology,
            and the outcomes that matter most.
          </p>

          <div className="mt-8 space-y-5">
            {[
              "A response from our team within one business day",
              "A confidential review of your business requirements",
              "Clear next steps tailored to your priorities",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-700">
                  <CheckIcon />
                </span>
                <p className="text-sm font-medium leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Areas of expertise
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "ServiceNow",
                "AI & Automation",
                "Cloud",
                "Enterprise Platforms",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.3)] sm:p-10">
          <div className="mb-8 border-b border-slate-100 pb-7">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Tell us about your goals
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Complete the form and an Orion Rive specialist will contact you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "country" ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-slate-800"
                  >
                    {field.label}
                    <span className="ml-1 text-sky-700" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    aria-invalid={Boolean(errors[field.name])}
                    aria-describedby={`${field.name}-error`}
                    {...register(field.name)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
                  />
                  <p
                    id={`${field.name}-error`}
                    className="mt-1.5 min-h-5 text-xs font-medium text-red-600"
                  >
                    {errors[field.name]?.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-1">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-800"
              >
                Message
                <span className="ml-1 text-sky-700" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell us about your objectives, challenges, timeline, or the outcome you want to achieve."
                aria-invalid={Boolean(errors.message)}
                aria-describedby="message-error"
                {...register("message")}
                className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-100"
              />
              <p
                id="message-error"
                className="mt-1.5 min-h-5 text-xs font-medium text-red-600"
              >
                {errors.message?.message}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-5 text-slate-500">
                By submitting this form, you agree that Orion Rive may use your
                information to respond to your inquiry.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Submit inquiry"}
                {!isSubmitting && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4 10h12m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="mt-5 min-h-6 text-sm" aria-live="polite">
              {submitted && (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
                  Thank you. Your inquiry has been received and our team will
                  be in touch shortly.
                </p>
              )}
              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

    </main>
  );
}
