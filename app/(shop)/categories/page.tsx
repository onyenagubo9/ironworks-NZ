import { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Categories | Ironworks NZ",
  description:
    "Browse all product categories available at Ironworks NZ.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
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

  const featuredCategories = categories.filter(
    (category) => category.featured
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] to-[#1E293B]">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-[#DC2626]">

              <FolderOpen className="mr-2 h-4 w-4" />

              Browse Categories

            </div>

            <h1 className="text-5xl font-bold leading-tight text-white">

              Shop by Category

            </h1>

            <p className="mt-6 text-xl leading-8 text-gray-300">

              Explore our complete range of industrial,
              construction and engineering supplies.
              Find everything you need quickly by browsing
              product categories.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/shop"
                className="rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                Shop All Products
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0F172A]"
              >
                Back Home
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Featured Categories */}

      {featuredCategories.length > 0 && (

        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Featured Categories

              </h2>

              <p className="mt-2 text-gray-500">

                Our most popular product collections.

              </p>

            </div>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredCategories.map((category) => (

              <Link
                key={category.id}
                href={`/category/${category.slug}`}
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

                <div className="relative h-64 overflow-hidden bg-gray-100">

                  {category.imageUrl ? (

                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-110
                      "
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center">

                      <FolderOpen
                        size={70}
                        className="text-gray-300"
                      />

                    </div>

                  )}

                  <div className="absolute left-5 top-5">

                    <span className="rounded-full bg-[#DC2626] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">

                      Featured

                    </span>

                  </div>

                </div>

                <div className="space-y-5 p-7">

                  <div>

                    <h3 className="text-2xl font-bold text-[#0F172A] transition group-hover:text-[#DC2626]">

                      {category.name}

                    </h3>

                    {category.description && (

                      <p className="mt-3 line-clamp-2 text-gray-500">

                        {category.description}

                      </p>

                    )}

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-gray-600">

                      {category._count.products}

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

                      Browse

                      <ArrowRight
                        size={18}
                        className="
                          transition
                          group-hover:translate-x-1
                        "
                      />

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}

      {/* All Categories */}

      <section className="mx-auto mt-20 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mb-10 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-[#0F172A]">

              All Categories

            </h2>

            <p className="mt-2 text-gray-500">

              Browse every category available in our store.

            </p>

          </div>

          <div className="rounded-full bg-[#DC2626] px-5 py-2 text-sm font-semibold text-white">

            {categories.length} Categories

          </div>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                      {categories.length === 0 ? (

            <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center">

              <FolderOpen
                size={70}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-6 text-3xl font-bold text-[#0F172A]">
                No Categories Found
              </h3>

              <p className="mt-4 text-gray-500">
                There are currently no categories available.
              </p>

            </div>

          ) : (

            categories.map((category) => (

              <Link
                key={category.id}
                href={`/category/${category.slug}`}
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

                {/* Category Image */}

                <div className="relative h-56 overflow-hidden bg-gray-100">

                  {category.imageUrl ? (

                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-110
                      "
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center">

                      <FolderOpen
                        size={60}
                        className="text-gray-300"
                      />

                    </div>

                  )}

                  {category.featured && (

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

                      {category.name}

                    </h3>

                    {category.description && (

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">

                        {category.description}

                      </p>

                    )}

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-700">

                      {category._count.products}

                      {" "}

                      Products

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

            ))

          )}

        </div>

              {/* Call To Action */}

      <section className="mt-24">

        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

          <div className="mx-auto max-w-5xl px-8 py-20 text-center">

            <span className="inline-flex rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              Can't Find What You Need?

            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">

              Explore Our Complete Product Collection

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

              Browse thousands of premium construction,
              engineering and industrial products carefully
              selected for professionals and businesses.

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
                Shop All Products
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

      <section className="mt-20">

        <div className="grid gap-8 rounded-3xl bg-white p-10 shadow-sm md:grid-cols-3">

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              {categories.length}

            </h3>

            <p className="mt-3 text-gray-600">

              Product Categories

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              {categories.reduce(
                (total, category) =>
                  total + category._count.products,
                0
              )}

            </h3>

            <p className="mt-3 text-gray-600">

              Active Products

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-5xl font-bold text-[#DC2626]">

              100%

            </h3>

            <p className="mt-3 text-gray-600">

              Quality Guaranteed

            </p>

          </div>

        </div>

      </section>

    </section>

  </main>

);
}