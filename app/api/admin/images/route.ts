import { validateEndpoint } from "@shared/lib";
import { z } from "zod";
import { getImages, uploadImage } from "../handlers";

const uploadSchema = z.object({
  file: z.string().min(1, "File is required"),
  folder: z
    .string()
    .default("images")
    .refine(
      (val) => /^[a-zA-Z0-9\-_/]+$/.test(val),
      "Folder name contains invalid characters"
    ),
  filename: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[a-zA-Z0-9\-_.]+\.(jpg|jpeg|png|gif|webp|svg)$/.test(val),
      "Invalid filename or extension"
    ),
});

const getImagesQuerySchema = z.object({
  folder: z
    .string()
    .default("images")
    .refine(
      (val) => /^[a-zA-Z0-9\-_/]+$/.test(val),
      "Folder name contains invalid characters"
    ),
});

export const POST = validateEndpoint({
  schema: { body: uploadSchema },
  handler: async (request) => {
    const { file, folder, filename } = request.validatedBody;
    return await uploadImage({ file, folder, filename });
  },
});

export const GET = validateEndpoint({
  schema: {
    query: getImagesQuerySchema,
  },
  handler: async (request) => {
    const { folder } = request.query;
    return await getImages({ folder });
  },
});
