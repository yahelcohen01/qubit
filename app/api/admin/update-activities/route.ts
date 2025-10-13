// app/api/admin/update-activities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getToken } from "next-auth/jwt";
import { validateEndpoint } from "@/app/shared/lib/utils";
import { uploadActivities } from "../handlers";

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

export const PUT = validateEndpoint({
  schema: {
    body: PayloadSchema,
    query: z.object({ branch: z.string().optional() }),
  },
  handler: async (request) => {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
    }

    const { activities } = request.validatedBody;
    const { branch } = request.query;

    return await uploadActivities({
      activities,
      branch,
      username: token.name,
      email: token.email,
    });
  },
  options: { authenticate: true, requireAdmin: true },
});
