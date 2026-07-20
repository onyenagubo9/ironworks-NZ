"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

interface CreateBankAccountInput {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName?: string;
  swiftCode?: string;
  instructions?: string;
  isActive: boolean;
}

export async function createBankAccount(
  data: CreateBankAccountInput
) {
  try {
    // Validation

    if (!data.bankName.trim()) {
      return {
        success: false,
        error: "Bank name is required.",
      };
    }

    if (!data.accountName.trim()) {
      return {
        success: false,
        error: "Account name is required.",
      };
    }

    if (!data.accountNumber.trim()) {
      return {
        success: false,
        error: "Account number is required.",
      };
    }

    // Prevent duplicate account numbers

    const existing =
      await prisma.bankAccount.findFirst({
        where: {
          accountNumber:
            data.accountNumber,
        },
      });

    if (existing) {
      return {
        success: false,
        error:
          "A bank account with this account number already exists.",
      };
    }

    // Create bank account

    await prisma.bankAccount.create({
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

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Create Bank Account Error:",
      error
    );

    return {
      success: false,
      error:
        "Failed to create bank account.",
    };
  }
}