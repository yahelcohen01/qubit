import { list, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import z from "zod";

export const getImages = async ({ folder }: { folder: string }) => {
  try {
    const { blobs } = await list({
      prefix: `${folder}/`,
      limit: 100,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const images = blobs
      .filter((blob) =>
        imageExtensions.some((ext) => blob.pathname.toLowerCase().endsWith(ext))
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
};

export const uploadImage = async ({
  file,
  folder,
  filename,
}: {
  file: string;
  folder: string;
  filename?: string;
}) => {
  try {
    const buffer = Buffer.from(file, "base64");
    const fileSizeMB = buffer.length / (1024 * 1024);

    if (fileSizeMB > 5) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    const folderPath = folder;
    const finalFilename =
      filename || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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
};
