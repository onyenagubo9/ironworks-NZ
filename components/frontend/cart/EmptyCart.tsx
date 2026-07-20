import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-8 py-20 text-center shadow-sm">
      {/* Icon */}
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50">
        <ShoppingCart size={56} className="text-[#DC2626]" />
      </div>

      {/* Heading */}
      <h2 className="mt-8 text-3xl font-bold text-[#0F172A]">
        Your Cart is Empty
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-lg text-base leading-7 text-gray-500">
        Looks like you haven&apos;t added any products yet. Browse our
        catalogue and add the products you need to begin your order.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
        >
          <ShoppingCart size={18} />
          Continue Shopping
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      {/* Suggested Links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
        <Link
          href="/categories"
          className="transition hover:text-[#DC2626]"
        >
          Browse Categories
        </Link>

        <span>•</span>

        <Link
          href="/brands"
          className="transition hover:text-[#DC2626]"
        >
          Shop Brands
        </Link>

        <span>•</span>

        <Link
          href="/contact"
          className="transition hover:text-[#DC2626]"
        >
          Contact Sales
        </Link>
      </div>
    </div>
  );
}