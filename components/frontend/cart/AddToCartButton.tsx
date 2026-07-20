"use client";

import { useTransition } from "react";

import {
  Loader2,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  productId,
  variantId,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const [isPending, startTransition] =
    useTransition();

  const { refreshCart } = useCart();

  function handleAddToCart() {
    startTransition(async () => {
      try {
        const response = await fetch(
          "/api/cart/add",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              productId,
              variantId,
              quantity,
            }),
          }
        );

        const result =
          await response.json();

        if (!response.ok || !result.success) {
          alert(
            result.error ??
              "Failed to add product to cart."
          );
          return;
        }

        // Refresh cart context
        await refreshCart();

        alert("Product added to cart.");
      } catch (error) {
        console.error(
          "Add to Cart Error:",
          error
        );

        alert(
          "Something went wrong while adding the product."
        );
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
      className={`
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[#DC2626]
        px-5
        py-3
        font-semibold
        text-white
        transition
        hover:bg-red-700
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {isPending ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          Add to Cart
        </>
      )}
    </button>
  );
}