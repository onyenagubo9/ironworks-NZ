import { Metadata } from "next";
import Link from "next/link";

import {
  PackageSearch,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Track Your Order | Ironworks NZ",
  description:
    "Track your Ironworks NZ order using your order number and email address.",
};

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <span className="rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              Order Tracking

            </span>

            <h1 className="mt-8 text-5xl font-bold text-white">

              Track Your Order

            </h1>

            <p className="mt-8 text-xl leading-9 text-gray-300">

              Enter your order number and email address
              to view the latest status of your order.

            </p>

          </div>

        </div>

      </section>

      {/* Tracking Form */}

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="rounded-3xl bg-white p-10 shadow-lg">

          <div className="mb-10 text-center">

            <PackageSearch
              size={60}
              className="mx-auto text-[#DC2626]"
            />

            <h2 className="mt-6 text-3xl font-bold text-[#0F172A]">

              Find Your Order

            </h2>

            <p className="mt-4 text-gray-500">

              Use the details from your order confirmation
              email to track your shipment.

            </p>

          </div>

          <form className="space-y-8">

            <div>

              <label className="mb-2 block font-medium">

                Order Number

              </label>

              <input
                type="text"
                placeholder="e.g. ORD-100254"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-4
                  outline-none
                  transition
                  focus:border-[#DC2626]
                "
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Email Address

              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-4
                  outline-none
                  transition
                  focus:border-[#DC2626]
                "
              />

            </div>

            <button
              type="submit"
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#DC2626]
                px-6
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >

              <Search size={22} />

              Track Order

            </button>

          </form>

        </div>

      </section>
            {/* Order Summary */}

      <section className="pb-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* Order Details */}

            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Order Information

              </h2>

              <div className="mt-10 space-y-6">

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="font-medium text-gray-500">

                    Order Number

                  </span>

                  <span className="font-semibold text-[#0F172A]">

                    ORD-100254

                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="font-medium text-gray-500">

                    Order Date

                  </span>

                  <span className="font-semibold text-[#0F172A]">

                    15 July 2026

                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="font-medium text-gray-500">

                    Status

                  </span>

                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                    In Transit

                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="font-medium text-gray-500">

                    Shipping Method

                  </span>

                  <span className="font-semibold text-[#0F172A]">

                    Express Delivery

                  </span>

                </div>

                <div className="flex items-center justify-between border-b pb-4">

                  <span className="font-medium text-gray-500">

                    Estimated Delivery

                  </span>

                  <span className="font-semibold text-[#0F172A]">

                    18 July 2026

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="font-medium text-gray-500">

                    Total Amount

                  </span>

                  <span className="text-2xl font-bold text-[#DC2626]">

                    $2,450.00

                  </span>

                </div>

              </div>

            </div>

            {/* Shipping Information */}

            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Shipping Information

              </h2>

              <div className="mt-10 space-y-8">

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Customer

                  </h3>

                  <p className="mt-2 text-gray-600">

                    John Doe

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Email

                  </h3>

                  <p className="mt-2 text-gray-600">

                    john@example.com

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Delivery Address

                  </h3>

                  <p className="mt-2 leading-7 text-gray-600">

                    123 Industrial Road
                    <br />
                    Auckland
                    <br />
                    New Zealand

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Courier

                  </h3>

                  <p className="mt-2 text-gray-600">

                    DHL Express

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Tracking Number

                  </h3>

                  <p className="mt-2 font-semibold text-[#DC2626]">

                    DHL-984526451NZ

                  </p>

                </div>

              </div>

            </div>

          </div>

                

          {/* Order Progress */}

          <div className="mt-16 rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="text-3xl font-bold text-[#0F172A]">

              Order Progress

            </h2>

            <p className="mt-3 text-gray-500">

              Follow your shipment as it moves through each
              stage of the delivery process.

            </p>

            <div className="mt-12">

              <div className="relative">

                {/* Progress Line */}

                <div className="absolute left-5 top-0 h-full w-1 bg-gray-200"></div>

                <div className="absolute left-5 top-0 h-[75%] w-1 bg-[#DC2626]"></div>

                <div className="space-y-12">

                  {/* Order Placed */}

                  <div className="relative flex items-start gap-6">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] text-white">

                      ✓

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-[#0F172A]">

                        Order Placed

                      </h3>

                      <p className="mt-2 text-gray-600">

                        Your order has been received and confirmed.

                      </p>

                      <span className="mt-2 block text-sm text-gray-400">

                        15 July 2026 • 10:30 AM

                      </span>

                    </div>

                  </div>

                  {/* Processing */}

                  <div className="relative flex items-start gap-6">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] text-white">

                      ✓

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-[#0F172A]">

                        Processing

                      </h3>

                      <p className="mt-2 text-gray-600">

                        Your items have been picked, packed and prepared.

                      </p>

                      <span className="mt-2 block text-sm text-gray-400">

                        15 July 2026 • 2:15 PM

                      </span>

                    </div>

                  </div>

                  {/* Shipped */}

                  <div className="relative flex items-start gap-6">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#DC2626] text-white">

                      ✓

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-[#0F172A]">

                        Shipped

                      </h3>

                      <p className="mt-2 text-gray-600">

                        Your package has left our warehouse and is on its way.

                      </p>

                      <span className="mt-2 block text-sm text-gray-400">

                        16 July 2026 • 8:00 AM

                      </span>

                    </div>

                  </div>

                  {/* Delivered */}

                  <div className="relative flex items-start gap-6">

                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#DC2626] bg-white">

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-gray-400">

                        Delivered

                      </h3>

                      <p className="mt-2 text-gray-500">

                        Estimated delivery on 18 July 2026.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

                    {/* Tracking Tips */}

          <div className="mt-16 grid gap-8 lg:grid-cols-2">

            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Tracking Tips

              </h2>

              <div className="mt-8 space-y-6">

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Check Your Email

                  </h3>

                  <p className="mt-2 text-gray-600">

                    We'll send email updates whenever your
                    order moves to the next stage.

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Delivery Delays

                  </h3>

                  <p className="mt-2 text-gray-600">

                    Severe weather, holidays and courier
                    delays may affect delivery times.

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Need Assistance?

                  </h3>

                  <p className="mt-2 text-gray-600">

                    If your tracking hasn't updated within
                    48 hours, please contact our support
                    team for assistance.

                  </p>

                </div>

              </div>

            </div>

            {/* FAQs */}

            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Frequently Asked Questions

              </h2>

              <div className="mt-8 space-y-8">

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Where can I find my order number?

                  </h3>

                  <p className="mt-2 text-gray-600">

                    Your order number is included in your
                    confirmation email and on your invoice.

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    My tracking isn't updating.

                  </h3>

                  <p className="mt-2 text-gray-600">

                    Tracking updates may take several hours
                    after shipment. If there is no update
                    after 48 hours, please contact us.

                  </p>

                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#0F172A]">

                    Can I change my delivery address?

                  </h3>

                  <p className="mt-2 text-gray-600">

                    Address changes may be possible before
                    your order has been dispatched.
                    Contact our support team immediately.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold text-white">

            Need More Help?

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

            If you have any questions regarding your
            order, delivery or shipment, our customer
            support team is ready to assist you.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/contact"
              className="
                rounded-xl
                bg-[#DC2626]
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >

              Contact Support

            </Link>

            <Link
              href="/shop"
              className="
                rounded-xl
                border
                border-white
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-white
                hover:text-[#0F172A]
              "
            >

              Continue Shopping

            </Link>

          </div>

        </div>

      </section>

    </main>

  );
}