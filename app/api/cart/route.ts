import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    // User not logged in
    if (!session?.user?.id) {
      return NextResponse.json({
        success: true,
        items: [],
        itemCount: 0,
        subtotal: 0,
      });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: {
                    isCover: true,
                  },
                  take: 1,
                },
                brand: true,
                category: true,
              },
            },
            variant: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({
        success: true,
        items: [],
        itemCount: 0,
        subtotal: 0,
      });
    }

    const items = cart.items.map((item) => {
      const price = Number(item.product.price);

      return {
        id: item.id,

        cartId: item.cartId,

        quantity: item.quantity,

        productId: item.product.id,

        variantId: item.variantId,

        name: item.product.name,

        slug: item.product.slug,

        sku: item.product.sku,

        price,

        comparePrice: item.product.comparePrice
          ? Number(item.product.comparePrice)
          : null,

        image:
          item.product.images[0]?.imageUrl ??
          null,

        brand:
          item.product.brand?.name ??
          null,

        category:
          item.product.category.name,

        variant: item.variant,
      };
    });

    const itemCount = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const subtotal = items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    return NextResponse.json({
      success: true,

      cart: {
        id: cart.id,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      },

      items,

      itemCount,

      subtotal,
    });
  } catch (error) {
    console.error(
      "Cart API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        items: [],
        itemCount: 0,
        subtotal: 0,
        error:
          "Failed to load shopping cart.",
      },
      {
        status: 500,
      }
    );
  }
}