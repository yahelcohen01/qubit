import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { getServerSession as nextGetServerSession } from "next-auth/next";

// --- Module augmentation so we can add `role` to the session user ---
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      // role is set based on allowlist (ADMIN_EMAILS)
      role?: "admin" | "user";
    };
  }
}

// --- Helpers to read env config ---
const ensureEnv = (name: string): string => {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return v;
};

const GITHUB_ID = process.env.GITHUB_ID || "";
const GITHUB_SECRET = process.env.GITHUB_SECRET || "";
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "";
// ADMIN_EMAILS should be a comma-separated list of admin emails, e.g. "admin@example.com,alice@org.com"
const ADMIN_EMAILS_RAW = process.env.ADMIN_EMAILS || "";

/** Returns a trimmed set of admin emails (lowercased). */
const getAdminEmailSet = (): Set<string> =>
  new Set(
    ADMIN_EMAILS_RAW.split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );

// --- NextAuth options ---
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],

  secret: NEXTAUTH_SECRET || undefined,

  callbacks: {
    /**
     * The session callback is called whenever a session is checked.
     * We attach a `role` to session.user when the user's email is in ADMIN_EMAILS.
     */
    async session({ session, token, user }) {
      // session.user.email may be undefined in some edge cases — guard it
      const email = session.user?.email?.toLowerCase() ?? "";
      const isAdmin = getAdminEmailSet().has(email);
      session.user = {
        ...session.user,
        role: isAdmin ? "admin" : "user",
      };
      return session;
    },

    /**
     * Optional: you can also modify the JWT token if you plan to use it directly.
     * Keeping it minimal here.
     */
    async jwt({ token, user }) {
      // no-op for now
      return token;
    },
  },

  // Recommended security settings
  session: {
    strategy: "jwt", // jwt is simple for Vercel; you may switch to database sessions later
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },

  // Pages can be customized (leave default or change to your routes)
  pages: {
    // signIn: "/api/auth/signin", // optional
  },
};

// --- Server helpers ---

/**
 * Wrapper around NextAuth's getServerSession to avoid repeating authOptions import.
 * Use this in API routes and getServerSideProps.
 */
export async function getServerAuthSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await nextGetServerSession(req, res, authOptions);
}

/**
 * requireAdmin for API routes.
 * - If the request is not authenticated -> responds 401 and returns null.
 * - If authenticated but not admin -> responds 403 and returns null.
 * - Otherwise returns the session object.
 *
 * Usage:
 *   const session = await requireAdmin(req, res);
 *   if (!session) return; // response already sent
 */
export async function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  // lazily validate env (fail fast if you forgot to set up)
  if (!GITHUB_ID || !GITHUB_SECRET || !NEXTAUTH_SECRET) {
    console.error(
      "Auth env not fully configured. Make sure GITHUB_ID, GITHUB_SECRET, NEXTAUTH_SECRET are set."
    );
    // Don't reveal secrets to client — just return 500
    res.status(500).json({ error: "auth_not_configured" });
    return null;
  }

  const session = await getServerAuthSession(req, res);
  if (!session) {
    res.status(401).json({ error: "unauthenticated" });
    return null;
  }

  if (session.user?.role !== "admin") {
    res.status(403).json({ error: "forbidden" });
    return null;
  }

  return session;
}

/**
 * For App Router (server components / route handlers) you can also call:
 *   const session = await getServerSession(authOptions);
 * but we export authOptions so you can import it directly where needed.
 *
 * Export default NextAuth handler for pages/api/auth/[...nextauth].ts
 */
export default NextAuth(authOptions);
