import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check Authentication

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          items: [],
          itemCount: 0,
        },
        {
          status: 401,
        }
      );
    }

    // Get Wishlist

    const wishlist =
      await prisma.wishlist.findMany({
        where: {
          userId: session.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          product: {
            include: {
              brand: true,

              category: true,

              inventory: true,

              images: {
                orderBy: {
                  sortOrder: "asc",
                },
              },
            },
          },
        },
      });

    // Serialize Decimal fields

    const items = wishlist.map(
      (item) => ({
        ...item,

        product: {
          ...item.product,

          price: Number(
            item.product.price
          ),

          comparePrice:
            item.product.comparePrice
              ? Number(
                  item.product
                    .comparePrice
                )
              : null,

          costPrice:
            item.product.costPrice
              ? Number(
                  item.product
                    .costPrice
                )
              : null,

          weight:
            item.product.weight
              ? Number(
                  item.product.weight
                )
              : null,

          length:
            item.product.length
              ? Number(
                  item.product.length
                )
              : null,

          width:
            item.product.width
              ? Number(
                  item.product.width
                )
              : null,

          height:
            item.product.height
              ? Number(
                  item.product.height
                )
              : null,
        },
      })
    );

    return NextResponse.json({
      success: true,

      items,

      itemCount: items.length,
    });
  } catch (error) {
    console.error(
      "Wishlist API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong while loading the wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}