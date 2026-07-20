"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function deleteBrand(id: string) {
  const brand = await prisma.brand.findUnique({
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

  if (!brand) {
    return {
      error: "Brand not found.",
    };
  }

  if (brand._count.products > 0) {
    return {
      error:
        "This brand contains products and cannot be deleted.",
    };
  }

  if (brand.logoPublicId) {
    try {
      await cloudinary.uploader.destroy(
        brand.logoPublicId
      );
    } catch (error) {
      console.error(error);
    }
  }

  await prisma.brand.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/brands");

  return {
    success: "Brand deleted successfully.",
  };
}