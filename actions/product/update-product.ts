"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import {
  ProductInput,
  ProductSchema,
} from "@/schemas/product-schema";

export async function updateProduct(
  id: string,
  values: ProductInput
) {
  try {
    const validated =
      ProductSchema.parse(values);

    const product =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    await prisma.$transaction(async (tx) => {
      // Update Product
      await tx.product.update({
        where: {
          id,
        },

        data: {
          name: validated.name,
          slug: validated.slug,
          sku: validated.sku,
          barcode:
            validated.barcode || null,
          shortDescription:
            validated.shortDescription ||
            null,
          description:
            validated.description,

          categoryId:
            validated.categoryId,

          brandId:
            validated.brandId || null,

          tags: validated.tags,

          price: validated.price,

          comparePrice:
            validated.comparePrice ??
            null,

          costPrice:
            validated.costPrice ??
            null,

          weight:
            validated.weight ?? null,

          length:
            validated.length ?? null,

          width:
            validated.width ?? null,

          height:
            validated.height ?? null,

          featured:
            validated.featured,

          status: validated.status,

          metaTitle:
            validated.metaTitle || null,

          metaDescription:
            validated.metaDescription ||
            null,

          metaKeywords:
            validated.metaKeywords ||
            null,
        },
      });

      // Update Inventory

      await tx.inventory.upsert({
        where: {
          productId: id,
        },

        update: {
          quantity:
            validated.quantity,

          lowStock:
            validated.lowStockThreshold,

          trackStock:
            validated.trackQuantity,

          allowBackorder:
            validated.allowBackorder,
        },

        create: {
          productId: id,

          quantity:
            validated.quantity,

          lowStock:
            validated.lowStockThreshold,

          trackStock:
            validated.trackQuantity,

          allowBackorder:
            validated.allowBackorder,
        },
      });

      // Replace Images

      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      if (
        validated.images.length > 0
      ) {
        await tx.productImage.createMany({
          data: validated.images.map(
            (image) => ({
              imageUrl:
                image.imageUrl,

              publicId:
                image.publicId,

              altText:
                image.altText ||
                null,

              isCover:
                image.isCover,

              sortOrder:
                image.sortOrder,

              productId: id,
            })
          ),
        });
      }
    });

    revalidatePath("/admin/products");

    revalidatePath(
      `/admin/products/${id}`
    );

    revalidatePath(
      `/admin/products/${id}/edit`
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Failed to update product.",
    };
  }
}