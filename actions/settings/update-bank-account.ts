"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

interface UpdateBankAccountInput {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName?: string;
  swiftCode?: string;
  instructions?: string;
  isActive: boolean;
}

export async function updateBankAccount(
  id: string,
  data: UpdateBankAccountInput
) {
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

    // Prevent duplicate account numbers
    const existing =
      await prisma.bankAccount.findFirst({
        where: {
          accountNumber: data.accountNumber,
          NOT: {
            id,
          },
        },
      });

    if (existing) {
      return {
        success: false,
        error:
          "Another bank account already uses this account number.",
      };
    }

    // Update bank account
    await prisma.bankAccount.update({
      where: {
        id,
      },
      data: {
        bankName: data.bankName.trim(),

        accountName:
          data.accountName.trim(),

        accountNumber:
          data.accountNumber.trim(),

        branchName:
          data.branchName?.trim() || null,

        swiftCode:
          data.swiftCode?.trim() || null,

        instructions:
          data.instructions?.trim() || null,

        isActive: data.isActive,
      },
    });

    // Refresh pages
    revalidatePath(
      "/admin/settings/bank-accounts"
    );

    revalidatePath(
      `/admin/settings/bank-accounts/${id}/edit`
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Update Bank Account Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to update bank account.",
    };
  }
}