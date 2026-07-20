import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Please sign in.",
        },
        {
          status: 401,
        }
      );
    }

    const { cartItemId } =
      await request.json();

    if (!cartItemId) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart item ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const cartItem =
      await prisma.cartItem.findUnique({
        where: {
          id: cartItemId,
        },
        include: {
          cart: true,
        },
      });

    if (!cartItem) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart item not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (
      cartItem.cart.userId !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized.",
        },
        {
          status: 403,
        }
      );
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    const cart =
      await prisma.cart.findUnique({
        where: {
          id: cartItem.cart.id,
        },
        include: {
          items: true,
        },
      });

    const itemCount =
      cart?.items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ) ?? 0;

    return NextResponse.json({
      success: true,
      itemCount,
      message:
        "Item removed from cart.",
    });
  } catch (error) {
    console.error(
      "Remove Cart Item API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to remove cart item.",
      },
      {
        status: 500,
      }
    );
  }
}