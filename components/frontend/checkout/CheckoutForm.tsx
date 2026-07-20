"use client";

import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import CouponCode from "./CouponCode";
import PlaceOrderButton from "./PlaceOrderButton";

export default function CheckoutForm() {
  return (
    <div className="space-y-8">

      {/* Shipping Address */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Shipping Address
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the address where your order should be delivered.
          </p>

        </div>

        <div className="p-8">
          <ShippingAddress />
        </div>

      </section>

      {/* Billing Address */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Billing Address
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose whether your billing address is the same as your shipping address.
          </p>

        </div>

        <div className="p-8">
          <BillingAddress />
        </div>

      </section>

      {/* Delivery */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Delivery Method
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select your preferred shipping option.
          </p>

        </div>

        <div className="p-8">
          <DeliveryMethod />
        </div>

      </section>

      {/* Payment */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose how you would like to pay.
          </p>

        </div>

        <div className="p-8">
          <PaymentMethod />
        </div>

      </section>

      {/* Coupon */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-5">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Discount Code
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Apply a coupon or promotional code before placing your order.
          </p>

        </div>

        <div className="p-8">
          <CouponCode />
        </div>

      </section>

      {/* Place Order */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="p-8">
          <PlaceOrderButton />
        </div>

      </section>

    </div>
  );
}