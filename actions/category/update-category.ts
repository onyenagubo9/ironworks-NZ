"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import {
  CategorySchema,
  CategoryInput,
} from "@/schemas/category-schema";

export async function updateCategory(
  id: string,
  values: CategoryInput
) {
  const validated = CategorySchema.safeParse(values);

  if (!validated.success) {
    return {
      error: "Invalid category data.",
    };
  }

  const {
    name,
    slug,
    description,
    imageUrl,
    imagePublicId,
    parentId,
    featured,
    isActive,
    seoTitle,
    seoDescription,
  } = validated.data;

  const existingCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!existingCategory) {
    return {
      error: "Category not found.",
    };
  }

  const slugExists = await prisma.category.findFirst({
    where: {
      slug,
      NOT: {
        id,
      },
    },
  });

  if (slugExists) {
    return {
      error: "Another category already uses this slug.",
    };
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description,

      imageUrl,
      imagePublicId,

      parentId:
        parentId && parentId !== ""
          ? parentId
          : null,

      featured,

      isActive,

      seoTitle,

      seoDescription,
    },
  });

  revalidatePath("/admin/categories");

  revalidatePath(`/admin/categories/${id}`);

  revalidatePath(`/admin/categories/${id}/edit`);

  return {
    success: "Category updated successfully.",
  };
}