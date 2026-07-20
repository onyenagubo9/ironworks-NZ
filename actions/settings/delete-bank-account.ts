"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function deleteBankAccount(id: string) {
  try {
    // Check if the bank account exists
    const bankAccount =
      await prisma.bankAccount.findUnique({
        where: {
          id,
        },
      });

    if (!bankAccount) {
      return {
        success: false,
        error: "Bank account not found.",
      };
    }

    // Delete the bank account
    await prisma.bankAccount.delete({
      where: {
        id,
      },
    });

    // Refresh the bank accounts page
    revalidatePath(
      "/admin/settings/bank-accounts"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Delete Bank Account Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to delete bank account.",
    };
  }
}