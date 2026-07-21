import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import {
  Heart,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

interface RelatedProductsProps {
  categoryId: string;
  productId: string;
}

export default async function RelatedProducts({
  categoryId,
  productId,
}: RelatedProductsProps) {
  const products = await prisma.product.findMany({
    where: {
    categoryId,
    id: {
        not: productId,
    },
    status: "ACTIVE",
    },

    include: {
      images: {
        where: {
          isCover: true,
        },
        take: 1,
      },

      inventory: true,
    },

    take: 4,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section>

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-[#0F172A]">

            Related Products

          </h2>

          <p className="mt-2 text-gray-500">

            You may also like these products.

          </p>

        </div>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {products.map((product) => {
          const image = product.images[0];

          const stock =
            product.inventory?.quantity ?? 0;

          const inStock =
            stock > 0 ||
            product.inventory?.allowBackorder;

          const discount =
            product.comparePrice &&
            Number(product.comparePrice) >
              Number(product.price)
              ? Math.round(
                  ((Number(product.comparePrice) -
                    Number(product.price)) /
                    Number(product.comparePrice)) *
                    100
                )
              : 0;

          return (
            <article
              key={product.id}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              {/* Image */}

              <Link
                href={`/product/${product.slug}`}
                className="relative block aspect-square overflow-hidden bg-gray-100"
              >
                {image ? (
                  <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                {discount > 0 && (
                  <div
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
                      text-white
                    "
                  >
                    -{discount}%
                  </div>
                )}

                <button
                  className="
                    absolute
                    right-4
                    top-4
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    transition
                    hover:bg-red-50
                  "
                >
                  <Heart
                    size={18}
                    className="text-gray-600"
                  />
                </button>
              </Link>

              {/* Content */}

              <div className="space-y-4 p-5">

                <Link
                  href={`/product/${product.slug}`}
                >
                  <h3
                    className="
                      line-clamp-2
                      text-lg
                      font-semibold
                      text-[#0F172A]
                      transition
                      hover:text-[#DC2626]
                    "
                  >
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-3">

                  <span className="text-2xl font-bold text-[#DC2626]">

                    ${Number(product.price).toFixed(2)}

                  </span>

                  {product.comparePrice && (
                    <span className="text-gray-400 line-through">

                      ${Number(
                        product.comparePrice
                      ).toFixed(2)}

                    </span>
                  )}

                </div>

                <div>

                  {inStock ? (
                    <span className="font-medium text-green-600">
                      In Stock
                    </span>
                  ) : (
                    <span className="font-medium text-red-600">
                      Out of Stock
                    </span>
                  )}

                </div>
                                {/* Actions */}

                <div className="flex gap-3 pt-2">

                  <Link
                    href={`/product/${product.slug}`}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      font-semibold
                      text-[#0F172A]
                      transition
                      hover:bg-gray-100
                    "
                  >
                    <ArrowRight size={18} />

                    View

                  </Link>

                  <button
                    disabled={!inStock}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#DC2626]
                      px-4
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-700
                      disabled:cursor-not-allowed
                      disabled:bg-gray-400
                    "
                  >

                    <ShoppingCart size={18} />

                    Cart

                  </button>

                </div>

              </div>

            </article>

          );

        })}

      </div>

    </section>

  );

}