"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function clearCart() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please login first.",
      };
    }

    // Find user's cart
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return {
        success: false,
        error: "Cart not found.",
      };
    }

    // Cart already empty
    if (cart.items.length === 0) {
      return {
        success: true,
        message: "Cart is already empty.",
      };
    }

    // Remove all cart items
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    // Refresh pages
    revalidatePath("/cart");
    revalidatePath("/");
    revalidatePath("/checkout");

    return {
      success: true,
      message: "Cart cleared successfully.",
    };
  } catch (error) {
    console.error(
      "Clear Cart Error:",
      error
    );

    return {
      success: false,
      error: "Failed to clear cart.",
    };
  }
}