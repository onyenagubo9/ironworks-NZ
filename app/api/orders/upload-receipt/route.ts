import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export async function POST(
  request: NextRequest
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const formData =
      await request.formData();

    const orderId = formData.get(
      "orderId"
    ) as string;

    const receipt = formData.get(
      "receipt"
    ) as File | null;

    if (!orderId || !receipt) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order ID and receipt are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_TYPES.includes(
        receipt.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid receipt format.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      receipt.size > MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Receipt must be less than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await prisma.order.findFirst({
        where: {
          id: orderId,
          customerId:
            session.user.id,
        },
        include: {
          payment: true,
        },
      });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!order.payment) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Payment record not found.",
        },
        {
          status: 404,
        }
      );
    }

    const bytes =
      await receipt.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

          const uploadResult =
      await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                "ecommerce/payment-receipts",

              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) {
                reject(
                  error ??
                    new Error(
                      "Cloudinary upload failed."
                    )
                );

                return;
              }

              resolve({
                secure_url:
                  result.secure_url,
                public_id:
                  result.public_id,
              });
            }
          );

        uploadStream.end(buffer);
      });

    const {
      secure_url,
      public_id,
    } = uploadResult;

        await prisma.payment.update({
      where: {
        id: order.payment.id,
      },
      data: {
        receiptUrl: secure_url,

        receiptPublicId: public_id,

        status: "PENDING",

        updatedAt: new Date(),
      },
    });

   return NextResponse.json({
  success: true,

  message:
    "Receipt uploaded successfully.",

  receipt: {
    url: secure_url,

    publicId: public_id,
  },
});
      } catch (error) {
    console.error(
      "Receipt upload error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to upload receipt.",
      },
      {
        status: 500,
      }
    );
  }
}