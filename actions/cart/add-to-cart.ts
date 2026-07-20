"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface AddToCartInput {
  productId: string;
  variantId?: string;
  quantity?: number;
}

export async function addToCart({
  productId,
  variantId,
  quantity = 1,
}: AddToCartInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please sign in to add items to your cart.",
      };
    }

    const userId = session.user.id;

    // Check product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        inventory: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    if (product.status !== "ACTIVE") {
      return {
        success: false,
        error: "This product is not available.",
      };
    }

    if (
      product.inventory?.trackStock &&
      product.inventory.quantity < quantity
    ) {
      return {
        success: false,
        error: "Insufficient stock available.",
      };
    }

    // Verify variant if supplied
    if (variantId) {
      const variant =
        await prisma.productVariant.findUnique({
          where: {
            id: variantId,
          },
        });

      if (!variant) {
        return {
          success: false,
          error: "Selected product variant does not exist.",
        };
      }
    }

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    // Check existing cart item
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
        return {
          success: false,
          error:
            "Not enough stock available.",
        };
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

    revalidatePath("/cart");
    revalidatePath("/");

    return {
      success: true,
      message: "Product added to cart.",
    };
  } catch (error) {
    console.error(
      "Add To Cart Error:",
      error
    );

    return {
      success: false,
      error:
        "Something went wrong while adding the product to the cart.",
    };
  }
}