import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check Authentication

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({
        success: true,
        count: 0,
      });
    }

    // Count Wishlist Items

    const count = await prisma.wishlist.count({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error(
      "Wishlist Count API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        count: 0,
        error:
          "Failed to load wishlist count.",
      },
      {
        status: 500,
      }
    );
  }
}