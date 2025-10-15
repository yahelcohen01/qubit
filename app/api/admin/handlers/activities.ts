import { NextResponse } from "next/server";

type GithubFileMeta = {
  content?: string;
  sha?: string;
};

export async function readFileFromBranch({
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
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub GET failed: ${res.status} — ${text}`);
  }

  const json = (await res.json()) as GithubFileMeta;
  return json;
}

export const getActivities = async (branch: string | undefined) => {
  try {
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

    const branchToUse = branch ?? process.env.ACTIVITIES_BRANCH;

    const fileJson = await readFileFromBranch({
      owner: OWNER,
      repo: REPO,
      path: PATH,
      branch: branchToUse,
      token: TOKEN,
    });

    const contentBase64: string = fileJson.content ?? "";
    const raw = Buffer.from(contentBase64, "base64").toString("utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
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
};

export const uploadActivities = async ({
  activities,
  branch,
  username,
  email,
}: {
  activities: unknown;
  branch: string | undefined;
  username?: string | null;
  email?: string | null;
}) => {
  try {
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

    const branchToUse = branch ?? process.env.ACTIVITIES_BRANCH;

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
      email ?? "unknown"
    } on ${new Date().toISOString()}`;

    const putBody: Record<string, unknown> = {
      message,
      content: contentBase64,
      committer: {
        name: username ?? "admin",
        email: email ?? "noreply@example.com",
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
};
