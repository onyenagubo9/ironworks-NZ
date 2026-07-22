import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description:
      product.description ??
      `${product.name} - GlobalTrust`,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      brand: true,

      category: true,

      inventory: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },

      reviews: {
        where: {
          approved: true,
        },

        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    ...product,

    price: Number(product.price),

    comparePrice: product.comparePrice
      ? Number(product.comparePrice)
      : null,

    costPrice: product.costPrice
      ? Number(product.costPrice)
      : null,

    weight: product.weight
      ? Number(product.weight)
      : null,

    length: product.length
      ? Number(product.length)
      : null,

    width: product.width
      ? Number(product.width)
      : null,

    height: product.height
      ? Number(product.height)
      : null,

    reviews: product.reviews.map((review) => ({
      ...review,
    })),
  };

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Breadcrumb */}

        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">

          <span>Home</span>

          <span>/</span>

          <span>{serializedProduct.category.name}</span>

          <span>/</span>

          <span className="font-medium text-[#0F172A]">
            {serializedProduct.name}
          </span>

        </nav>

        {/* Product */}

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          <ProductGallery
            images={serializedProduct.images}
          />

          <ProductInfo
            product={serializedProduct}
          />

        </div>

        {/* Related Products */}

        <div className="mt-24">

          <RelatedProducts
            categoryId={serializedProduct.categoryId}
            productId={serializedProduct.id}
          />

        </div>

      </div>
    </div>
  );
}