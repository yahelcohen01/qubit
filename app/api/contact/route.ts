import { validateEndpoint } from "@shared/lib";
import z from "zod";
import { NextResponse } from "next/server";

import sgMail from "@sendgrid/mail";
import { sendContactEmail } from "./handlers";

const ContactBodySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
});

export const POST = validateEndpoint({
  schema: {
    body: ContactBodySchema,
  },
  handler: async (req) => {
    const fullName = req.validatedBody.fullName.trim();
    const email = req.validatedBody.email.trim();
    const phone = (req.validatedBody.phone ?? "").trim();
    const subject = (req.validatedBody.subject ?? "General").trim();
    const message = req.validatedBody.message.trim();

    try {
      return await sendContactEmail({
        email,
        fullName,
        phone,
        subject,
        message,
      });
    } catch (error) {
      console.error("Error in sendContactEmail:", error);
      return NextResponse.json(
        { error: "Failed to send contact email" },
        { status: 500 }
      );
    }
  },
  options: { authenticate: false, requireAdmin: false },
});
