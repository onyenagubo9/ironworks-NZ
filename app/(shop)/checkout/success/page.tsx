import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: Props) {
  const { order } = await searchParams;

  if (!order) {
    notFound();
  }

  const orderData =
    await prisma.order.findUnique({
      where: {
        orderNumber: order,
      },
      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },

        bankAccount: true,

        payment: true,

        items: {
          include: {
            product: {
              include: {
                images: {
                  where: {
                    isCover: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

  if (!orderData) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">

      {/* Success */}

      <div className="rounded-3xl border border-green-200 bg-green-50 p-10">

        <div className="flex flex-col items-center text-center">

          <CheckCircle2
            size={70}
            className="text-green-600"
          />

          <h1 className="mt-6 text-4xl font-bold text-[#0F172A]">
            Thank You For Your Order!
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Your order has been created
            successfully and is now awaiting
            payment confirmation.
          </p>

          <div className="mt-8 rounded-xl bg-white px-8 py-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Order Number
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-wide text-[#DC2626]">
              {orderData.orderNumber}
            </h2>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">

              {/* Left */}

      <div className="space-y-8 lg:col-span-2">

        {/* Payment Instructions */}

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Payment Instructions
          </h2>

          <p className="mt-2 text-gray-600">
            Please transfer the exact amount
            below to the following bank
            account. Once payment has been
            received and verified, your order
            will be processed.
          </p>

          <div className="mt-8 rounded-2xl bg-red-50 p-6">

            <p className="text-sm text-gray-500">
              Amount To Pay
            </p>

            <h3 className="mt-2 text-4xl font-bold text-[#DC2626]">
              NZ$
              {Number(
                orderData.total
              ).toFixed(2)}
            </h3>

          </div>

          {orderData.bankAccount && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Bank
                </p>

                <p className="mt-1 font-semibold">
                  {
                    orderData.bankAccount
                      .bankName
                  }
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Account Name
                </p>

                <p className="mt-1 font-semibold">
                  {
                    orderData.bankAccount
                      .accountName
                  }
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Account Number
                </p>

                <p className="mt-1 font-semibold">
                  {
                    orderData.bankAccount
                      .accountNumber
                  }
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Currency
                </p>

                <p className="mt-1 font-semibold">
                  {
                    orderData.bankAccount
                      .currency
                  }
                </p>

              </div>

              {orderData.bankAccount
                .swiftCode && (
                <div>

                  <p className="text-sm text-gray-500">
                    SWIFT
                  </p>

                  <p className="mt-1 font-semibold">
                    {
                      orderData
                        .bankAccount
                        .swiftCode
                    }
                  </p>

                </div>
              )}

              {orderData.bankAccount
                .iban && (
                <div>

                  <p className="text-sm text-gray-500">
                    IBAN
                  </p>

                  <p className="mt-1 font-semibold">
                    {
                      orderData
                        .bankAccount
                        .iban
                    }
                  </p>

                </div>
              )}

            </div>
          )}

          {orderData.bankAccount
            ?.instructions && (
            <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">

              <h3 className="font-semibold text-[#0F172A]">
                Payment Notes
              </h3>

              <p className="mt-3 text-gray-600">
                {
                  orderData
                    .bankAccount
                    .instructions
                }
              </p>

            </div>
          )}

        </section>

        {/* Upload Receipt */}

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Payment Receipt
          </h2>

          <p className="mt-2 text-gray-600">
            After completing your bank
            transfer, upload your payment
            receipt so our finance team can
            verify your payment.
          </p>

          <div className="mt-8">

            <Link
              href={`/orders/${orderData.id}/upload`}
              className="inline-flex items-center gap-3 rounded-xl bg-[#DC2626] px-6 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              Upload Payment Receipt

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>

      </div>

            {/* Right Sidebar */}

      <div className="space-y-8">

        {/* Order Summary */}

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-5">

            {orderData.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <div>

                  <p className="font-semibold text-[#0F172A]">
                    {item.productName}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>

                <p className="font-semibold">
                  NZ$
                  {Number(
                    item.totalPrice
                  ).toFixed(2)}
                </p>

              </div>
            ))}

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-semibold">
                NZ$
                {Number(
                  orderData.subtotal
                ).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Discount
              </span>

              <span className="font-semibold text-green-600">
                -NZ$
                {Number(
                  orderData.discount
                ).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Shipping
              </span>

              <span className="font-semibold">
                NZ$
                {Number(
                  orderData.shippingCost
                ).toFixed(2)}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Tax
              </span>

              <span className="font-semibold">
                NZ$
                {Number(
                  orderData.tax
                ).toFixed(2)}
              </span>

            </div>

            <div className="border-t pt-4">

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span className="text-[#DC2626]">
                  NZ$
                  {Number(
                    orderData.total
                  ).toFixed(2)}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Customer */}

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-bold text-[#0F172A]">
            Customer
          </h2>

          <div className="mt-5 space-y-3">

            <p className="font-semibold">
              {orderData.customer.firstName}{" "}
              {orderData.customer.lastName}
            </p>

            <p className="text-gray-600">
              {orderData.customer.email}
            </p>

          </div>

        </section>

        {/* Status */}

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-bold text-[#0F172A]">
            Order Status
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Order
              </span>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                {orderData.status}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Payment
              </span>

              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                {orderData.paymentStatus}
              </span>

            </div>

          </div>

        </section>

        {/* Actions */}

        <section className="space-y-4">

          <Link
            href="/orders"
            className="flex h-12 items-center justify-center rounded-xl border border-gray-300 font-semibold transition hover:bg-gray-50"
          >
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="flex h-12 items-center justify-center rounded-xl bg-[#DC2626] font-semibold text-white transition hover:bg-red-700"
          >
            Continue Shopping
          </Link>

        </section>

      </div>

    </div>

  </div>
);
}