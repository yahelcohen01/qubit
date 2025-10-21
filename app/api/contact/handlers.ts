import { NextResponse } from "next/server";
import z from "zod";
import sgMail from "@sendgrid/mail";

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
    if (!process.env.SENDGRID_API_KEY) {
      console.error("Missing SENDGRID_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const to = process.env.CONTACT_EMAIL_TO;
    const from = process.env.CONTACT_EMAIL_FROM;

    if (!to || !from) {
      console.error("CONTACT_EMAIL_TO or CONTACT_EMAIL_FROM missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Build safe HTML and plain text bodies
    const safeMessageHtml = `<p><strong>Name:</strong> ${escapeHtml(
      fullName
    )}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
  <p><strong>Subject:</strong> ${escapeHtml(subject || "General")}</p>
  <p><strong>Message:</strong></p>
  <pre style="white-space: pre-wrap;">${escapeHtml(message)}</pre>`;

    const safeText = `New contact form submission

Name: ${fullName}
Email: ${email}
Phone: ${phone || "-"}
Subject: ${subject || "General"}

Message:
${message}
`;

    await sgMail.send({
      to,
      from,
      subject: `Contact form: ${subject}`,
      text: safeText,
      html: safeMessageHtml,
      // replies to the submitter in your inbox UI
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.log("SendGrid send error:", err?.response?.body ?? err);
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
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 502 }
    );
  }
};
