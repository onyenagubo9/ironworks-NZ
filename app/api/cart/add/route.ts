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
          error: "Please sign in first.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      productId,
      variantId,
      quantity = 1,
    } = await request.json();

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

    // Find product
    const product =
      await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          inventory: true,
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
          error: "Product is not available.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate variant
    if (variantId) {
      const variant =
        await prisma.productVariant.findUnique({
          where: {
            id: variantId,
          },
        });

      if (!variant) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid product variant.",
          },
          {
            status: 404,
          }
        );
      }
    }

    // Stock check
    if (
      product.inventory?.trackStock &&
      product.inventory.quantity < quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient stock.",
        },
        {
          status: 400,
        }
      );
    }

    // Find user's cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    // Find existing cart item
    const existingItem =
      await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
          variantId: variantId ?? null,
        },
      });

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + quantity;

      if (
        product.inventory?.trackStock &&
        newQuantity >
          product.inventory.quantity
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Not enough stock.",
          },
          {
            status: 400,
          }
        );
      }

      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId ?? null,
          quantity,
        },
      });
    }

    const updatedCart =
      await prisma.cart.findUnique({
        where: {
          userId: session.user.id,
        },
        include: {
          items: true,
        },
      });

    const itemCount =
      updatedCart?.items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ) ?? 0;

    return NextResponse.json({
      success: true,
      message: "Product added to cart.",
      itemCount,
    });
  } catch (error) {
    console.error(
      "Add To Cart API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while adding the product.",
      },
      {
        status: 500,
      }
    );
  }
}