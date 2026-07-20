"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found.",
      };
    }

    // Delete images from Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        try {
          await cloudinary.uploader.destroy(
            image.publicId
          );
        } catch (error) {
          console.error(
            `Failed to delete Cloudinary image: ${image.publicId}`,
            error
          );
        }
      })
    );

    // Delete product
    // Inventory and ProductImage rows are deleted automatically
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete product.",
    };
  }
}