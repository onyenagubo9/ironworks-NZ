"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import {
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  Minus,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Prisma } from "@prisma/client";

import {
  Brand,
  Category,
  Inventory,
  Product,
  ProductImage,
} from "@prisma/client";

type ProductProps = Omit<
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

  brand: Brand | null;
  category: Category;
  inventory: Inventory | null;
  images: ProductImage[];
};

interface ProductInfoProps {
  product: ProductProps;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const price = Number(product.price);

  const comparePrice = product.comparePrice
    ? Number(product.comparePrice)
    : null;

  const stock = product.inventory?.quantity ?? 0;

  const inStock =
    stock > 0 ||
    product.inventory?.allowBackorder === true;

  const discount = useMemo(() => {
    if (
      comparePrice === null ||
      comparePrice <= price
    ) {
      return 0;
    }

    return Math.round(
      ((comparePrice - price) / comparePrice) *
        100
    );
  }, [price, comparePrice]);

  const increaseQuantity = () => {
    if (
      product.inventory?.trackStock &&
      quantity >= stock
    ) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      Math.max(1, prev - 1)
    );
  };

  return (
    <div className="space-y-8">

      {/* Brand */}

      {product.brand ? (
        <Link
          href={`/brands/${product.brand.slug}`}
          className="inline-block text-sm font-semibold uppercase tracking-widest text-[#DC2626]"
        >
          {product.brand.name}
        </Link>
      ) : (
        <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gray-400">
          No Brand
        </span>
      )}

      {/* Product Name */}

      <div>

        <h1 className="text-4xl font-bold leading-tight text-[#0F172A]">
          {product.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-6">

          <div className="flex items-center gap-1">

            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="ml-2 text-sm text-gray-500">
              No reviews yet
            </span>

          </div>

          <div className="text-sm text-gray-500">

            SKU

            <span className="ml-2 font-semibold text-[#0F172A]">
              {product.sku}
            </span>

          </div>

        </div>

      </div>

      {/* Price */}

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

        <div className="flex flex-wrap items-center gap-4">

          <h2 className="text-4xl font-bold text-[#DC2626]">

            ${price.toFixed(2)}

          </h2>

          {comparePrice && (

            <span className="text-2xl text-gray-400 line-through">

              ${comparePrice.toFixed(2)}

            </span>

          )}

          {discount > 0 && (

            <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-[#DC2626]">

              Save {discount}%

            </span>

          )}

        </div>

      </section>

            {/* Product Details */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="space-y-5">

          <div className="flex items-center justify-between">

            <span className="font-medium text-gray-600">
              Availability
            </span>

            {inStock ? (

              <div className="flex items-center gap-2 text-green-600">

                <CheckCircle size={18} />

                <span className="font-semibold">
                  In Stock ({stock})
                </span>

              </div>

            ) : (

              <div className="flex items-center gap-2 text-red-600">

                <XCircle size={18} />

                <span className="font-semibold">
                  Out of Stock
                </span>

              </div>

            )}

          </div>

          <div className="flex items-center justify-between">

            <span className="font-medium text-gray-600">
              Category
            </span>

            <Link
              href={`/category/${product.category.slug}`}
              className="font-semibold text-[#0F172A] hover:text-[#DC2626]"
            >
              {product.category.name}
            </Link>

          </div>

          <div className="flex items-center justify-between">

            <span className="font-medium text-gray-600">
              Brand
            </span>

            {product.brand ? (

              <Link
                href={`/brands/${product.brand.slug}`}
                className="font-semibold text-[#0F172A] hover:text-[#DC2626]"
              >
                {product.brand.name}
              </Link>

            ) : (

              <span className="text-gray-500">
                No Brand
              </span>

            )}

          </div>

        </div>

      </section>

      {/* Quantity */}

      <section>

        <label className="mb-4 block text-lg font-semibold text-[#0F172A]">

          Quantity

        </label>

        <div className="flex h-14 w-fit items-center overflow-hidden rounded-xl border border-gray-300">

          <button
            type="button"
            onClick={decreaseQuantity}
            className="
              flex
              h-full
              w-14
              items-center
              justify-center
              transition
              hover:bg-gray-100
            "
          >

            <Minus size={18} />

          </button>

          <div className="flex w-16 items-center justify-center text-lg font-bold">

            {quantity}

          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={
              product.inventory?.trackStock &&
              quantity >= stock
            }
            className="
              flex
              h-full
              w-14
              items-center
              justify-center
              transition
              hover:bg-gray-100
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >

            <Plus size={18} />

          </button>

        </div>

      </section>

      {/* Purchase Buttons */}

      <section className="space-y-4">

        <button
          disabled={!inStock}
          className="
            h-14
            w-full
            rounded-xl
            bg-[#DC2626]
            text-lg
            font-semibold
            text-white
            transition
            hover:bg-red-700
            disabled:cursor-not-allowed
            disabled:bg-gray-400
          "
        >
          Add To Cart
        </button>

        <button
          disabled={!inStock}
          className="
            h-14
            w-full
            rounded-xl
            border-2
            border-[#DC2626]
            bg-white
            text-lg
            font-semibold
            text-[#DC2626]
            transition
            hover:bg-red-50
            disabled:cursor-not-allowed
            disabled:border-gray-300
            disabled:text-gray-400
          "
        >
          Buy Now
        </button>

              </section>

      {/* Wishlist */}

      <button
        type="button"
        className="
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-gray-300
          bg-white
          font-semibold
          text-[#0F172A]
          transition
          hover:border-[#DC2626]
          hover:text-[#DC2626]
        "
      >

        <Heart size={20} />

        Add to Wishlist

      </button>

      {/* Shopping Benefits */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="space-y-6">

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-red-50 p-3">

              <Truck
                size={24}
                className="text-[#DC2626]"
              />

            </div>

            <div>

              <h3 className="font-semibold text-[#0F172A]">
                Free Shipping
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Enjoy free shipping on orders over
                $100 with fast nationwide delivery.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-red-50 p-3">

              <RotateCcw
                size={24}
                className="text-[#DC2626]"
              />

            </div>

            <div>

              <h3 className="font-semibold text-[#0F172A]">
                30-Day Returns
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Return eligible products within
                30 days for a full refund or exchange.
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <div className="rounded-xl bg-red-50 p-3">

              <ShieldCheck
                size={24}
                className="text-[#DC2626]"
              />

            </div>

            <div>

              <h3 className="font-semibold text-[#0F172A]">
                Secure Checkout
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                All payments are protected using
                SSL encryption for maximum security.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Product Description */}

      {product.description && (

        <section className="rounded-2xl border border-gray-200 bg-white p-6">

          <h2 className="mb-5 text-2xl font-bold text-[#0F172A]">

            Product Description

          </h2>

          <div className="whitespace-pre-line leading-8 text-gray-600">

            {product.description}

          </div>

        </section>

      )}

      {/* Product Highlights */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <h2 className="mb-6 text-xl font-bold text-[#0F172A]">

          Why You'll Love It

        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl bg-gray-50 p-5">

            <h3 className="font-semibold text-[#0F172A]">
              Premium Quality
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Carefully crafted using high-quality
              materials to ensure durability and
              long-lasting performance.
            </p>

          </div>

          <div className="rounded-xl bg-gray-50 p-5">

            <h3 className="font-semibold text-[#0F172A]">
              Trusted Brand
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">

              {product.brand
                ? `${product.brand.name} is trusted by thousands of customers worldwide.`
                : "Manufactured to meet high-quality standards."}

            </p>

          </div>

          <div className="rounded-xl bg-gray-50 p-5">

            <h3 className="font-semibold text-[#0F172A]">
              Fast Delivery
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Orders are processed quickly and
              shipped using reliable courier services.
            </p>

          </div>

          <div className="rounded-xl bg-gray-50 p-5">

            <h3 className="font-semibold text-[#0F172A]">
              Customer Support
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Our customer support team is available
              to assist you before and after your purchase.
            </p>

          </div>

        </div>

      </section>
            {/* Customer Reviews */}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Customer Reviews
            </h2>

            <p className="mt-2 text-gray-500">
              There are no reviews for this product yet.
            </p>

          </div>

          <button
            type="button"
            className="
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
            Write a Review
          </button>

        </div>

        <div className="mt-8 rounded-xl border border-dashed border-gray-300 py-12 text-center">

          <Star
            size={48}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">
            Be the first to review this product
          </h3>

          <p className="mt-3 text-gray-500">
            Share your experience and help other customers.
          </p>

        </div>

      </section>

      {/* Product Summary */}

      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

        <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
          Product Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Product
            </span>

            <span className="font-semibold text-[#0F172A]">
              {product.name}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              SKU
            </span>

            <span className="font-semibold text-[#0F172A]">
              {product.sku}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Category
            </span>

            <span className="font-semibold text-[#0F172A]">
              {product.category.name}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Brand
            </span>

            <span className="font-semibold text-[#0F172A]">
              {product.brand?.name ?? "No Brand"}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Price
            </span>

            <span className="font-bold text-[#DC2626]">
              ${price.toFixed(2)}
            </span>

          </div>

          {comparePrice && (

            <div className="flex justify-between">

              <span className="text-gray-500">
                Original Price
              </span>

              <span className="text-gray-400 line-through">
                ${comparePrice.toFixed(2)}
              </span>

            </div>

          )}

          <div className="flex justify-between">

            <span className="text-gray-500">
              Availability
            </span>

            <span
              className={`font-semibold ${
                inStock
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {inStock
                ? "In Stock"
                : "Out of Stock"}
            </span>

          </div>

        </div>

      </section>

    </div>

  );

}