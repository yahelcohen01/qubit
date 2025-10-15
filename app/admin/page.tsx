"use server";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@shared/lib/auth";
import { redirect } from "next/navigation";
import AdminEditorClient from "./components/admin-editor-client";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (!session || !email || !adminEmails.includes(email)) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-6 max-w-full mt-[110px]">
      <h1>Admin — Activities (signed in as {session.user?.email})</h1>
      <AdminEditorClient />
    </div>
  );
}
