import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ecommerce/brands",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error);

            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(
      "BRAND UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}