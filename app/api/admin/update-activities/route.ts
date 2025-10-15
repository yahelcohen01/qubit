import { NextResponse } from "next/server";
import { z } from "zod";
import { getToken } from "next-auth/jwt";
import { validateEndpoint } from "@shared/lib";
import { uploadActivities } from "../handlers";

const PayloadSchema = z.object({
  activities: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1),
      date: z.string().optional(),
      description: z.string().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      location: z
        .object({
          name: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
      tags: z.array(z.string()).optional(),
      organizer: z
        .object({
          name: z.string().optional(),
          email: z.string().optional(),
        })
        .optional(),
      url: z.string().optional(),
      capacity: z.number().int().positive().optional(),
      img: z.string().min(1),
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
});
