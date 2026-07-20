import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function Brands() {
  const brands = await prisma.brand.findMany({
    where: {
      featured: true,
      isActive: true,
    },

    orderBy: {
      name: "asc",
    },

    take: 12,

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

  if (brands.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

          <div>

            <span className="font-semibold uppercase tracking-[0.25em] text-[#DC2626]">
              Trusted Brands
            </span>

            <h2 className="mt-3 text-4xl font-bold text-[#0F172A]">
              Shop By Brand
            </h2>

            <p className="mt-4 max-w-2xl text-gray-500">
              Discover premium brands trusted by
              contractors, engineers and businesses
              across New Zealand.
            </p>

          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-2 font-semibold text-[#DC2626] transition hover:text-red-700"
          >
            View All

            <ArrowRight size={18} />

          </Link>

        </div>

        {/* Brand Grid */}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">

          {brands.map((brand) => (

            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#DC2626] hover:shadow-xl"
            >

              {/* Logo */}

              <div className="flex h-24 items-center justify-center rounded-2xl bg-gray-50">

                {brand.logoUrl ? (

                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={120}
                    height={70}
                    className="max-h-16 w-auto object-contain transition duration-300 group-hover:scale-105"
                  />

                ) : (

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626] text-2xl font-bold text-white">

                    {brand.name.charAt(0)}

                  </div>

                )}

              </div>

              {/* Content */}

              <div className="mt-6 text-center">

                <h3 className="text-lg font-bold text-[#0F172A] transition group-hover:text-[#DC2626]">

                  {brand.name}

                </h3>

                {brand.description && (

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">

                    {brand.description}

                  </p>

                )}

                <div className="mt-5 flex items-center justify-center gap-2">

                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-[#DC2626]">

                    {brand.products.length} Products

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