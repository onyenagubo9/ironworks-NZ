"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type {
  CartItem,
  CartState,
} from "@/types/cart";

interface CartContextType {
  cart: CartState;

  loading: boolean;

  refreshCart: () => Promise<void>;

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

  async function refreshCart() {
    try {
      const response =
        await fetch("/api/cart", {
          cache: "no-store",
        });

      if (!response.ok) {
        throw new Error(
          "Failed to load cart."
        );
      }

      const data =
        await response.json();

      setCart({
        items: data.items,

        itemCount: data.itemCount,

        subtotal: data.subtotal,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}