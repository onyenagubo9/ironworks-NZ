import { redirect } from "next/navigation";

import Link from "next/link";

import {
  Package,
  Search,
  ShoppingBag,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;

  const search =
    params?.search?.trim() ?? "";

  const orders =
    await prisma.order.findMany({
      where: {
        customerId: session.user.id,

        ...(search
          ? {
              orderNumber: {
                contains: search,
                mode: "insensitive",
              },
            }
          : {}),
      },

      include: {
        payment: true,

        items: {
          take: 1,

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

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#0F172A]">
            My Orders
          </h1>

          <p className="mt-2 text-gray-600">
            View your orders, payment
            status and uploaded receipts.
          </p>

        </div>

        <Link
          href="/shop"
          className="rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Continue Shopping
        </Link>

      </div>

      {/* Search */}

      <form
        className="mt-10"
        method="GET"
      >
        <div className="relative max-w-lg">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search order number..."
            className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
          />

        </div>

      </form>

      {/* Orders */}

      <div className="mt-10 space-y-6">
                {orders.map((order) => {
          const firstItem =
            order.items[0];

          const image =
            firstItem?.product.images[0]
              ?.imageUrl;

          return (
            <div
              key={order.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="grid gap-6 p-6 lg:grid-cols-[120px_1fr_auto]">

                {/* Product Image */}

                <div className="flex items-center justify-center">

                  <div className="h-28 w-28 overflow-hidden rounded-xl border bg-gray-50">

                    {image ? (

                      <img
                        src={image}
                        alt={
                          firstItem.productName
                        }
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-gray-400">

                        <ShoppingBag
                          size={36}
                        />

                      </div>

                    )}

                  </div>

                </div>

                {/* Order Information */}

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-xl font-bold text-[#0F172A]">
                      {order.orderNumber}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.status ===
                        "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status ===
                            "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : order.status ===
                            "PROCESSING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus ===
                        "PAID"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus ===
                            "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </div>

                  <p className="mt-3 text-gray-600">
                    Ordered on{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-3">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#DC2626]">
                        NZ$
                        {Number(
                          order.total
                        ).toFixed(2)}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Items
                      </p>

                      <p className="mt-1 font-semibold">
                        {order.items.length}
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Receipt
                      </p>

                      <p className="mt-1 font-semibold">
                        {order.payment
                          ?.receiptUrl
                          ? "Uploaded"
                          : "Pending"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Actions */}

                <div className="flex flex-col justify-center gap-3">

                                      <Link
                    href={`/orders/${order.id}`}
                    className="
                      rounded-xl
                      bg-[#DC2626]
                      px-5
                      py-3
                      text-center
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-700
                    "
                  >
                    View Order
                  </Link>

                  {!order.payment?.receiptUrl && (
                    <Link
                      href={`/orders/${order.id}/upload`}
                      className="
                        rounded-xl
                        border
                        border-[#DC2626]
                        px-5
                        py-3
                        text-center
                        font-semibold
                        text-[#DC2626]
                        transition
                        hover:bg-red-50
                      "
                    >
                      Upload Receipt
                    </Link>
                  )}

                </div>

              </div>

            </div>
          );
        })}

                {orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center">

            <Package
              size={64}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-bold text-[#0F172A]">
              No Orders Found
            </h2>

            <p className="mt-3 text-gray-600">
              {search
                ? "No orders matched your search."
                : "You haven't placed any orders yet."}
            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                items-center
                rounded-xl
                bg-[#DC2626]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              Start Shopping
            </Link>

          </div>
        )}

      </div>

    </div>
  );
}