"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Package,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";

import QuantitySelector from "./QuantitySelector";

interface CartItemProps {
  item: {
    id: string;
    productId: string;
    name: string;
    slug: string;
    sku: string;
    image: string | null;
    brand: string | null;
    category: string;
    quantity: number;
    price: number;
    comparePrice: number | null;
  };
}

export default function CartItem({
  item,
}: CartItemProps) {
  const router = useRouter();

  const { refreshCart } = useCart();

  const [quantity, setQuantity] =
    useState(item.quantity);

  async function updateQuantity(
    newQuantity: number
  ) {
    try {
      const response = await fetch(
        "/api/cart/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartItemId: item.id,
            quantity: newQuantity,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        alert(
          result.error ??
            "Failed to update cart."
        );
        return;
      }

      setQuantity(newQuantity);

      await refreshCart();

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update quantity."
      );
    }
  }

  async function removeItem() {
    try {
      const response = await fetch(
        "/api/cart/remove",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            cartItemId: item.id,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        alert(
          result.error ??
            "Failed to remove item."
        );
        return;
      }

      await refreshCart();

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to remove item."
      );
    }
  }

  const subtotal =
    item.price * quantity;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row">

        {/* Product Image */}

        <Link
          href={`/product/${item.slug}`}
          className="relative h-28 w-full overflow-hidden rounded-xl border bg-gray-100 lg:h-32 lg:w-32"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">

              <Package
                size={40}
                className="text-gray-400"
              />

            </div>
          )}
        </Link>

        {/* Details */}

        <div className="flex flex-1 flex-col justify-between">

          <div>

            <Link
              href={`/product/${item.slug}`}
              className="text-xl font-semibold text-[#0F172A] hover:text-[#DC2626]"
            >
              {item.name}
            </Link>

            {item.brand && (
              <p className="mt-2 text-sm text-gray-500">
                Brand:
                <span className="ml-1 font-medium">
                  {item.brand}
                </span>
              </p>
            )}

            <p className="mt-1 text-sm text-gray-500">
              SKU:
              <span className="ml-1 font-medium">
                {item.sku}
              </span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Category:
              <span className="ml-1 font-medium">
                {item.category}
              </span>
            </p>

          </div>

          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Price */}

            <div>

              <div className="flex items-center gap-3">

                <span className="text-2xl font-bold text-[#DC2626]">
                  NZ${item.price.toFixed(2)}
                </span>

                {item.comparePrice &&
                  item.comparePrice >
                    item.price && (
                    <span className="text-sm text-gray-400 line-through">
                      NZ$
                      {item.comparePrice.toFixed(
                        2
                      )}
                    </span>
                  )}

              </div>

            </div>

            {/* Quantity */}

            <QuantitySelector
              quantity={quantity}
              onIncrease={() =>
                updateQuantity(
                  quantity + 1
                )
              }
              onDecrease={() =>
                updateQuantity(
                  quantity - 1
                )
              }
            />

            {/* Total */}

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="text-2xl font-bold text-[#0F172A]">
                NZ$
                {subtotal.toFixed(2)}
              </p>

            </div>

            {/* Remove */}

            <button
              type="button"
              onClick={removeItem}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={18} />

              <span className="hidden md:block">
                Remove
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}