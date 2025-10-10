import { validateEndpoint } from "@/app/shared/lib/utils";
import { put, list } from "@vercel/blob";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret)
      return NextResponse.json(
        { error: "server_misconfigured" },
        { status: 500 }
      );

    const token = await getToken({ req: request, secret });
    if (!token?.email)
      return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (!adminEmails.includes(String(token.email).toLowerCase())) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const validatedData = uploadSchema.parse(body);

    const buffer = Buffer.from(validatedData.file, "base64");
    const fileSizeMB = buffer.length / (1024 * 1024);

    if (fileSizeMB > 5) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    const folderPath = validatedData.folder;
    const finalFilename =
      validatedData.filename ||
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const pathname = `${folderPath}/${finalFilename}`;

    const blob = await put(pathname, buffer, {
      access: "public",
      contentType: "image/jpeg",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json(
      {
        success: true,
        url: blob.url,
        pathname: blob.pathname,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}

export const GET = validateEndpoint({
  schema: { query: getImagesQuerySchema },
  handler: async (request) => {
    try {
      const { folder } = request.query || "images";

      const validatedQuery = getImagesQuerySchema.parse({ folder });

      const { blobs } = await list({
        prefix: `${validatedQuery.folder}/`,
        limit: 100,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      const images = blobs
        .filter((blob) =>
          imageExtensions.some((ext) =>
            blob.pathname.toLowerCase().endsWith(ext)
          )
        )
        .map((blob) => ({
          url: blob.url,
          pathname: blob.pathname,
          size: blob.size,
          uploadedAt: blob.uploadedAt,
        }))
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );

      return NextResponse.json(
        { success: true, images, total: images.length },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid query parameters",
            details: error.issues.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }

      console.error("Error fetching images from Vercel Blob:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch images",
        },
        { status: 500 }
      );
    }
  },
  options: { authenticate: true, requireAdmin: true },
});
