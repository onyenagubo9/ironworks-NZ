import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/frontend/product/ProductCard";

export default async function BestSellers() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },

    include: {
      category: true,

      brand: true,

      images: {
        where: {
          isCover: true,
        },
        take: 1,
      },

      orderItems: {
        select: {
          id: true,
        },
      },
    },
  });

  if (products.length === 0) {
    return null;
  }

  const bestSellers = products
    .sort(
      (a, b) =>
        b.orderItems.length - a.orderItems.length
    )
    .slice(0, 8);

  const formattedProducts =
    bestSellers.map((product) => ({
      id: product.id,

      name: product.name,

      slug: product.slug,

      price: Number(product.price),

      comparePrice: product.comparePrice
        ? Number(product.comparePrice)
        : null,

      featured: product.featured,

      category: {
        name: product.category.name,
      },

      brand: product.brand
        ? {
            name: product.brand.name,
          }
        : null,

      images: product.images.map((image) => ({
        imageUrl: image.imageUrl,
      })),
    }));

  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="font-semibold uppercase tracking-[0.25em] text-[#DC2626]">
              Best Sellers
            </span>

            <h2 className="mt-3 text-4xl font-bold text-[#0F172A]">
              Customer Favorites
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Our most purchased products,
              trusted by customers across
              New Zealand.
            </p>

          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-semibold text-[#DC2626] transition hover:text-red-700"
          >
            View All

            <ArrowRight size={18} />

          </Link>

        </div>

        {/* Products */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {formattedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}