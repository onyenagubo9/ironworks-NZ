"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import {
  ProductInput,
  ProductSchema,
} from "@/schemas/product-schema";

export async function createProduct(
  values: ProductInput
) {
  try {
    // Validate input
    const data = ProductSchema.parse(values);

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: {
        sku: data.sku,
      },
    });

    if (existingSku) {
      return {
        success: false,
        error: "A product with this SKU already exists.",
      };
    }

    // Check if slug already exists
    const existingSlug = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSlug) {
      return {
        success: false,
        error: "Slug already exists.",
      };
    }

    // Create Product
    await prisma.product.create({
      data: {
        name: data.name,

        slug: data.slug,

        sku: data.sku,

        barcode:
          data.barcode || null,

        shortDescription:
          data.shortDescription || null,

        description: data.description,

        price: data.price,

        comparePrice:
          data.comparePrice ?? null,

        costPrice:
          data.costPrice ?? null,

        weight:
          data.weight ?? null,

        length:
          data.length ?? null,

        width:
          data.width ?? null,

        height:
          data.height ?? null,

        metaTitle:
          data.metaTitle || null,

        metaDescription:
          data.metaDescription || null,

        metaKeywords:
          data.metaKeywords || null,

        featured: data.featured,

        status: data.status,

        tags: data.tags,

        publishedAt:
          data.status === "ACTIVE"
            ? new Date()
            : null,

        category: {
          connect: {
            id: data.categoryId,
          },
        },

        brand: data.brandId
          ? {
              connect: {
                id: data.brandId,
              },
            }
          : undefined,

        inventory: {
          create: {
            quantity: data.quantity,

            reservedQuantity: 0,

            lowStock:
              data.lowStockThreshold,

            trackStock:
              data.trackQuantity,

            allowBackorder:
              data.allowBackorder,
          },
        },

        images: {
          create: data.images.map(
            (image, index) => ({
              imageUrl:
                image.imageUrl,

              publicId:
                image.publicId,

              altText:
                image.altText || null,

              isCover:
                image.isCover,

              sortOrder:
                image.sortOrder ??
                index,
            })
          ),
        },
      },
    });

    revalidatePath(
      "/admin/products"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Something went wrong while creating the product.",
    };
  }
}