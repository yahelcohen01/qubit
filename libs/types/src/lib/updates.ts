import { z } from 'zod';

export const updateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export const getUpdatesSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  status: z.coerce.string().optional(),
});

export const getUpdatesResponseSchema = z.object({
  updates: z.array(updateSchema),
  total: z.number(),
  page: z.number(),
});

export type Update = z.infer<typeof updateSchema>;
export type GetUpdates = z.infer<typeof getUpdatesSchema>;
export type GetUpdatesResponse = z.infer<typeof getUpdatesResponseSchema>;
