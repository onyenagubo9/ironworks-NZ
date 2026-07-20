"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Heart,
} from "lucide-react";

import AddToCartButton from "@/components/frontend/cart/AddToCartButton";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number | null;
    featured: boolean;

    category: {
      name: string;
    };

    brand?: {
      name: string;
    } | null;

    images: {
      imageUrl: string;
    }[];
  };
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const comparePrice =
    product.comparePrice ?? null;

  const hasDiscount =
    comparePrice !== null &&
    comparePrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((comparePrice -
          product.price) /
          comparePrice) *
          100
      )
    : 0;

  return (
    <div
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

      <div className="relative overflow-hidden">

        <Link
          href={`/product/${product.slug}`}
        >
          <div className="relative h-72 bg-gray-100">

            {product.images.length > 0 ? (
              <Image
                src={
                  product.images[0]
                    .imageUrl
                }
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}

          </div>
        </Link>

        {/* Featured */}

        {product.featured && (
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
              font-semibold
              text-white
            "
          >
            Featured
          </span>
        )}

        {/* Discount */}

        {hasDiscount && (
          <span
            className="
              absolute
              right-4
              top-4
              rounded-full
              bg-green-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            -{discount}%
          </span>
        )}

        {/* Hover Actions */}

        <div
          className="
            absolute
            bottom-5
            left-1/2
            flex
            -translate-x-1/2
            translate-y-5
            gap-3
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          {/* Wishlist */}

          <button
            type="button"
            className="
              rounded-full
              bg-white
              p-3
              shadow-lg
              transition
              hover:bg-[#DC2626]
              hover:text-white
            "
          >
            <Heart size={18} />
          </button>

          {/* Quick View */}

          <Link
            href={`/product/${product.slug}`}
            className="
              rounded-full
              bg-white
              p-3
              shadow-lg
              transition
              hover:bg-[#DC2626]
              hover:text-white
            "
          >
            <Eye size={18} />
          </Link>

        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <p className="text-sm font-medium text-[#DC2626]">
          {product.category.name}
        </p>

        <Link
          href={`/product/${product.slug}`}
        >
          <h3
            className="
              mt-2
              line-clamp-2
              text-xl
              font-bold
              text-[#0F172A]
              transition
              hover:text-[#DC2626]
            "
          >
            {product.name}
          </h3>
        </Link>

        {product.brand && (
          <p className="mt-2 text-sm text-gray-500">
            {product.brand.name}
          </p>
        )}

        {/* Price */}

        <div className="mt-6 flex items-center gap-3">

          <span className="text-2xl font-bold text-[#0F172A]">
            NZ$
            {product.price.toFixed(2)}
          </span>

          {comparePrice !== null && (
            <span className="text-gray-400 line-through">
              NZ$
              {comparePrice.toFixed(2)}
            </span>
          )}

        </div>

        {/* Add To Cart */}

        <div className="mt-6">
          <AddToCartButton
            productId={product.id}
          />
        </div>

      </div>

    </div>
  );
}