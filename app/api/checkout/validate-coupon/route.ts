import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest
) {
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

    const body = await request.json();

    const code =
      body.code?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon code is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Load customer's cart

    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Calculate subtotal from database

   const subtotal = cart.items.reduce(
  (total, item) => {
    const price = Number(item.product.price);

    return total + item.quantity * price;
  },
  0
);

    // Find coupon

    const coupon =
      await prisma.coupon.findUnique({
        where: {
          code,
        },
      });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon is inactive.",
        },
        {
          status: 400,
        }
      );
    }

    const now = new Date();

    if (
      coupon.startsAt &&
      coupon.startsAt > now
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Coupon is not active yet.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      coupon.expiresAt &&
      coupon.expiresAt < now
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Coupon has expired.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      coupon.usageLimit !== null &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Coupon usage limit reached.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      coupon.minimumOrder &&
      subtotal <
        coupon.minimumOrder
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order amount is NZ$${coupon.minimumOrder.toFixed(
            2
          )}.`,
        },
        {
          status: 400,
        }
      );
    }

    // Calculate discount

    let discount = 0;

    if (
      coupon.type === "PERCENTAGE"
    ) {
      discount =
        subtotal *
        (coupon.value / 100);
    }

    if (coupon.type === "FIXED") {
      discount = coupon.value;
    }

    if (discount > subtotal) {
      discount = subtotal;
    }

    return NextResponse.json({
      success: true,

      message:
        "Coupon applied successfully.",

      coupon: {
        id: coupon.id,
        code: coupon.code,
        description:
          coupon.description,
        type: coupon.type,
        value: coupon.value,
      },

      subtotal,

      discount,
    });
  } catch (error) {
    console.error(
      "Coupon Validation Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to validate coupon.",
      },
      {
        status: 500,
      }
    );
  }
}