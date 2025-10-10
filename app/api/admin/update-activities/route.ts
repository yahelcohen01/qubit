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

    const urlObj = new URL(req.url);
    const branchParam = urlObj.searchParams.get("branch") ?? undefined;
    const branchToUse =
      branchParam ?? process.env.ACTIVITIES_BRANCH ?? undefined;

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
      if (err?.status === 404) {
        sha = undefined;
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

    const putBody: Record<string, unknown> = {
      message,
      content: contentBase64,
      committer: {
        name: token.name ?? "admin",
        email: token.email ?? "noreply@example.com",
      },
    };

    if (sha) putBody.sha = sha;
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
