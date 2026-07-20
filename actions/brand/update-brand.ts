"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

import {
  BrandSchema,
  BrandInput,
} from "@/schemas/brand-schema";

export async function updateBrand(
  id: string,
  values: BrandInput
) {
  const validated = BrandSchema.safeParse(values);

  if (!validated.success) {
    return {
      error: "Invalid brand data.",
    };
  }

  const {
    name,
    slug,
    description,
    website,
    featured,
    isActive,
    seoTitle,
    seoDescription,
    logoUrl,
    logoPublicId,
  } = validated.data;

  const existingBrand = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!existingBrand) {
    return {
      error: "Brand not found.",
    };
  }

  // Check if another brand already uses this slug

  const slugExists = await prisma.brand.findFirst({
    where: {
      slug,

      NOT: {
        id,
      },
    },
  });

  if (slugExists) {
    return {
      error: "Another brand already uses this slug.",
    };
  }

  // Remove old Cloudinary logo if it was replaced

  if (
    existingBrand.logoPublicId &&
    existingBrand.logoPublicId !== logoPublicId
  ) {
    try {
      await cloudinary.uploader.destroy(
        existingBrand.logoPublicId
      );
    } catch (error) {
      console.error(
        "Cloudinary delete error:",
        error
      );
    }
  }

  await prisma.brand.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
      description,
      website,
      featured,
      isActive,
      seoTitle,
      seoDescription,
      logoUrl,
      logoPublicId,
    },
  });

  revalidatePath("/admin/brands");
  revalidatePath(`/admin/brands/${id}`);
  revalidatePath(`/admin/brands/${id}/edit`);

  return {
    success: "Brand updated successfully.",
  };
}