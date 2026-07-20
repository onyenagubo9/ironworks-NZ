import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
}

export default function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
}: CartSummaryProps) {
  const total =
    subtotal + shipping + tax - discount;

  return (
    <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <h2 className="text-2xl font-bold text-[#0F172A]">
        Order Summary
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Review your order before proceeding to checkout.
      </p>

      {/* Divider */}

      <div className="my-6 border-t" />

      {/* Summary */}

      <div className="space-y-5">

        {/* Subtotal */}

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            ${subtotal.toFixed(2)}
          </span>

        </div>

        {/* Shipping */}

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Shipping
          </span>

          {shipping === 0 ? (
            <span className="font-semibold text-green-600">
              FREE
            </span>
          ) : (
            <span className="font-semibold">
              ${shipping.toFixed(2)}
            </span>
          )}

        </div>

        {/* Tax */}

        <div className="flex items-center justify-between">

          <span className="text-gray-600">
            Tax
          </span>

          <span className="font-semibold">
            ${tax.toFixed(2)}
          </span>

        </div>

        {/* Discount */}

        {discount > 0 && (
          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Discount
            </span>

            <span className="font-semibold text-green-600">
              -${discount.toFixed(2)}
            </span>

          </div>
        )}

      </div>

      {/* Divider */}

      <div className="my-6 border-t" />

      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-xl font-bold">
          Total
        </span>

        <span className="text-3xl font-bold text-[#DC2626]">
          ${total.toFixed(2)}
        </span>

      </div>

      {/* Checkout */}

      <Link
        href="/checkout"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-6 py-4 font-semibold text-white transition hover:bg-red-700"
      >
        Proceed to Checkout

        <ArrowRight size={20} />
      </Link>

      {/* Continue Shopping */}

      <Link
        href="/shop"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        <ShoppingBag size={18} />

        Continue Shopping
      </Link>

      {/* Secure Checkout */}

      <div className="mt-8 rounded-xl bg-gray-50 p-4">

        <h3 className="font-semibold text-[#0F172A]">
          Secure Checkout
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Your payment information is protected.
          Orders are securely processed and you
          will receive an email confirmation once
          your order has been placed.
        </p>

      </div>

    </div>
  );
}