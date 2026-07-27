import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import {
  jobApplicationFieldsSchema,
  MAX_RESUME_SIZE,
  PDF_MIME_TYPE,
} from "../../../../../lib/job-application-schema";
import { sanityClient } from "../../../../../lib/sanity";

export const runtime = "nodejs";

const resumeFileSchema = z
  .instanceof(File, { message: "A PDF resume is required." })
  .refine((file) => file.size > 0 && file.size <= MAX_RESUME_SIZE, {
    message: "Resume must be a PDF no larger than 5 MB.",
  })
  .refine(
    (file) =>
      file.type === PDF_MIME_TYPE && file.name.toLowerCase().endsWith(".pdf"),
    { message: "Resume must be a PDF file." },
  );

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !adminEmail) {
    console.error("Careers API is missing required server configuration.");
    return NextResponse.json({ error: "Application service is not configured." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid application payload." }, { status: 400 });
  }

  const fields = jobApplicationFieldsSchema.safeParse({
    jobSlug: formData.get("jobSlug"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    linkedinUrl: formData.get("linkedinUrl") || "",
    coverLetter: formData.get("coverLetter"),
  });
  const resumeResult = resumeFileSchema.safeParse(formData.get("resume"));

  if (!fields.success) {
    return NextResponse.json({ error: fields.error.issues[0]?.message || "Please check the application fields." }, { status: 400 });
  }

  if (!resumeResult.success) {
    return NextResponse.json(
      { error: resumeResult.error.issues[0]?.message },
      { status: 400 },
    );
  }

  const resume = resumeResult.data;

  const job = await sanityClient.fetch<{ title: string } | null>(
    `*[_type == "jobOpening" && slug.current == $slug && isActive == true][0]{title}`,
    { slug: fields.data.jobSlug },
  );
  if (!job) {
    return NextResponse.json(
      { error: "This position is no longer accepting applications." },
      { status: 409 },
    );
  }

  const bytes = new Uint8Array(await resume.arrayBuffer());
  const signature = new TextDecoder().decode(bytes.slice(0, 5));
  if (!signature.startsWith("%PDF-")) {
    return NextResponse.json({ error: "The uploaded file is not a valid PDF." }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100);
  const objectPath = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(objectPath, bytes, { contentType: PDF_MIME_TYPE, upsert: false });

  if (uploadError) {
    console.error("Resume upload failed:", uploadError.message);
    return NextResponse.json({ error: "Unable to securely upload your resume." }, { status: 500 });
  }

  const application = fields.data;
  const { error: databaseError } = await supabase.from("job_applications").insert({
    job_title: job.title,
    full_name: application.fullName,
    email: application.email,
    phone: application.phone,
    linkedin_url: application.linkedinUrl || null,
    cover_letter: application.coverLetter,
    resume_url: objectPath,
  });

  if (databaseError) {
    await supabase.storage.from("resumes").remove([objectPath]);
    console.error("Application insert failed:", databaseError.message);
    return NextResponse.json({ error: "Unable to save your application." }, { status: 500 });
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from("resumes")
    .createSignedUrl(objectPath, 60 * 60 * 24 * 7);

  if (signedError) console.error("Resume signing failed:", signedError.message);

  const resend = new Resend(resendApiKey);
  const { error: emailError } = await resend.emails.send({
    from: "Orion Rive Careers <onboarding@resend.dev>",
    to: [adminEmail],
    replyTo: application.email,
    subject: `New application: ${job.title} — ${application.fullName}`,
    text: [
      `Position: ${job.title}`,
      `Applicant: ${application.fullName}`,
      `Email: ${application.email}`,
      `Phone: ${application.phone}`,
      `LinkedIn: ${application.linkedinUrl || "Not provided"}`,
      `Resume: ${signedData?.signedUrl || "Stored privately; open it from Supabase Storage."}`,
      "",
      "Cover letter:",
      application.coverLetter,
      "",
      "The signed resume link expires in 7 days.",
    ].join("\n"),
  });

  if (emailError) {
    console.error("Application notification failed:", emailError.message);
    return NextResponse.json({ error: "Your application was saved, but the notification email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
