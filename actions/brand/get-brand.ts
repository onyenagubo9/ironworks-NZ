"use server";

import { prisma } from "@/lib/prisma";

export async function getBrand(id: string) {
  return await prisma.brand.findUnique({
    where: {
      id,
    },

    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}