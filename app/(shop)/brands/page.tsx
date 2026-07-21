import { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  Globe,
  Package,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Brands | Ironworks NZ",
  description:
    "Browse all trusted brands available at Ironworks NZ.",
};

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    where: {
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
  });

  const featuredBrands = brands.filter(
    (brand) => brand.featured
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              Trusted Manufacturers

            </span>

            <h1 className="mt-8 text-5xl font-bold text-white">

              Shop By Brand

            </h1>

            <p className="mt-6 text-xl leading-9 text-gray-300">

              Discover premium construction,
              industrial and engineering brands
              trusted by professionals across New Zealand.

            </p>

            <div className="mt-10 rounded-2xl bg-white p-3 shadow-2xl">

              <input
                type="text"
                placeholder="Search brands..."
                className="w-full rounded-xl border-none px-5 py-4 text-lg outline-none"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Featured Brands */}

      {featuredBrands.length > 0 && (

        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-[#0F172A]">

              Featured Brands

            </h2>

            <p className="mt-2 text-gray-500">

              Our most popular manufacturers.

            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {featuredBrands.map((brand) => (

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

                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-100 p-8">

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
                      size={80}
                      className="text-gray-300"
                    />

                  )}

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

                </div>

                {/* Content */}

                <div className="space-y-6 p-7">

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

                      <p className="mt-3 line-clamp-2 text-gray-500">

                        {brand.description}

                      </p>

                    )}

                  </div>

                  <div className="flex items-center justify-between">

                    <span
                      className="
                        rounded-full
                        bg-red-50
                        px-4
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

                    {brand.website && (

                      <span
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-semibold
                          text-gray-500
                        "
                      >

                        <Globe size={16} />

                        Website

                      </span>

                    )}

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-gray-100
                      pt-5
                    "
                  >

                    <span className="font-semibold text-[#DC2626]">

                      View Brand

                    </span>

                    <ArrowRight
                      size={20}
                      className="
                        text-[#DC2626]
                        transition
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

      {/* All Brands */}

      <section className="mx-auto mt-20 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-[#0F172A]">

              All Brands

            </h2>

            <p className="mt-2 text-gray-500">

              Browse every manufacturer available in our store.

            </p>

          </div>

          <div className="rounded-full bg-[#DC2626] px-5 py-2 text-sm font-semibold text-white">

            {brands.length} Brands

          </div>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                      {brands.length === 0 ? (

            <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center">

              <Package
                size={70}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-3xl font-bold text-[#0F172A]">

                No Brands Found

              </h3>

              <p className="mt-4 text-gray-500">

                There are currently no brands available.

              </p>

            </div>

          ) : (

            brands.map((brand) => (

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
                  hover:shadow-xl
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
                      size={60}
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
                        text-xl
                        font-bold
                        text-[#0F172A]
                        transition
                        group-hover:text-[#DC2626]
                      "
                    >

                      {brand.name}

                    </h3>

                    {brand.description && (

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">

                        {brand.description}

                      </p>

                    )}

                  </div>

                  <div className="flex items-center justify-between">

                    <span
                      className="
                        rounded-full
                        bg-gray-100
                        px-3
                        py-2
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >

                      {brand._count.products} Products

                    </span>

                    {brand.website && (

                      <Globe
                        size={18}
                        className="text-[#DC2626]"
                      />

                    )}

                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-5">

                    <span className="font-semibold text-[#DC2626]">

                      View Brand

                    </span>

                    <ArrowRight
                      size={18}
                      className="
                        text-[#DC2626]
                        transition
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </Link>

            ))

          )}

               </div>

      </section>

      {/* Call To Action */}

      <section className="mt-24">

        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

          <div className="mx-auto max-w-5xl px-8 py-20 text-center">

            <span className="inline-flex rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              Trusted Brands

            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">

              Looking for Premium Industrial Products?

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

              Explore thousands of products from the world's
              leading construction, engineering and industrial
              manufacturers. Find quality equipment you can
              rely on.

            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

              <Link
                href="/shop"
                className="
                  rounded-xl
                  bg-[#DC2626]
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                "
              >

                Browse Products

              </Link>

              <Link
                href="/contact"
                className="
                  rounded-xl
                  border
                  border-white
                  px-8
                  py-4
                  text-lg
                  font-semibold
                  text-white
                  transition
                  hover:bg-white
                  hover:text-[#0F172A]
                "
              >

                Contact Us

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="mt-20 mb-20">

        <div className="grid gap-8 rounded-3xl bg-white p-10 shadow-sm md:grid-cols-3">

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              {brands.length}

            </h3>

            <p className="mt-3 text-gray-600">

              Active Brands

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              {brands.reduce(
                (total, brand) =>
                  total + brand._count.products,
                0
              )}

            </h3>

            <p className="mt-3 text-gray-600">

              Products Available

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              {featuredBrands.length}

            </h3>

            <p className="mt-3 text-gray-600">

              Featured Brands

            </p>

          </div>

        </div>

      </section>

    </main>

  );
}