"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;

  product: any;
}

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

interface WishlistContextType {
  wishlist: WishlistState;

  loading: boolean;

  refreshWishlist: () => Promise<void>;

  addToWishlist: (
    productId: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  removeFromWishlist: (
    productId: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  isInWishlist: (
    productId: string
  ) => boolean;

  setWishlist: React.Dispatch<
    React.SetStateAction<WishlistState>
  >;
}

const WishlistContext =
  createContext<WishlistContextType | null>(
    null
  );

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] =
    useState(true);

  const [wishlist, setWishlist] =
    useState<WishlistState>({
      items: [],
      itemCount: 0,
    });

  // Load Wishlist

  async function refreshWishlist() {
    try {
      const response = await fetch(
        "/api/wishlist",
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Failed to load wishlist."
        );
      }

      setWishlist({
        items: data.items ?? [],
        itemCount:
          data.itemCount ?? 0,
      });
    } catch (error) {
      console.error(
        "Wishlist Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // Add Product

  async function addToWishlist(
    productId: string
  ) {
    try {
      const response = await fetch(
        "/api/wishlist/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId,
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

      await refreshWishlist();

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Wishlist Add Error:",
        error
      );

      return {
        success: false,
        error:
          "Something went wrong.",
      };
    }
  }

  // Remove Product

  async function removeFromWishlist(
    productId: string
  ) {
    try {
      const response = await fetch(
        "/api/wishlist/remove",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            productId,
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
            "Unable to remove product.",
        };
      }

      await refreshWishlist();

      return {
        success: true,
      };
    } catch (error) {
      console.error(
        "Wishlist Remove Error:",
        error
      );

      return {
        success: false,
        error:
          "Something went wrong.",
      };
    }
  }

  // Check Wishlist

  function isInWishlist(
    productId: string
  ) {
    return wishlist.items.some(
      (item) =>
        item.productId === productId
    );
  }

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,

        loading,

        refreshWishlist,

        addToWishlist,

        removeFromWishlist,

        isInWishlist,

        setWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider."
    );
  }

  return context;
}