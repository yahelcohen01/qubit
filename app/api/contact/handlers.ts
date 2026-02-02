import { NextResponse } from "next/server";
import z from "zod";
import { Resend } from "resend";

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async ({
  fullName,
  email,
  phone,
  subject,
  message,
}: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const to = process.env.CONTACT_EMAIL_TO;
    const from = process.env.CONTACT_EMAIL_FROM;

    if (!to || !from) {
      console.error("CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const esc = escapeHtml;

    const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${esc(fullName)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || "Not provided"}</p>
    <p><strong>Subject:</strong> ${esc(subject) || "Not specified"}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space: pre-wrap;">${esc(message)}</pre>
  `;

    const text = `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject || "Not specified"}
Message:
${message}
  `.trim();

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Contact form: ${subject || "General Inquiry"}`,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Resend error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 502 },
    );
  }
};
