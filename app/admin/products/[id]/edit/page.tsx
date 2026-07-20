import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductForm from "@/components/admin/products/form/ProductForm";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [
    product,
    categories,
    brands,
  ] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        inventory: true,

        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Update product information.
        </p>

      </div>

      <ProductForm
        categories={categories}
        brands={brands}
        initialData={{
          id: product.id,

          name: product.name,

          slug: product.slug,

          sku: product.sku,

          barcode: product.barcode ?? "",

          shortDescription:
            product.shortDescription ?? "",

          description: product.description,

          categoryId: product.categoryId,

          brandId: product.brandId ?? "",

          tags: product.tags,

          price: Number(product.price),

          comparePrice: product.comparePrice
            ? Number(product.comparePrice)
            : undefined,

          costPrice: product.costPrice
            ? Number(product.costPrice)
            : undefined,

          weight: product.weight
            ? Number(product.weight)
            : undefined,

          length: product.length
            ? Number(product.length)
            : undefined,

          width: product.width
            ? Number(product.width)
            : undefined,

          height: product.height
            ? Number(product.height)
            : undefined,

          quantity:
            product.inventory?.quantity ?? 0,

          lowStockThreshold:
            product.inventory?.lowStock ?? 5,

          trackQuantity:
            product.inventory?.trackStock ??
            true,

          allowBackorder:
            product.inventory
              ?.allowBackorder ?? false,

          featured: product.featured,

          status: product.status,

          metaTitle:
            product.metaTitle ?? "",

          metaDescription:
            product.metaDescription ?? "",

          metaKeywords:
            product.metaKeywords ?? "",

          images: product.images.map(
            (image) => ({
              imageUrl: image.imageUrl,

              publicId: image.publicId,

              altText:
                image.altText ?? "",

              isCover: image.isCover,

              sortOrder:
                image.sortOrder,
            })
          ),
        }}
      />

    </div>
  );
}