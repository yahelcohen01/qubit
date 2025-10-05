// import nodemailer from "nodemailer";

// export type ContactFormFields = {
//   fullName?: string;
//   email: string;
//   phone?: string;
//   subject?: string;
//   message: string;
// };

// type SendResult = { ok: true } | { ok: false; error: string; status?: number };

// /**
//  * Basic in-memory rate limiter. Note: serverless runtimes do not preserve memory between cold starts,
//  * so this is useful for low-volume protection but not bulletproof. For production, use a persistent store (Redis).
//  */
// const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
// const REQUESTS_PER_WINDOW = 5;
// const rateMap = new Map<string, { count: number; firstTs: number }>();

// function getClientKey(ip?: string) {
//   return ip ?? "unknown";
// }

// function checkRateLimit(ip?: string) {
//   const key = getClientKey(ip);
//   const now = Date.now();
//   const existing = rateMap.get(key);

//   if (!existing) {
//     rateMap.set(key, { count: 1, firstTs: now });
//     return true;
//   }

//   if (now - existing.firstTs > RATE_LIMIT_WINDOW_MS) {
//     // reset window
//     rateMap.set(key, { count: 1, firstTs: now });
//     return true;
//   }

//   if (existing.count >= REQUESTS_PER_WINDOW) {
//     return false;
//   }

//   existing.count += 1;
//   rateMap.set(key, existing);
//   return true;
// }

// /** Lazy transporter singleton */
// let transporter: nodemailer.Transporter | undefined;
// function getTransporter() {
//   if (transporter) return transporter;

//   const host = process.env.SMTP_HOST;
//   const port = process.env.SMTP_PORT
//     ? Number(process.env.SMTP_PORT)
//     : undefined;
//   const secure = process.env.SMTP_SECURE === "true";
//   const user = process.env.SMTP_USER;
//   const pass = process.env.SMTP_PASS;

//   if (!host || !user || !pass) {
//     throw new Error(
//       "Missing SMTP configuration (SMTP_HOST/SMTP_USER/SMTP_PASS)."
//     );
//   }

//   transporter = nodemailer.createTransport({
//     host,
//     port,
//     secure,
//     auth: { user, pass },
//   });
//   console.log("Created new SMTP transporter", { host, port, secure, user });

//   // Optional: verify once (ignore failure so route still works)
//   transporter.verify().catch((e) => {
//     console.warn("SMTP verify failed (nonfatal):", e?.message ?? e);
//   });

//   return transporter;
// }

// /** small html escape */
// function escapeHtml(s: string) {
//   return String(s)
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// export async function handleContactSubmission(
//   payload: ContactFormFields,
//   clientIp?: string
// ): Promise<SendResult> {
//   // Basic validation
//   if (!payload?.email || !payload?.message) {
//     return {
//       ok: false,
//       error: "Missing required fields: email and message",
//       status: 400,
//     };
//   }

//   // Rate limiting (best-effort)
//   if (!checkRateLimit(clientIp)) {
//     return { ok: false, error: "Rate limit exceeded", status: 429 };
//   }

//   // Compose message
//   const subject = payload.subject
//     ? `Website Contact — ${payload.subject}`
//     : "Website Contact";
//   const text = `From: ${payload.fullName ?? "(unknown)"} <${
//     payload.email
//   }>\n\n${payload.message}`;
//   const html = `<h3>New contact message</h3>
//     <p><strong>Name:</strong> ${escapeHtml(
//       payload.fullName ?? "(not provided)"
//     )}</p>
//     <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
//     <p><strong>Phone:</strong> ${escapeHtml(
//       payload.phone ?? "(not provided)"
//     )}</p>
//     <p><strong>Subject:</strong> ${escapeHtml(
//       payload.subject ?? "(not provided)"
//     )}</p>
//     <hr/>
//     <div>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</div>`;

//   const from = process.env.FROM_EMAIL ?? process.env.SMTP_USER;
//   const to = process.env.EMAIL_TO;
//   if (!to) {
//     return {
//       ok: false,
//       error: "Missing EMAIL_TO environment variable",
//       status: 500,
//     };
//   }

//   try {
//     const tr = getTransporter();
//     debugger;
//     await tr.sendMail({
//       from,
//       to,
//       subject,
//       text,
//       html,
//     });

//     return { ok: true };
//   } catch (err) {
//     console.error("handleContactSubmission sendMail error:", err);
//     return { ok: false, error: "Failed to send message", status: 500 };
//   }
// }
