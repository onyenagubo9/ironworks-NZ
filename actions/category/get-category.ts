"use server";

import { prisma } from "@/lib/prisma";

export async function getCategory(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}