import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret)
      return NextResponse.json(
        { error: "server_misconfigured" },
        { status: 500 }
      );

    // getToken works in App Router route handlers; it reads the next-auth cookie
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

    const getResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          //   "User-Agent": "qubit-admin",
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
    // fileJson.content may contain newlines — use Buffer to decode
    const contentBase64: string = fileJson.content ?? "";
    const raw = Buffer.from(contentBase64, "base64").toString("utf8");
    const parsed = JSON.parse(raw);

    return NextResponse.json({ activities: parsed, sha: fileJson.sha });
  } catch (err: any) {
    console.error("GET /api/admin/get-activities error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
