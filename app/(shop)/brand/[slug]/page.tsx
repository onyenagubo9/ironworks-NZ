import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Globe, Package, ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";

import BrandProducts from "@/components/brand/BrandProducts";
import RelatedBrands from "@/components/brand/RelatedBrands";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;

  const brand = await prisma.brand.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
      logoUrl: true,
    },
  });

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `${brand.name} | Ironworks NZ`,
    description:
      brand.description ??
      `Browse all ${brand.name} products available at Ironworks NZ.`,
  };
}

export default async function BrandPage({
  params,
}: BrandPageProps) {
  const { slug } = await params;

  const brand = await prisma.brand.findUnique({
    where: {
      slug,
    },
    include: {
      products: {
        where: {
          status: "ACTIVE",
        },
        include: {
          inventory: true,
          category: true,
          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

 if (!brand) {
  notFound();
}

const products = brand.products.map((product) => ({
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
}));



  const totalProducts = brand.products.length;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* Breadcrumb */}

          <nav className="mb-10 flex items-center gap-2 text-sm text-gray-300">

            <Link
              href="/"
              className="hover:text-white"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/brands"
              className="hover:text-white"
            >
              Brands
            </Link>

            <span>/</span>

            <span className="font-semibold text-white">

              {brand.name}

            </span>

          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[220px_1fr]">

            {/* Logo */}

            <div className="flex justify-center">

              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-xl">

                {brand.logoUrl ? (

                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain"
                  />

                ) : (

                  <Package
                    size={90}
                    className="text-gray-300"
                  />

                )}

              </div>

            </div>

            {/* Brand Information */}

            <div>

              <h1 className="text-5xl font-bold text-white">

                {brand.name}

              </h1>

              {brand.description && (

                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">

                  {brand.description}

                </p>

              )}

              <div className="mt-8 flex flex-wrap gap-4">

                                {/* Website */}

                {brand.website && (

                  <Link
                    href={brand.website}
                    target="_blank"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-[#DC2626]
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-700
                    "
                  >

                    <Globe size={18} />

                    Visit Website

                  </Link>

                )}

                {/* Back Button */}

                <Link
                  href="/brands"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-white
                    hover:text-[#0F172A]
                  "
                >

                  <ArrowLeft size={18} />

                  All Brands

                </Link>

              </div>

              {/* Statistics */}

              <div className="mt-12 grid gap-5 sm:grid-cols-3">

                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                  <p className="text-sm uppercase tracking-wider text-gray-300">

                    Products

                  </p>

                  <h3 className="mt-3 text-4xl font-bold text-white">

                    {totalProducts}

                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                  <p className="text-sm uppercase tracking-wider text-gray-300">

                    Status

                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-green-400">

                    {brand.isActive
                      ? "Active"
                      : "Inactive"}

                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                  <p className="text-sm uppercase tracking-wider text-gray-300">

                    Featured

                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-yellow-400">

                    {brand.featured
                      ? "Yes"
                      : "No"}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-3xl font-bold text-[#0F172A]">

              Products from {brand.name}

            </h2>

            <p className="mt-2 text-gray-500">

              Browse every product currently available
              from this brand.

            </p>

          </div>

          <div className="rounded-full bg-[#DC2626] px-5 py-2 text-sm font-semibold text-white">

            {totalProducts} Product
            {totalProducts !== 1 ? "s" : ""}

          </div>

        </div>

                {totalProducts === 0 ? (

          <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center">

            <Package
              size={70}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-6 text-3xl font-bold text-[#0F172A]">

              No Products Available

            </h3>

            <p className="mt-4 text-gray-500">

              This brand doesn't have any active products yet.

            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                rounded-xl
                bg-[#DC2626]
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >

              Browse All Products

            </Link>

          </div>

        ) : (

                <BrandProducts
        products={products}
        />

        )}

      </section>

      {/* Related Brands */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-[#0F172A]">

              Explore Other Brands

            </h2>

            <p className="mt-3 text-gray-500">

              Discover more trusted manufacturers and
              industrial suppliers.

            </p>

          </div>

          <RelatedBrands
            currentBrandId={brand.id}
          />

        </div>

      </section>

      {/* CTA */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <h2 className="text-4xl font-bold text-white">

            Looking for More Equipment?

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

            Browse our complete catalogue of premium
            construction, engineering and industrial
            equipment from leading global brands.

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

              Shop Products

            </Link>

            <Link
              href="/categories"
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

              Browse Categories

            </Link>

          </div>

        </div>

      </section>

            {/* Brand Statistics */}

      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <h3 className="text-5xl font-bold text-[#DC2626]">

                {totalProducts}

              </h3>

              <p className="mt-3 text-gray-600">

                Active Products

              </p>

            </div>

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <h3 className="text-5xl font-bold text-[#DC2626]">

                {brand.featured ? "★" : "-"}

              </h3>

              <p className="mt-3 text-gray-600">

                Featured Brand

              </p>

            </div>

            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

              <h3 className="text-5xl font-bold text-[#DC2626]">

                {brand.isActive ? "✓" : "✕"}

              </h3>

              <p className="mt-3 text-gray-600">

                Brand Status

              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}