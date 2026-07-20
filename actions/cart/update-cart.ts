"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface UpdateCartInput {
  cartItemId: string;
  quantity: number;
}

export async function updateCart({
  cartItemId,
  quantity,
}: UpdateCartInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please login first.",
      };
    }

    // Quantity cannot be negative
    if (quantity < 0) {
      return {
        success: false,
        error: "Invalid quantity.",
      };
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
      return {
        success: false,
        error: "Cart item not found.",
      };
    }

    // Security check
    if (
      cartItem.cart.userId !==
      session.user.id
    ) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    // Remove if quantity becomes zero
    if (quantity === 0) {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });

      revalidatePath("/cart");

      return {
        success: true,
      };
    }

    // Inventory validation
    if (
      cartItem.product.inventory?.trackStock &&
      quantity >
        cartItem.product.inventory.quantity
    ) {
      return {
        success: false,
        error:
          "Not enough stock available.",
      };
    }

    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity,
      },
    });

    revalidatePath("/cart");

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Update Cart Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to update cart.",
    };
  }
}