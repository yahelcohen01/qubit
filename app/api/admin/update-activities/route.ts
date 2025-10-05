import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getToken } from "next-auth/jwt";

const PayloadSchema = z.object({
  activities: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      date: z.string().optional(),
      description: z.string().optional(),
    })
  ),
});

export async function PUT(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret)
      return NextResponse.json(
        { error: "server_misconfigured" },
        { status: 500 }
      );

    const token = await getToken({ req, secret });
    if (!token?.email)
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (!adminEmails.includes(String(token.email).toLowerCase())) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = PayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid_payload", detail: parsed.error.format() },
        { status: 400 }
      );
    }
    const activities = parsed.data.activities;

    const OWNER = process.env.GITHUB_OWNER;
    const REPO = process.env.GITHUB_REPO;
    const PATH = process.env.GITHUB_FILE_PATH;
    const TOKEN = process.env.GITHUB_TOKEN;

    if (!OWNER || !REPO || !PATH || !TOKEN) {
      return NextResponse.json(
        { error: "github_env_not_configured" },
        { status: 500 }
      );
    }

    // fetch current sha
    const getResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "qubit-admin",
        },
      }
    );

    if (!getResp.ok) {
      const text = await getResp.text();
      return NextResponse.json(
        { error: "failed_fetch_file", detail: text },
        { status: 500 }
      );
    }
    const fileJson = await getResp.json();
    const sha = fileJson.sha;

    const contentBase64 = Buffer.from(
      JSON.stringify(activities, null, 2)
    ).toString("base64");
    const message = `Admin update by ${
      token.email ?? "unknown"
    } on ${new Date().toISOString()}`;

    const putResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "qubit-admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          content: contentBase64,
          sha,
          committer: {
            name: token.name ?? "admin",
            email: token.email ?? "noreply@example.com",
          },
        }),
      }
    );

    if (!putResp.ok) {
      const text = await putResp.text();
      // If the sha changed between fetch and put, GitHub will return an error — surface it
      return NextResponse.json(
        { error: "failed_update_file", detail: text },
        { status: 500 }
      );
    }

    const result = await putResp.json();
    return NextResponse.json({ ok: true, commit: result.commit });
  } catch (err: any) {
    console.error("PUT /api/admin/update-activities error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
