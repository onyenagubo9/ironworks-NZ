import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function FeaturedCategories() {
  const categories =
    await prisma.category.findMany({
      where: {
        featured: true,
        isActive: true,
        parentId: null,
      },

      orderBy: {
        name: "asc",
      },

      take: 8,

      include: {
        products: {
          where: {
            status: "ACTIVE",
          },

          select: {
            id: true,
          },
        },
      },
    });

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="font-semibold uppercase tracking-[0.25em] text-[#DC2626]">
              Categories
            </span>

            <h2 className="mt-3 text-4xl font-bold text-[#0F172A]">
              Shop by Category
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Browse our range of premium steel,
              industrial hardware, fabrication
              supplies and construction materials.
            </p>

          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-semibold text-[#DC2626] transition hover:text-red-700"
          >
            View All

            <ArrowRight size={18} />

          </Link>

        </div>

        {/* Categories */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative h-64 overflow-hidden bg-gray-100">

                {category.imageUrl ? (

                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                ) : (

                  <div className="flex h-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">

                    No Image

                  </div>

                )}

              </div>

              {/* Content */}

              <div className="p-6">

                <h3 className="text-xl font-bold text-[#0F172A]">

                  {category.name}

                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

                  {category.description ??
                    "Explore premium industrial products."}

                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-sm text-gray-500">

                    {category.products.length} Products

                  </span>

                  <span className="font-semibold text-[#DC2626] transition group-hover:translate-x-2">

                    Explore →

                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}