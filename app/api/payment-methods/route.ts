import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bankAccounts =
      await prisma.bankAccount.findMany({
        where: {
          isActive: true,
        },
        orderBy: [
          {
            isDefault: "desc",
          },
          {
            bankName: "asc",
          },
        ],
        select: {
          id: true,
          bankName: true,
          accountName: true,
          accountNumber: true,
          branchName: true,
          swiftCode: true,
          iban: true,
          country: true,
          currency: true,
          instructions: true,
          qrCodeUrl: true,
          isDefault: true,
        },
      });

    return NextResponse.json({
      success: true,
      paymentMethods: bankAccounts,
    });
  } catch (error) {
    console.error(
      "Failed to load payment methods:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to load payment methods.",
      },
      {
        status: 500,
      }
    );
  }
}