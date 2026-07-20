import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id,
      customerId: session.user.id,
    },
    include: {
      customer: true,

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

      payment: true,

      bankAccount: true,

      coupon: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Order Details
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#0F172A]">
            {order.orderNumber}
          </h1>

          <p className="mt-2 text-gray-600">
            Created on{" "}
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        <Link
          href="/orders"
          className="rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100"
        >
          Back to Orders
        </Link>

      </div>

      {/* Status Cards */}

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Package className="text-[#DC2626]" />

            <div>

              <p className="text-sm text-gray-500">
                Order Status
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0F172A]">
                {order.status}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <CreditCard className="text-[#DC2626]" />

            <div>

              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0F172A]">
                {order.paymentStatus}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Truck className="text-[#DC2626]" />

            <div>

              <p className="text-sm text-gray-500">
                Delivery Method
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0F172A]">
                {order.deliveryMethod ??
                  "Standard"}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">

        {/* Left Column */}

        <div className="space-y-8 lg:col-span-2">

          {/* Shipping Address */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <MapPin className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Shipping Address
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingFirstName}{" "}
                  {order.shippingLastName}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingPhone}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Country
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingCountry}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  State
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingState}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  City
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingCity}
                </p>

              </div>

              {order.shippingSuburb && (

                <div>

                  <p className="text-sm text-gray-500">
                    Suburb
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.shippingSuburb}
                  </p>

                </div>

              )}

              <div className="md:col-span-2">

                <p className="text-sm text-gray-500">
                  Address
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingAddress1}
                </p>

                {order.shippingAddress2 && (

                  <p className="text-gray-600">
                    {order.shippingAddress2}
                  </p>

                )}

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Postal Code
                </p>

                <p className="mt-1 font-semibold">
                  {order.shippingPostalCode}
                </p>

              </div>

            </div>

          </section>

          {/* Billing Address */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <MapPin className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Billing Address
              </h2>

            </div>

            {order.billingFirstName ? (

              <div className="grid gap-6 md:grid-cols-2">

                <div>

                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingFirstName}{" "}
                    {order.billingLastName}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingPhone}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Country
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingCountry}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    State
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingState}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    City
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingCity}
                  </p>

                </div>

                {order.billingSuburb && (

                  <div>

                    <p className="text-sm text-gray-500">
                      Suburb
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.billingSuburb}
                    </p>

                  </div>

                )}

                <div className="md:col-span-2">

                  <p className="text-sm text-gray-500">
                    Address
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingAddress1}
                  </p>

                  {order.billingAddress2 && (

                    <p className="text-gray-600">
                      {order.billingAddress2}
                    </p>

                  )}

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Postal Code
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.billingPostalCode}
                  </p>

                </div>

              </div>

            ) : (

              <div className="rounded-xl bg-green-50 p-5">

                <p className="font-medium text-green-700">
                  Billing address is the same as the shipping address.
                </p>

              </div>

            )}

          </section>

          {/* Payment Information */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <CreditCard className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Payment Information
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 font-semibold">
                  {order.paymentMethod ?? "Bank Transfer"}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Payment Status
                </p>

                <p className="mt-1 font-semibold">
                  {order.paymentStatus}
                </p>

              </div>

              {order.bankAccount && (

                <>
                  <div>

                    <p className="text-sm text-gray-500">
                      Bank
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.bankName}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Account Number
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.accountNumber}
                    </p>

                  </div>
                </>

              )}

            </div>

          </section>

          {/* Order Items */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <Package className="text-[#DC2626]" />

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Ordered Products
              </h2>

            </div>

            <div className="space-y-5">

              {order.items.map((item) => {

                const image =
                  item.product.images[0]?.imageUrl;

                return (

                  <div
                    key={item.id}
                    className="flex items-center gap-5 rounded-xl border border-gray-200 p-5"
                  >

                    <div className="relative h-24 w-24 overflow-hidden rounded-xl border bg-gray-50">

                      {image ? (

                        <Image
                          src={image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-gray-400">

                          <Package size={32} />

                        </div>

                      )}

                    </div>

                    <div className="flex-1">

                      <h3 className="text-lg font-semibold text-[#0F172A]">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        SKU: {item.productSku}
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-sm text-gray-500">
                        Unit Price
                      </p>

                      <p className="font-semibold">
                        NZ$
                        {Number(
                          item.unitPrice
                        ).toFixed(2)}
                      </p>

                      <p className="mt-3 text-lg font-bold text-[#DC2626]">
                        NZ$
                        {Number(
                          item.totalPrice
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                );
              })}

            </div>

          </section>

          {/* Order Summary */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  NZ$
                  {Number(
                    order.subtotal
                  ).toFixed(2)}
                </span>

              </div>

              {Number(order.discount) > 0 && (

                <div className="flex justify-between text-green-600">

                  <span>

                    Discount

                    {order.coupon && (
                      <> ({order.coupon.code})</>
                    )}

                  </span>

                  <span>
                    -NZ$
                    {Number(
                      order.discount
                    ).toFixed(2)}
                  </span>

                </div>

              )}

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-semibold">
                  NZ$
                  {Number(
                    order.shippingCost
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
                    order.tax
                  ).toFixed(2)}
                </span>

              </div>

              <div className="border-t pt-5">

                <div className="flex justify-between">

                  <span className="text-xl font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#DC2626]">
                    NZ$
                    {Number(
                      order.total
                    ).toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* Customer Notes */}

          {order.notes && (
            <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Customer Notes
              </h2>

              <p className="mt-5 whitespace-pre-wrap text-gray-700">
                {order.notes}
              </p>

            </section>
          )}

        </div>

        {/* Right Sidebar */}

        <div className="space-y-8">

          {/* Payment Receipt */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Payment Receipt
            </h2>

            {order.payment?.receiptUrl ? (

              <div className="mt-6 space-y-5">

                <a
                  href={order.payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl border"
                >

                  {order.payment.receiptUrl.endsWith(".pdf") ? (

                    <div className="flex h-48 items-center justify-center bg-gray-100">

                      <p className="font-semibold">
                        View Uploaded PDF
                      </p>

                    </div>

                  ) : (

                    <div className="relative h-48 w-full">
                      <Image
                        src={order.payment.receiptUrl}
                        alt="Payment Receipt"
                        fill
                        className="rounded-xl object-cover"
                      />
                    </div>

                  )}

                </a>

                <a
                  href={order.payment.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-[#DC2626] px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                >
                  View Receipt
                </a>

              </div>

            ) : (

              <div className="mt-6">

                <p className="mb-5 text-gray-600">
                  You haven&apos;t uploaded your
                  payment receipt yet.
                </p>

                <Link
                  href={`/orders/${order.id}/upload`}
                  className="block rounded-xl bg-[#DC2626] px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                >
                  Upload Receipt
                </Link>

              </div>

            )}

          </section>

          {/* Tracking */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Tracking
            </h2>

            <div className="mt-6">

              {order.trackingNumber ? (

                <>

                  <p className="text-sm text-gray-500">
                    Tracking Number
                  </p>

                  <p className="mt-2 break-all text-lg font-bold">
                    {order.trackingNumber}
                  </p>

                </>

              ) : (

                <p className="text-gray-600">
                  Your order has not yet been
                  shipped. Tracking information
                  will appear here once your
                  order is dispatched.
                </p>

              )}

            </div>

          </section>

          {/* Payment Summary */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Payment Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">

                <span>Total Paid</span>

                <span className="font-bold">
                  NZ${Number(order.total).toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Status</span>

                <span className="font-semibold">
                  {order.paymentStatus}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Method</span>

                <span className="font-semibold">
                  {order.paymentMethod ??
                    "Bank Transfer"}
                </span>

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}