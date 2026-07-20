import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

import { prisma } from "@/lib/prisma";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({
  params,
}: OrderPageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      customer: true,

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

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/admin/orders"
            className="mb-4 inline-flex items-center gap-2 text-gray-500 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>

          <h1 className="text-4xl font-bold text-[#0F172A]">
            Order #{order.orderNumber}
          </h1>

          <p className="mt-2 text-gray-500">
            Created {order.createdAt.toLocaleDateString()}
          </p>

        </div>

        <Link
          href={`/admin/orders/${order.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          <Pencil size={18} />
          Edit Order
        </Link>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-8 lg:col-span-2">

          {/* Customer */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-semibold">
              Customer
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold">
                  {order.customer.email}
                </p>

              </div>

            </div>

          </section>

          {/* Products */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-2xl font-semibold">
              Products
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="py-3 text-left">
                      Product
                    </th>

                    <th className="py-3 text-center">
                      Qty
                    </th>

                    <th className="py-3 text-center">
                      Price
                    </th>

                    <th className="py-3 text-right">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {order.items.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-4">
                {item.productImage ? (
                    <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-14 w-14 rounded-lg border object-cover"
                    />
                ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">
                    No Image
                    </div>
                )}

                <div>
                    <p className="font-semibold">
                    {item.productName}
                    </p>

                    <p className="text-sm text-gray-500">
                    {item.productSku}
                    </p>
                </div>
                </div>
                      </td>

                      <td className="text-center">

                        {item.quantity}

                      </td>

                     <td className="text-center">
                $
                {Number(item.unitPrice).toLocaleString()}
                </td>

                <td className="text-right font-semibold">
                $
                {Number(item.totalPrice).toLocaleString()}
                </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* Order */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Order
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Status</span>

                <span className="font-semibold">
                  {order.status}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Payment</span>

                <span className="font-semibold">
                  {order.paymentStatus}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Total</span>

                <span className="font-bold">
                  $
                  {Number(
                    order.total
                  ).toLocaleString()}
                </span>

              </div>

            </div>

          </section>

          {/* Payment */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Payment
            </h2>

            {order.payment ? (

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Method</span>

                  <span className="font-semibold">
                    {order.payment.method}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Status</span>

                  <span className="font-semibold">
                    {order.payment.status}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Amount</span>

                  <span className="font-semibold">
                    $
                    {Number(
                      order.payment.amount
                    ).toLocaleString()}
                  </span>

                </div>

                {order.payment.receiptUrl && (

                  <Link
                    href={
                      order.payment
                        .receiptUrl
                    }
                    target="_blank"
                    className="mt-4 block rounded-lg bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    View Receipt
                  </Link>

                )}

              </div>

            ) : (

              <p className="text-gray-500">
                No payment information.
              </p>

            )}

          </section>

          {/* Timeline */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Activity
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Created</span>

                <span>
                  {order.createdAt.toLocaleDateString()}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Updated</span>

                <span>
                  {order.updatedAt.toLocaleDateString()}
                </span>

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}