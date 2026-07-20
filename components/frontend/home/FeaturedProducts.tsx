import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

import ProductCard from "@/components/frontend/product/ProductCard";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
      status: "ACTIVE",
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 8,

    include: {
      category: true,

      brand: true,

      images: {
        where: {
          isCover: true,
        },

        take: 1,
      },
    },
  });

  if (products.length === 0) {
    return null;
  }

  const formattedProducts = products.map((product) => ({
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
    <section className="bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="font-semibold uppercase tracking-[0.25em] text-[#DC2626]">
              Featured Products
            </span>

            <h2 className="mt-3 text-4xl font-bold text-[#0F172A]">
              Recommended For You
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Explore our hand-picked collection of
              premium steel, industrial hardware,
              fabrication equipment and construction
              materials.
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