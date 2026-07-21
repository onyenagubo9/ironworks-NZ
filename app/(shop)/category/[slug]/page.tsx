import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import RelatedProducts from "@/components/product/RelatedProducts";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
      seoTitle: true,
      seoDescription: true,
    },
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title:
      category.seoTitle ??
      `${category.name} | Ironworks NZ`,

    description:
      category.seoDescription ??
      category.description ??
      `Browse ${category.name} products.`,
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },

    include: {
      products: {
        where: {
          status: "ACTIVE",
        },

        include: {
          brand: true,
          inventory: true,

          images: {
            where: {
              isCover: true,
            },

            take: 1,
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const products = category.products.map((product) => ({
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

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12">

          {/* Breadcrumb */}

          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/"
              className="hover:text-[#DC2626]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-[#0F172A]">
              {category.name}
            </span>

          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-bold text-[#0F172A]">

                {category.name}

              </h1>

              {category.description && (

                <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">

                  {category.description}

                </p>

              )}

              <div className="mt-6 flex items-center gap-4">

                <div className="rounded-xl bg-red-50 px-5 py-3">

                  <span className="text-2xl font-bold text-[#DC2626]">

                    {products.length}

                  </span>

                  <p className="text-sm text-gray-600">

                    Products Available

                  </p>

                </div>

              </div>

            </div>

            {category.imageUrl && (

              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-60 w-full rounded-2xl object-cover shadow-lg lg:w-96"
              />

            )}

          </div>

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-4 py-10">

              <div className="grid gap-10 lg:grid-cols-[300px_1fr]">

        {/* Sidebar */}

        <aside className="space-y-8">

          {/* Sort */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#0F172A]">

              Sort Products

            </h2>

            <select
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                outline-none
                transition
                focus:border-[#DC2626]
              "
              defaultValue="latest"
            >

              <option value="latest">
                Latest Products
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name">
                Name (A-Z)
              </option>

            </select>

          </div>

          {/* Price Filter */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#0F172A]">

              Price Range

            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>$0 - $50</span>

              </label>

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>$50 - $100</span>

              </label>

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>$100 - $500</span>

              </label>

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>$500+</span>

              </label>

            </div>

          </div>

          {/* Brands */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#0F172A]">

              Brands

            </h2>

            <div className="space-y-3">

              {[
                ...new Set(
                  products
                    .map((p) => p.brand?.name)
                    .filter(Boolean)
                ),
              ].map((brand) => (

                <label
                  key={brand}
                  className="flex items-center gap-3"
                >

                  <input type="checkbox" />

                  <span>{brand}</span>

                </label>

              ))}

              {products.every((p) => !p.brand) && (

                <p className="text-sm text-gray-500">

                  No brands available.

                </p>

              )}

            </div>

          </div>

          {/* Availability */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-bold text-[#0F172A]">

              Availability

            </h2>

            <div className="space-y-3">

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>In Stock</span>

              </label>

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                <span>Out of Stock</span>

              </label>

            </div>

          </div>

        </aside>

        {/* Product Content */}

        <div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold text-[#0F172A]">

                Products

              </h2>

              <p className="mt-2 text-gray-500">

                Showing

                <span className="mx-2 font-semibold text-[#DC2626]">

                  {products.length}

                </span>

                products

              </p>

            </div>

          </div>

                    {products.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center">

              <h3 className="text-3xl font-bold text-[#0F172A]">
                No Products Found
              </h3>

              <p className="mt-4 text-gray-500">
                There are currently no published products in this category.
              </p>

            </div>

          ) : (

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

              {products.map((product) => {

                const coverImage =
                  product.images[0]?.imageUrl ??
                  "/images/product-placeholder.png";

                const inStock =
                  (product.inventory?.quantity ?? 0) > 0 ||
                  product.inventory?.allowBackorder;

                const discount =
                  product.comparePrice &&
                  product.comparePrice > product.price
                    ? Math.round(
                        ((product.comparePrice - product.price) /
                          product.comparePrice) *
                          100
                      )
                    : 0;

                return (

                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition
                      hover:-translate-y-1
                      hover:shadow-xl
                    "
                  >

                    {/* Product Image */}

                    <div className="relative h-72 overflow-hidden bg-gray-100">

                      <img
                        src={coverImage}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-300
                          group-hover:scale-105
                        "
                      />

                      {discount > 0 && (

                        <span className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-[#DC2626]
                          px-3
                          py-1
                          text-xs
                          font-bold
                          text-white
                        ">

                          -{discount}%

                        </span>

                      )}

                    </div>

                    {/* Product Details */}

                    <div className="space-y-4 p-6">

                      {product.brand && (

                        <p className="text-sm font-semibold uppercase tracking-widest text-[#DC2626]">

                          {product.brand.name}

                        </p>

                      )}

                      <h3 className="
                        line-clamp-2
                        text-xl
                        font-bold
                        text-[#0F172A]
                        transition
                        group-hover:text-[#DC2626]
                      ">

                        {product.name}

                      </h3>

                      {product.shortDescription && (

                        <p className="line-clamp-2 text-sm text-gray-500">

                          {product.shortDescription}

                        </p>

                      )}

                      <div className="flex items-center gap-3">

                        <span className="text-2xl font-bold text-[#DC2626]">

                          ${product.price.toFixed(2)}

                        </span>

                        {product.comparePrice && (

                          <span className="text-lg text-gray-400 line-through">

                            ${product.comparePrice.toFixed(2)}

                          </span>

                        )}

                      </div>

                      <div className="flex items-center justify-between">

                        {inStock ? (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                            In Stock

                          </span>

                        ) : (

                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">

                            Out of Stock

                          </span>

                        )}

                        <span className="text-sm font-medium text-gray-500">

                          SKU: {product.sku}

                        </span>

                      </div>

                    </div>

                  </Link>

                );

              })}

            </div>

          )}

                  </div>

      </div>

      {/* Bottom Section */}

      <section className="mt-20">

        {/* Pagination */}

        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <p className="text-gray-600">

            Showing

            <span className="mx-2 font-semibold text-[#DC2626]">

              {products.length}

            </span>

            product{products.length !== 1 ? "s" : ""}

            in this category.

          </p>

          <div className="flex items-center gap-3">

            <button
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-3
                text-gray-400
                cursor-not-allowed
              "
              disabled
            >
              Previous
            </button>

            <button
              className="
                rounded-xl
                bg-[#DC2626]
                px-5
                py-3
                font-semibold
                text-white
              "
            >
              1
            </button>

            <button
              className="
                rounded-xl
                border
                border-gray-300
                px-5
                py-3
                text-gray-400
                cursor-not-allowed
              "
              disabled
            >
              Next
            </button>

          </div>

        </div>

      </section>

      {/* Continue Shopping */}

      <section className="mt-16">

        <div className="rounded-2xl bg-[#0F172A] px-8 py-12 text-center">

          <h2 className="text-3xl font-bold text-white">

            Looking for More Products?

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">

            Browse all our industrial and construction products,
            discover new arrivals, and find everything you need for
            your next project.

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
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >
            Continue Shopping
          </Link>

        </div>

      </section>

      {/* Related Products */}

      {products.length > 0 && (

        <section className="mt-20">

          <RelatedProducts
            categoryId={category.id}
            productId={products[0].id}
          />

        </section>

      )}

    </section>

  </main>

);
}