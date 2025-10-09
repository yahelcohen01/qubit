// app/api/admin/update-activities/route.ts
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
}): Promise<GithubFileMeta> {
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
      "User-Agent": "qubit-admin",
    },
  });

  if (!res.ok) {
    // return the raw response info to caller so caller can decide what to do (404 -> create)
    const text = await res.text();
    const err: any = new Error(`GitHub GET failed: ${res.status} — ${text}`);
    err.status = res.status;
    throw err;
  }

  const json = (await res.json()) as GithubFileMeta;
  return json;
}

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

    // Read optional branch from query param ?branch=feature/x
    const urlObj = new URL(req.url);
    const branchParam = urlObj.searchParams.get("branch") ?? undefined;
    // Fallback to ACTIVITIES_BRANCH env var if set
    const branchToUse =
      branchParam ?? process.env.ACTIVITIES_BRANCH ?? undefined;

    // Try to fetch current file metadata (sha) from that branch (if present).
    let sha: string | undefined = undefined;
    try {
      const fileJson = await readFileFromBranch({
        owner: OWNER,
        repo: REPO,
        path: PATH,
        branch: branchToUse,
        token: TOKEN,
      });
      sha = fileJson.sha;
    } catch (err: any) {
      // If GET returns 404 it means the file doesn't exist on that branch.
      // We'll treat that as a create (omit sha). If it's another error, surface it.
      if (err?.status === 404) {
        sha = undefined; // create new file on the branch (branch must exist)
      } else {
        console.error("failed to read file before update:", err);
        return NextResponse.json(
          { error: "failed_fetch_file", detail: String(err?.message ?? err) },
          { status: 500 }
        );
      }
    }

    const contentBase64 = Buffer.from(
      JSON.stringify(activities, null, 2),
      "utf8"
    ).toString("base64");
    const message = `Admin update by ${
      token.email ?? "unknown"
    } on ${new Date().toISOString()}`;

    // Build PUT body — include branch to ensure we commit to the intended branch.
    const putBody: Record<string, unknown> = {
      message,
      content: contentBase64,
      committer: {
        name: token.name ?? "admin",
        email: token.email ?? "noreply@example.com",
      },
    };

    // include sha only when updating an existing file
    if (sha) putBody.sha = sha;
    // include branch if we want to target a non-default branch (or to be explicit)
    if (branchToUse) putBody.branch = branchToUse;

    const putResp = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(
        PATH
      )}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "qubit-admin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(putBody),
      }
    );

    if (!putResp.ok) {
      const text = await putResp.text();
      // If the sha changed between fetch and put, GitHub will reject — surface it
      return NextResponse.json(
        { error: "failed_update_file", detail: text },
        { status: 500 }
      );
    }

    const result = await putResp.json();
    return NextResponse.json({
      ok: true,
      commit: result.commit,
      branchUsed: branchToUse ?? null,
    });
  } catch (err: any) {
    console.error("PUT /api/admin/update-activities error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
