"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function deleteOrder(id: string) {
  try {
    // Check if the order exists
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found.",
      };
    }

    // Delete the order
    // Related OrderItems and Payment will be deleted
    // automatically if your Prisma relations use
    // onDelete: Cascade.
    await prisma.order.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete Order Error:", error);

    return {
      success: false,
      error: "Failed to delete order.",
    };
  }
}