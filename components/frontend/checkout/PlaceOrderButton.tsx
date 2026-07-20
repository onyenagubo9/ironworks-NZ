"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

export default function PlaceOrderButton() {
  const router = useRouter();

  const { checkout } = useCheckout();

  const [loading, setLoading] =
    useState(false);

  async function placeOrder() {
    if (loading) return;

    // Basic validation

    if (
      !checkout.shippingAddress.firstName ||
      !checkout.shippingAddress.lastName ||
      !checkout.shippingAddress.phone ||
      !checkout.shippingAddress.address1 ||
      !checkout.shippingAddress.city ||
      !checkout.shippingAddress.state ||
      !checkout.shippingAddress.country ||
      !checkout.shippingAddress.postalCode
    ) {
      alert(
        "Please complete your shipping address."
      );
      return;
    }

    if (!checkout.selectedBankId) {
      alert(
        "Please select a payment bank."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/checkout/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            checkout,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.error ??
            "Unable to create your order."
        );

        setLoading(false);
        return;
      }

      router.push(
        `/checkout/success?order=${result.orderNumber}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while creating your order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">

      {/* Secure Checkout */}

      <div className="rounded-xl bg-green-50 p-4">

        <div className="flex items-center gap-3">

          <Lock className="text-green-600" />

          <div>

            <h4 className="font-semibold text-[#0F172A]">
              Secure Checkout
            </h4>

            <p className="text-sm text-gray-600">
              Your order information is
              securely processed.
            </p>

          </div>

        </div>

      </div>

      {/* Button */}

      <button
        type="button"
        onClick={placeOrder}
        disabled={loading}
        className="
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[#DC2626]
          text-lg
          font-bold
          text-white
          transition
          hover:bg-red-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2
              size={22}
              className="animate-spin"
            />
            Creating Order...
          </>
        ) : (
          <>
            <ShoppingBag size={22} />
            Place Order
          </>
        )}
      </button>

      {/* Terms */}

      <p className="text-center text-sm text-gray-500">
        By placing your order you agree to our
        Terms & Conditions and Privacy Policy.
      </p>

    </div>
  );
}