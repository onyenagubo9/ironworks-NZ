"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type {
  CartState,
} from "@/types/cart";

interface CartContextType {
  cart: CartState;

  loading: boolean;

  refreshCart: () => Promise<void>;

  addToCart: (
    productId: string,
    quantity?: number,
    variantId?: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  setCart: React.Dispatch<
    React.SetStateAction<CartState>
  >;
}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const [cart, setCart] =
    useState<CartState>({
      items: [],
      itemCount: 0,
      subtotal: 0,
    });

  // Load cart
  async function refreshCart() {
    try {
      const response = await fetch(
        "/api/cart",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load cart."
        );
      }

      const data =
        await response.json();

      setCart({
        items: data.items ?? [],
        itemCount:
          data.itemCount ?? 0,
        subtotal:
          data.subtotal ?? 0,
      });
    } catch (error) {
      console.error(
        "Refresh Cart Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // Add product to cart
  async function addToCart(
    productId: string,
    quantity = 1,
    variantId?: string
  ) {
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
            quantity,
            variantId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        return {
          success: false,
          error:
            data.error ??
            "Unable to add product.",
        };
      }

      await refreshCart();

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Add To Cart Error:",
        error
      );

      return {
        success: false,
        error:
          "Something went wrong while adding the product.",
      };
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        refreshCart,
        addToCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
}