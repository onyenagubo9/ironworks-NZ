"use server";

import { prisma } from "@/lib/prisma";
import { CategorySchema } from "@/schemas/category-schema";
import { revalidatePath } from "next/cache";

export async function createCategory(values: unknown) {
  const validated = CategorySchema.safeParse(values);

  if (!validated.success) {
    return {
      error: "Invalid category information.",
    };
  }

  const data = validated.data;

  const exists = await prisma.category.findFirst({
    where: {
      OR: [
        {
          slug: data.slug,
        },
        {
          name: data.name,
        },
      ],
    },
  });

  if (exists) {
    return {
      error: "Category already exists.",
    };
  }

  await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      parentId: data.parentId || null,
      featured: data.featured,
      isActive: data.isActive,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      imageUrl: data.imageUrl,
      imagePublicId: data.imagePublicId,
    },
  });

  revalidatePath("/admin/categories");

  return {
    success: true,
  };
}