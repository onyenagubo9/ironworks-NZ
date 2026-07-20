import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package, ShoppingBag } from "lucide-react";
import { Prisma, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface ShopPageProps {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    brand?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const search = params?.search?.trim() ?? "";
  const category = params?.category ?? "";
  const brand = params?.brand ?? "";
  const sort = params?.sort ?? "newest";
  const page = Number(params?.page ?? "1");

  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // Helper to build preserved URL query strings
  const createQueryString = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams();
    if (search) current.set("search", search);
    if (category) current.set("category", category);
    if (brand) current.set("brand", brand);
    if (sort !== "newest") current.set("sort", sort);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    // Reset to page 1 whenever filters change (unless page itself is updated)
    if (!("page" in newParams)) {
      current.delete("page");
    }

    const str = current.toString();
    return str ? `/shop?${str}` : "/shop";
  };

  const where: Prisma.ProductWhereInput = {
    status: ProductStatus.ACTIVE,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = { slug: category };
  }

  if (brand) {
    where.brand = { slug: brand };
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (sort) {
    case "price-low":
      orderBy = { price: "asc" };
      break;
    case "price-high":
      orderBy = { price: "desc" };
      break;
    case "name":
      orderBy = { name: "asc" };
      break;
  }

  const [products, totalProducts, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      include: {
        category: true,
        brand: true,
        inventory: true,
        images: { orderBy: { sortOrder: "asc" } },
        reviews: true,
      },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
    prisma.brand.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#DC2626]">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="font-medium text-[#0F172A]">Shop</span>
          </div>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-5xl font-bold text-[#0F172A]">
                Industrial Products
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-gray-600">
                Explore our collection of industrial equipment, machinery, parts,
                and heavy supplies for professionals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-[#DC2626] p-6 text-white">
                <ShoppingBag size={34} />
                <p className="mt-5 text-4xl font-bold">{totalProducts}</p>
                <p className="mt-1">Products</p>
              </div>

              <div className="rounded-2xl bg-[#0F172A] p-6 text-white">
                <Package size={34} />
                <p className="mt-5 text-4xl font-bold">{categories.length}</p>
                <p className="mt-1">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Layout */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Search Form */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A]">Search Products</h2>
            <form action="/shop" method="GET" className="mt-5 space-y-4">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by name or SKU..."
                className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
              />
              {category && <input type="hidden" name="category" value={category} />}
              {brand && <input type="hidden" name="brand" value={brand} />}
              {sort && <input type="hidden" name="sort" value={sort} />}

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#DC2626] font-semibold text-white transition hover:bg-red-700"
              >
                Search
              </button>
            </form>
          </section>

          {/* Categories */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A]">Categories</h2>
            <div className="mt-5 space-y-2">
              <Link
                href={createQueryString({ category: null })}
                className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  !category ? "bg-[#DC2626] text-white" : "hover:bg-gray-100"
                }`}
              >
                <span>All Categories</span>
                <span>{totalProducts}</span>
              </Link>

              {categories.map((item) => (
                <Link
                  key={item.id}
                  href={createQueryString({ category: item.slug })}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                    category === item.slug
                      ? "bg-[#DC2626] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          </section>

          {/* Brands */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A]">Brands</h2>
            <div className="mt-5 space-y-2">
              <Link
                href={createQueryString({ brand: null })}
                className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  !brand ? "bg-[#0F172A] text-white" : "hover:bg-gray-100"
                }`}
              >
                <span>All Brands</span>
                <span>{brands.length}</span>
              </Link>

              {brands.map((item) => (
                <Link
                  key={item.id}
                  href={createQueryString({ brand: item.slug })}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition ${
                    brand === item.slug
                      ? "bg-[#0F172A] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Product Area */}
        <div className="space-y-8">
          {/* Toolbar */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Products</h2>
                <p className="mt-2 text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-[#DC2626]">
                    {products.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#DC2626]">
                    {totalProducts}
                  </span>{" "}
                  products
                </p>
              </div>

              <form action="/shop" method="GET" className="flex flex-wrap items-center gap-3">
                {search && <input type="hidden" name="search" value={search} />}
                {category && <input type="hidden" name="category" value={category} />}
                {brand && <input type="hidden" name="brand" value={brand} />}

                <select
                  name="sort"
                  defaultValue={sort}
                  className="h-11 rounded-xl border border-gray-300 bg-white px-4 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>

                <button
                  type="submit"
                  className="rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Apply
                </button>
              </form>
            </div>

            {/* Active Filters Bar */}
            {(search || category || brand) && (
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-6">
                <span className="font-medium text-gray-600">Active Filters:</span>

                {search && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    Search: {search}
                  </span>
                )}
                {category && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    Category: {category}
                  </span>
                )}
                {brand && (
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                    Brand: {brand}
                  </span>
                )}

                <Link
                  href="/shop"
                  className="ml-auto rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-[#DC2626] transition hover:bg-red-50"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </section>

          {/* Product Grid */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const coverImage =
                product.images.find((image) => image.isCover) ?? product.images[0];

              const averageRating =
                product.reviews.length > 0
                  ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
                    product.reviews.length
                  : 0;

              const stock = product.inventory?.quantity ?? 0;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-72 overflow-hidden bg-gray-100">
                    {coverImage ? (
                      <Image
                        src={coverImage.imageUrl}
                        alt={coverImage.altText ?? product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package size={60} className="text-gray-300" />
                      </div>
                    )}

                    {product.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#DC2626] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        Featured
                      </span>
                    )}

                    {stock <= 0 && (
                      <span className="absolute right-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#DC2626]">
                        {product.category.name}
                      </span>
                      {product.brand && (
                        <span className="text-sm text-gray-500">
                          {product.brand.name}
                        </span>
                      )}
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="mt-4 line-clamp-2 text-xl font-bold text-[#0F172A] transition hover:text-[#DC2626]">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold text-[#DC2626]">
                            NZ${Number(product.price).toFixed(2)}
                          </span>
                          {product.comparePrice && (
                            <span className="pb-1 text-gray-400 line-through">
                              NZ${Number(product.comparePrice).toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600">
                            {averageRating.toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-400">
                            ({product.reviews.length} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          Stock
                        </p>
                        <p
                          className={`font-semibold ${
                            stock > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stock > 0 ? `${stock} Available` : "Unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-center font-semibold transition hover:bg-gray-100"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        disabled={stock <= 0}
                        className="flex-1 rounded-xl bg-[#DC2626] px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalProducts > pageSize && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {Array.from({
                length: Math.ceil(totalProducts / pageSize),
              }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <Link
                    key={pageNumber}
                    href={createQueryString({ page: pageNumber.toString() })}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl font-semibold transition ${
                      page === pageNumber
                        ? "bg-[#DC2626] text-white"
                        : "border border-gray-300 bg-white hover:border-[#DC2626] hover:text-[#DC2626]"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {products.length === 0 && (
            <section className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <Package size={72} className="mx-auto text-gray-300" />
              <h2 className="mt-6 text-3xl font-bold text-[#0F172A]">
                No Products Found
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-600">
                We couldn't find any products matching your search criteria. Try
                adjusting your filters or browse all available products.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center rounded-xl bg-[#DC2626] px-8 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                View All Products
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}