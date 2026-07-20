"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

interface AdjustStockInput {
  productId: string;
  quantity: number;
  reason?: string;
}

export async function adjustStock({
  productId,
  quantity,
  reason,
}: AdjustStockInput) {
  try {
    // Validate quantity
    if (quantity < 0) {
      return {
        success: false,
        error: "Quantity cannot be negative.",
      };
    }

    // Find inventory
    const inventory =
      await prisma.inventory.findUnique({
        where: {
          productId,
        },
      });

    if (!inventory) {
      return {
        success: false,
        error: "Inventory record not found.",
      };
    }

    // Update inventory
    await prisma.inventory.update({
      where: {
        productId,
      },
      data: {
        quantity,
      },
    });

    // TODO:
    // Save adjustment history when
    // InventoryAdjustment model is created.
    console.log(
      `Inventory adjusted for product ${productId}. New quantity: ${quantity}. Reason: ${
        reason || "No reason provided"
      }`
    );

    // Refresh pages
    revalidatePath("/admin/inventory");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${productId}`);
    revalidatePath(`/admin/products/${productId}/edit`);

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Adjust Inventory Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to update inventory.",
    };
  }
}