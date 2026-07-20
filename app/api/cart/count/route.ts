import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    // User is not logged in
    if (!session?.user?.id) {
      return NextResponse.json({
        success: true,
        itemCount: 0,
      });
    }

    // Find the user's cart
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          select: {
            quantity: true,
          },
        },
      },
    });

    // User has no cart yet
    if (!cart) {
      return NextResponse.json({
        success: true,
        itemCount: 0,
      });
    }

    // Total quantity of all items
    const itemCount = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return NextResponse.json({
      success: true,
      itemCount,
    });
  } catch (error) {
    console.error(
      "Cart Count API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        itemCount: 0,
        error:
          "Failed to retrieve cart count.",
      },
      {
        status: 500,
      }
    );
  }
}