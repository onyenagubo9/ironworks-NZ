"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const CreateReviewSchema = z.object({
  productId: z
    .string()
    .min(1, "Product ID is required"),

  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  title: z
    .string()
    .max(150, "Title is too long")
    .optional(),

  comment: z
    .string()
    .max(2000, "Comment is too long")
    .optional(),
});

export type CreateReviewInput = z.infer<
  typeof CreateReviewSchema
>;

export async function createReview(
  values: CreateReviewInput
) {
  try {
    // Validate Input
    const validated =
      CreateReviewSchema.safeParse(values);

    if (!validated.success) {
      return {
        success: false,
        error:
          validated.error.issues[0]?.message ??
          "Invalid data.",
      };
    }

    // Check Session
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "You must be logged in.",
      };
    }

    // Check Product
    const product =
      await prisma.product.findUnique({
        where: {
          id: validated.data.productId,
        },
      });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    // Prevent Duplicate Review
    const existingReview =
      await prisma.review.findFirst({
        where: {
          productId:
            validated.data.productId,

          userId: session.user.id,
        },
      });

    if (existingReview) {
      return {
        success: false,
        error:
          "You have already reviewed this product.",
      };
    }

    // Check whether customer purchased this product
    const purchased =
      await prisma.orderItem.findFirst({
        where: {
          productId:
            validated.data.productId,

          order: {
            customerId:
              session.user.id,

            paymentStatus: "PAID",
          },
        },
      });

    // If only purchasers can review,
    // keep this check.
    if (!purchased) {
      return {
        success: false,
        error:
          "Only customers who have purchased this product can leave a review.",
      };
    }

    // Create Review
    await prisma.review.create({
      data: {
        rating: validated.data.rating,

        title:
          validated.data.title ?? null,

        comment:
          validated.data.comment ?? null,

        verifiedPurchase: true,

        approved: true,

        userId: session.user.id,

        productId:
          validated.data.productId,
      },
    });

    // Refresh Pages
    revalidatePath(
      `/product/${product.slug}`
    );

    return {
      success: true,
      message:
        "Thank you! Your review has been submitted.",
    };
  } catch (error) {
    console.error(
      "CREATE REVIEW ERROR:"
    );
    console.error(error);

    return {
      success: false,
      error:
        "Something went wrong. Please try again.",
    };
  }
}