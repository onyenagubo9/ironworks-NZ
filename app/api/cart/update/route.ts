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

    const {
      cartItemId,
      quantity,
    } = await request.json();

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
          product: {
            include: {
              inventory: true,
            },
          },
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

    // Make sure the item belongs to the logged-in user
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

    // Remove if quantity becomes zero
    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Item removed from cart.",
      });
    }

    // Inventory validation
    if (
      cartItem.product.inventory?.trackStock &&
      quantity >
        cartItem.product.inventory.quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Not enough stock available.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
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
      message: "Cart updated.",
    });
  } catch (error) {
    console.error(
      "Update Cart API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update cart.",
      },
      {
        status: 500,
      }
    );
  }
}