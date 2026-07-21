"use client";

import Link from "next/link";

import {
  ArrowRight,
  Package,
} from "lucide-react";

import {
  Brand,
  Category,
  Inventory,
  Product,
  ProductImage,
} from "@prisma/client";

type BrandProduct = Omit<
  Product,
  | "price"
  | "comparePrice"
  | "costPrice"
  | "weight"
  | "length"
  | "width"
  | "height"
> & {
  price: number;
  comparePrice: number | null;
  costPrice: number | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;

  category: Category;

  inventory: Inventory | null;

  images: ProductImage[];
};

interface BrandProductsProps {
  products: BrandProduct[];
}

export default function BrandProducts({
  products,
}: BrandProductsProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => {

        const coverImage =
          product.images.find(
            (image) => image.isCover
          )?.imageUrl ??
          product.images[0]?.imageUrl ??
          "/images/product-placeholder.png";

        const inStock =
          (product.inventory?.quantity ?? 0) > 0 ||
          product.inventory?.allowBackorder;

        const discount =
          product.comparePrice &&
          product.comparePrice > product.price
            ? Math.round(
                ((product.comparePrice -
                  product.price) /
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
                  duration-500
                  group-hover:scale-110
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

            <div className="space-y-5 p-6">

              {/* Category */}

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#DC2626]">

                  {product.category.name}

                </span>

                <span className="text-xs font-medium text-gray-400">

                  SKU: {product.sku}

                </span>

              </div>

              {/* Product Name */}

              <div>

                <h3
                  className="
                    line-clamp-2
                    text-2xl
                    font-bold
                    text-[#0F172A]
                    transition
                    group-hover:text-[#DC2626]
                  "
                >

                  {product.name}

                </h3>

                {product.shortDescription && (

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">

                    {product.shortDescription}

                  </p>

                )}

              </div>

              {/* Price */}

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-3xl font-bold text-[#DC2626]">

                  ${product.price.toFixed(2)}

                </span>

                {product.comparePrice && (

                  <span className="text-xl text-gray-400 line-through">

                    ${product.comparePrice.toFixed(2)}

                  </span>

                )}

              </div>

              {/* Availability */}

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

                {product.inventory?.trackStock && (

                  <span className="text-sm text-gray-500">

                    Qty: {product.inventory.quantity}

                  </span>

                )}

              </div>

                            {/* Footer */}

              <div className="border-t border-gray-100 pt-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-gray-400">

                      Product Status

                    </p>

                    <p
                      className={`mt-2 font-semibold ${
                        inStock
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {inStock
                        ? "Available for Purchase"
                        : "Currently Unavailable"}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-[#DC2626]
                      px-5
                      py-3
                      font-semibold
                      text-white
                      transition
                      duration-300
                      group-hover:bg-red-700
                    "
                  >

                    View Product

                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

          </Link>

        );

      })}

    </div>
      );
}