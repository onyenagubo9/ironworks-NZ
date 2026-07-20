"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({
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

  if (!category) {
    return {
      error: "Category not found.",
    };
  }

  if (category._count.products > 0) {
    return {
      error:
        "This category contains products and cannot be deleted.",
    };
  }

  if (category.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(
        category.imagePublicId
      );
    } catch (error) {
      console.error(
        "Cloudinary Delete Error:",
        error
      );
    }
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");

  return {
    success: "Category deleted successfully.",
  };
}