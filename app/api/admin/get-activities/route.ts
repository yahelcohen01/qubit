import { validateEndpoint } from "@shared/lib";
import { getActivities } from "../handlers/activities";
import z from "zod";

const getActivitiesQuerySchema = z.object({
  branch: z.string().min(2).max(100).optional(),
});

export const GET = validateEndpoint({
  schema: {
    query: getActivitiesQuerySchema,
  },
  handler: async (req) => {
    const { branch } = req.query;
    return await getActivities(branch);
  },
});
