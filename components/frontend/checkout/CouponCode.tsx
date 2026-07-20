"use client";

import { useState } from "react";

import {
  CheckCircle2,
  Loader2,
  Percent,
  XCircle,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

export default function CouponCode() {
  const { setCoupon } = useCheckout();

  const [coupon, setCouponCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function applyCoupon() {
    if (!coupon.trim()) {
      setSuccess(false);

      setMessage(
        "Please enter a coupon code."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/checkout/validate-coupon",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            code: coupon.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {
        setSuccess(true);

        setMessage(
          data.message ??
            "Coupon applied successfully."
        );

        // Save coupon inside CheckoutProvider
          setCoupon(
        data.coupon.id,
        data.coupon.code,
        data.discount
      );
      } else {
        setSuccess(false);

        setMessage(
          data.error ??
            "Invalid coupon."
        );
      }
    } catch (error) {
      console.error(error);

      setSuccess(false);

      setMessage(
        "Unable to validate coupon."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">

      {/* Coupon Input */}

      <div>

        <label className="mb-2 block font-medium text-gray-700">
          Discount Code
        </label>

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">

            <Percent
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={coupon}
              onChange={(e) =>
                setCouponCode(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Enter coupon code"
              className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-300
                bg-white
                pl-11
                pr-4
                outline-none
                transition
                focus:border-[#DC2626]
                focus:ring-2
                focus:ring-red-100
              "
            />

          </div>

          <button
            type="button"
            onClick={applyCoupon}
            disabled={
              loading ||
              !coupon.trim()
            }
            className="
              flex
              h-12
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#DC2626]
              px-6
              font-semibold
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
                  size={18}
                  className="animate-spin"
                />
                Applying...
              </>
            ) : (
              "Apply Coupon"
            )}
          </button>

        </div>

      </div>

      {/* Result */}

      {message && (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 ${
            success
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {success ? (
            <CheckCircle2
              size={20}
            />
          ) : (
            <XCircle
              size={20}
            />
          )}

          <span className="font-medium">
            {message}
          </span>

        </div>
      )}

      {/* Info */}

      <div className="rounded-xl bg-gray-50 p-4">

        <h4 className="font-semibold text-[#0F172A]">
          Have a promotion?
        </h4>

        <p className="mt-2 text-sm text-gray-600">
          Enter your coupon or promotional
          code above. If it is valid, the
          discount will automatically be
          applied to your order total.
        </p>

      </div>

    </div>
  );
}