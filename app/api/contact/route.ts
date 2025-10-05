// // app/api/contact/route.ts
// import { NextResponse } from "next/server";
// import { handleContactSubmission } from "./controllers/contact";

// export const runtime = "nodejs"; // nodemailer requires the Node runtime (not edge)

// // Optionally trust X-Forwarded-For from your platform for client IP (Vercel will set it).
// function getClientIp(req: Request) {
//   // prefer X-Forwarded-For header when behind proxy/platform
//   const xff = req.headers.get("x-forwarded-for");
//   if (xff) return xff.split(",")[0].trim();
//   // fallback to a header some platforms set
//   const cf = req.headers.get("cf-connecting-ip");
//   if (cf) return cf;
//   return undefined;
// }

// export async function POST(req: Request) {
//   try {
//     const clientIp = getClientIp(req);
//     const body = await req.json();

//     const result = await handleContactSubmission(body, clientIp);

//     if (!result.ok) {
//       return NextResponse.json(
//         { error: result.error },
//         { status: result.status ?? 500 }
//       );
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error("contact route error:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
