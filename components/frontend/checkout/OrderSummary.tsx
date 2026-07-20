"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

interface OrderItem {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  price: number;
  image: string | null;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
}: OrderSummaryProps) {
  const { checkout } = useCheckout();

  const shippingCost =
    checkout.shippingFee || shipping;

  const taxAmount =
    checkout.tax || tax;

  const discountAmount =
    checkout.discount || discount;

  const total =
    subtotal +
    shippingCost +
    taxAmount -
    discountAmount;

  return (
    <div className="sticky top-28 space-y-6">

      {/* Summary */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <ShoppingBag
              className="text-[#DC2626]"
              size={22}
            />

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Order Summary
            </h2>

          </div>

        </div>

        {/* Products */}

        <div className="max-h-80 space-y-4 overflow-y-auto p-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">

                  <Package
                    size={24}
                    className="text-gray-500"
                  />

                </div>

                <div>

                  <h4 className="font-semibold text-[#0F172A]">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>

              </div>

              <div className="font-semibold text-[#0F172A]">
                NZ$
                {(item.price * item.quantity).toFixed(
                  2
                )}
              </div>

            </div>
          ))}

        </div>

        {/* Totals */}

        <div className="border-t border-gray-200 p-6">

          <div className="space-y-4">

            <Row
              label="Subtotal"
              value={`NZ$${subtotal.toFixed(
                2
              )}`}
            />

            <Row
              label="Shipping"
              value={
                shippingCost === 0
                  ? "FREE"
                  : `NZ$${shippingCost.toFixed(
                      2
                    )}`
              }
            />

            <Row
              label="Tax"
              value={`NZ$${taxAmount.toFixed(
                2
              )}`}
            />

            <Row
              label="Discount"
              value={`-NZ$${discountAmount.toFixed(
                2
              )}`}
              className="text-green-600"
            />

            <div className="my-2 border-t" />

            <div className="flex items-center justify-between">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-3xl font-bold text-[#DC2626]">
                NZ$
                {total.toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Secure Checkout */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck className="mt-1 text-green-600" />

          <div>

            <h4 className="font-semibold text-[#0F172A]">
              Secure Checkout
            </h4>

            <p className="mt-2 text-sm text-gray-600">
              Your payment information is
              processed securely. We do not
              store your banking credentials.
            </p>

          </div>

        </div>

      </div>

      {/* Shipping */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <Truck
            size={20}
            className="text-[#DC2626]"
          />

          <div>

            <h4 className="font-semibold text-[#0F172A]">
              Delivery
            </h4>

            <p className="text-sm text-gray-500">
              Calculated based on your
              selected delivery method.
            </p>

          </div>

        </div>

      </div>

      {/* Back */}

      <Link
        href="/cart"
        className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-[#0F172A] transition hover:border-[#DC2626] hover:text-[#DC2626]"
      >
        <ArrowLeft size={18} />

        Return to Cart

      </Link>

    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  className?: string;
}

function Row({
  label,
  value,
  className = "",
}: RowProps) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-gray-500">
        {label}
      </span>

      <span
        className={`font-semibold ${className}`}
      >
        {value}
      </span>

    </div>
  );
}