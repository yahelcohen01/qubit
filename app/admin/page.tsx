"use server";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@shared/lib/auth";
import { redirect } from "next/navigation";
import AdminEditorClient from "./admin-editor-client";

export default async function AdminPage() {
  // Server-side session check (App Router server component)
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (!session || !email || !adminEmails.includes(email)) {
    // redirect to NextAuth sign-in page
    redirect("/api/auth/signin");
  }

  // authorized: render client editor
  return (
    <div style={{ maxWidth: 980, margin: "32px auto", padding: 20 }}>
      {/* Show a server-side welcome message */}
      <h1>Admin — Activities (signed in as {session.user?.email})</h1>
      <AdminEditorClient />
    </div>
  );
}
