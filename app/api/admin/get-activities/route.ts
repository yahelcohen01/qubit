// app/api/admin/get-activities/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type GithubFileMeta = {
  content?: string;
  sha?: string;
  // other fields omitted
};

async function readFileFromBranch({
  owner,
  repo,
  path,
  branch,
  token,
}: {
  owner: string;
  repo: string;
  path: string;
  branch?: string | null;
  token: string;
}) {
  // build URL; include ?ref=branch only when branch is provided
  const encodedPath = encodeURIComponent(path);
  const url =
    branch && branch.length > 0
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(
          branch
        )}`
      : `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      //   "User-Agent": "qubit-admin", // GitHub recommends a user-agent
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub GET failed: ${res.status} — ${text}`);
  }

  const json = (await res.json()) as GithubFileMeta;
  return json;
}

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret)
      return NextResponse.json(
        { error: "server_misconfigured" },
        { status: 500 }
      );

    // getToken reads the next-auth cookie in App Router route handlers
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

    // Read optional branch from query param ?branch=feature/x
    const url = new URL(req.url);
    const branchParam = url.searchParams.get("branch") ?? undefined;
    // Fallback to ACTIVITIES_BRANCH env var if set
    const branchToUse =
      branchParam ?? process.env.ACTIVITIES_BRANCH ?? undefined;

    // fetch file metadata & content from GitHub
    const fileJson = await readFileFromBranch({
      owner: OWNER,
      repo: REPO,
      path: PATH,
      branch: branchToUse,
      token: TOKEN,
    });

    const contentBase64: string = fileJson.content ?? "";
    // decode base64 (file may include newlines)
    const raw = Buffer.from(contentBase64, "base64").toString("utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      // If file is not valid JSON, surface error
      return NextResponse.json(
        { error: "invalid_json_in_repo_file", detail: (err as Error).message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      activities: parsed,
      sha: fileJson.sha,
      branchUsed: branchToUse ?? null,
    });
  } catch (err: any) {
    console.error("GET /api/admin/get-activities error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
