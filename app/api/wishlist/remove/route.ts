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
          error: "Please sign in first.",
        },
        {
          status: 401,
        }
      );
    }

    // Parse Request Body

    const { productId } =
      await request.json();

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

    // Find Wishlist Item

    const wishlistItem =
      await prisma.wishlist.findUnique({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId,
          },
        },
      });

    if (!wishlistItem) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Product is not in your wishlist.",
        },
        {
          status: 404,
        }
      );
    }

    // Remove Wishlist Item

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    // Updated Wishlist Count

    const wishlistCount =
      await prisma.wishlist.count({
        where: {
          userId: session.user.id,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Product removed from wishlist.",
      wishlistCount,
    });
  } catch (error) {
    console.error(
      "Wishlist Remove Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while removing the product from your wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}