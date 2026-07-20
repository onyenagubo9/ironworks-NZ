"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { BrandSchema } from "@/schemas/brand-schema";

export async function createBrand(values: unknown) {
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

  const existing = await prisma.brand.findUnique({
    where: {
      slug,
    },
  });

  if (existing) {
    return {
      error: "A brand with this slug already exists.",
    };
  }

  await prisma.brand.create({
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

  redirect("/admin/brands");
}