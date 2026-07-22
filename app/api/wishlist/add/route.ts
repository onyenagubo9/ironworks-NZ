import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Check Authentication

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Please sign in to use your wishlist.",
        },
        {
          status: 401,
        }
      );
    }

    // Parse Request Body

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Check Product Exists

    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
          status: true,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (product.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error:
            "This product is currently unavailable.",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent Duplicate Wishlist Items

    const existingWishlist =
      await prisma.wishlist.findUnique({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId,
          },
        },
      });

    if (existingWishlist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Product is already in your wishlist.",
        },
        {
          status: 409,
        }
      );
    }

    // Create Wishlist Item

    await prisma.wishlist.create({
      data: {
        userId: session.user.id,
        productId,
      },
    });

    // Get Updated Wishlist Count

    const wishlistCount =
      await prisma.wishlist.count({
        where: {
          userId: session.user.id,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Product added to wishlist.",
      wishlistCount,
    });
  } catch (error) {
    console.error(
      "Wishlist Add Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while adding the product to your wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}