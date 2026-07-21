import Link from "next/link";

import {
  ArrowRight,
  Package,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface RelatedBrandsProps {
  currentBrandId: string;
}

export default async function RelatedBrands({
  currentBrandId,
}: RelatedBrandsProps) {
  const brands = await prisma.brand.findMany({
    where: {
      id: {
        not: currentBrandId,
      },

      isActive: true,
    },

    include: {
      _count: {
        select: {
          products: {
            where: {
              status: "ACTIVE",
            },
          },
        },
      },
    },

    orderBy: [
      {
        featured: "desc",
      },
      {
        name: "asc",
      },
    ],

    take: 4,
  });

  if (brands.length === 0) {
    return null;
  }

  return (
    <div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

                {brands.map((brand) => (

          <Link
            key={brand.id}
            href={`/brand/${brand.slug}`}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-sm
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
            "
          >

            {/* Logo */}

            <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-100 p-8">

              {brand.logoUrl ? (

                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="
                    max-h-full
                    max-w-full
                    object-contain
                    transition
                    duration-500
                    group-hover:scale-110
                  "
                />

              ) : (

                <Package
                  size={70}
                  className="text-gray-300"
                />

              )}

              {brand.featured && (

                <span
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    bg-[#DC2626]
                    px-3
                    py-1
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                  "
                >

                  Featured

                </span>

              )}

            </div>

            {/* Content */}

            <div className="space-y-5 p-6">

              <div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    text-[#0F172A]
                    transition
                    group-hover:text-[#DC2626]
                  "
                >

                  {brand.name}

                </h3>

                {brand.description && (

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

                    {brand.description}

                  </p>

                )}

              </div>

              <div className="flex items-center justify-between">

                <span
                  className="
                    rounded-full
                    bg-red-50
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-[#DC2626]
                  "
                >

                  {brand._count.products}

                  {" "}

                  Products

                </span>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-[#DC2626]
                  "
                >

                  View

                  <ArrowRight
                    size={18}
                    className="
                      transition
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </div>

              </div>

            </div>

          </Link>

        ))}

              </div>

    </div>

  );
}