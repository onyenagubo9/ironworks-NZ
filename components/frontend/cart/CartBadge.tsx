"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/useCart";

interface CartBadgeProps {
  className?: string;
}

export default function CartBadge({
  className = "",
}: CartBadgeProps) {
  const {
    cart,
    loading,
  } = useCart();

  const itemCount = cart.itemCount;

  return (
    <Link
      href="/cart"
      aria-label="Shopping Cart"
      className={`relative rounded-xl p-3 transition hover:bg-gray-100 ${className}`}
    >
      <ShoppingCart size={22} />

      {/* Loading Indicator */}

      {loading && (
        <span
          className="
            absolute
            -right-1
            -top-1
            h-3
            w-3
            animate-pulse
            rounded-full
            bg-gray-300
          "
        />
      )}

      {/* Cart Count */}

      {!loading && itemCount > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-[#DC2626]
            px-1
            text-[10px]
            font-bold
            leading-none
            text-white
          "
        >
          {itemCount > 99
            ? "99+"
            : itemCount}
        </span>
      )}
    </Link>
  );
}