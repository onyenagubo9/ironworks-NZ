"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface RemoveFromCartInput {
  cartItemId: string;
}

export async function removeFromCart({
  cartItemId,
}: RemoveFromCartInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please login first.",
      };
    }

    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        cart: true,
      },
    });

    if (!cartItem) {
      return {
        success: false,
        error: "Cart item not found.",
      };
    }

    // Security check
    if (cartItem.cart.userId !== session.user.id) {
      return {
        success: false,
        error: "Unauthorized.",
      };
    }

    // Delete item
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    // Refresh pages
    revalidatePath("/cart");
    revalidatePath("/");

    return {
      success: true,
      message: "Item removed from cart.",
    };
  } catch (error) {
    console.error(
      "Remove From Cart Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to remove item from cart.",
    };
  }
}