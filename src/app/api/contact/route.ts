import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "../../../../lib/contact-schema";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!resendApiKey || !adminEmail) {
    console.error("Contact API is missing its Resend configuration.");
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Please correct the highlighted fields.",
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const submission = result.data;
  const { error: databaseError } = await supabase
    .from("contact_requests")
    .insert(submission);

  if (databaseError) {
    console.error("Unable to save contact request:", databaseError.message);
    return NextResponse.json(
      { error: "Unable to save your request. Please try again." },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);
  const { error: emailError } = await resend.emails.send({
    from: "Orion Rive Website <onboarding@resend.dev>",
    to: [adminEmail],
    replyTo: submission.email,
    subject: `New contact request from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Company: ${submission.company}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone}`,
      `Country: ${submission.country}`,
      "",
      "Message:",
      submission.message,
    ].join("\n"),
  });

  if (emailError) {
    console.error("Unable to send contact notification:", emailError.message);
    return NextResponse.json(
      {
        error:
          "Your request was saved, but the notification email could not be sent.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
