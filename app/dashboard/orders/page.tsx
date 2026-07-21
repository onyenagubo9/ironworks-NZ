import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Eye,
  Package,
  Search,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      customerId: session.user.id,
    },
    include: {
      items: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Customer Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#0F172A]">
            My Orders
          </h1>

          <p className="mt-3 text-gray-600">
            Track your orders and payment status.
          </p>

        </div>

        <Link
          href="/shop"
          className="rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Continue Shopping
        </Link>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {totalOrders}
              </h2>

            </div>

            <div className="rounded-xl bg-blue-100 p-4 text-blue-600">

              <ShoppingBag size={28} />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {pendingOrders}
              </h2>

            </div>

            <div className="rounded-xl bg-yellow-100 p-4 text-yellow-600">

              <Clock size={28} />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Delivered
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {completedOrders}
              </h2>

            </div>

            <div className="rounded-xl bg-green-100 p-4 text-green-600">

              <CheckCircle2 size={28} />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">
                Total Spent
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                NZ$
                {totalSpent.toFixed(2)}
              </h2>

            </div>

            <div className="rounded-xl bg-[#FEE2E2] p-4 text-[#DC2626]">

              <Package size={28} />

            </div>

          </div>

        </div>

      </div>

            {/* Orders */}

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Toolbar */}

        <div className="flex flex-col gap-4 border-b border-gray-200 p-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full max-w-md">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders..."
              disabled
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                bg-gray-50
                py-3
                pl-11
                pr-4
                text-sm
                outline-none
              "
            />

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              className="rounded-xl bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white"
            >
              All Orders
            </button>

            <button
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
            >
              Pending
            </button>

            <button
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
            >
              Processing
            </button>

            <button
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
            >
              Delivered
            </button>

          </div>

        </div>

        {/* Orders Table */}

        {orders.length === 0 ? (

          <div className="flex flex-col items-center justify-center px-8 py-20">

            <ShoppingBag
              size={64}
              className="text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-bold text-[#0F172A]">
              No Orders Yet
            </h2>

            <p className="mt-3 max-w-md text-center text-gray-600">
              You haven't placed any orders yet.
              Once you make a purchase, your
              orders will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-8 rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                                {orders.map((order) => {

                  const statusColors = {
                    PENDING:
                      "bg-yellow-100 text-yellow-700",
                    CONFIRMED:
                      "bg-blue-100 text-blue-700",
                    PROCESSING:
                      "bg-purple-100 text-purple-700",
                    SHIPPED:
                      "bg-indigo-100 text-indigo-700",
                    DELIVERED:
                      "bg-green-100 text-green-700",
                    CANCELLED:
                      "bg-red-100 text-red-700",
                    REFUNDED:
                      "bg-gray-200 text-gray-700",
                  };

                  const paymentColors = {
                    PENDING:
                      "bg-yellow-100 text-yellow-700",
                    PAID:
                      "bg-green-100 text-green-700",
                    FAILED:
                      "bg-red-100 text-red-700",
                    REFUNDED:
                      "bg-gray-200 text-gray-700",
                  };

                  return (

                    <tr
                      key={order.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >

                      {/* Order Number */}

                      <td className="px-6 py-6">

                        <div>

                          <p className="font-bold text-[#0F172A]">

                            {order.orderNumber}

                          </p>

                          <p className="mt-1 text-sm text-gray-500">

                            #{order.id.slice(0, 8)}

                          </p>

                        </div>

                      </td>

                      {/* Date */}

                      <td className="px-6 py-6">

                        <div>

                          <p className="font-medium">

                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}

                          </p>

                          <p className="text-sm text-gray-500">

                            {new Date(
                              order.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}

                          </p>

                        </div>

                      </td>

                      {/* Items */}

                      <td className="px-6 py-6">

                        <span className="font-semibold">

                          {order.items.length}

                        </span>

                      </td>

                      {/* Order Status */}

                      <td className="px-6 py-6">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            statusColors[
                              order.status
                            ]
                          }`}
                        >

                          {order.status}

                        </span>

                      </td>

                      {/* Payment */}

                      <td className="px-6 py-6">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            paymentColors[
                              order.paymentStatus
                            ]
                          }`}
                        >

                          {order.paymentStatus}

                        </span>

                      </td>

                      {/* Total */}

                      <td className="px-6 py-6 text-right">

                        <p className="text-lg font-bold text-[#DC2626]">

                          NZ$
                          {Number(
                            order.total
                          ).toFixed(2)}

                        </p>

                      </td>

                      {/* Action */}

                      <td className="px-6 py-6 text-center">

                        <Link
                          href={`/orders/${order.id}`}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#DC2626]
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                          "
                        >

                          <Eye size={18} />

                          View

                        </Link>

                      </td>

                    </tr>

                  );

                })}
                              </tbody>

            </table>

          </div>

        )}

        {/* Footer */}

        {orders.length > 0 && (

          <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-6 py-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="font-semibold text-[#0F172A]">

                Showing
                {" "}
                {orders.length}
                {" "}
                order{orders.length !== 1 ? "s" : ""}

              </p>

              <p className="text-sm text-gray-500">

                Your complete purchase history
                is displayed above.

              </p>

            </div>

            <div className="flex items-center gap-4">

              <Link
                href="/shop"
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-3
                  font-semibold
                  transition
                  hover:bg-gray-100
                "
              >
                Continue Shopping
              </Link>

              <Link
                href="/dashboard"
                className="
                  rounded-xl
                  bg-[#DC2626]
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                "
              >
                Back to Dashboard
              </Link>

            </div>

          </div>

        )}

      </section>

      {/* Information Card */}

      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-8">

        <h2 className="text-2xl font-bold text-[#0F172A]">
          Need Help With an Order?
        </h2>

        <p className="mt-4 max-w-3xl leading-7 text-gray-700">

          You can click
          {" "}
          <span className="font-semibold">
            View
          </span>
          {" "}
          to see the complete order details,
          payment information, uploaded receipt,
          shipping address and tracking updates.

        </p>

        <div className="mt-6 flex flex-wrap gap-4">

          <Link
            href="/contact"
            className="
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
            Contact Support
          </Link>

          <Link
            href="/shop"
            className="
              rounded-xl
              border
              border-gray-300
              px-6
              py-3
              font-semibold
              transition
              hover:bg-gray-100
            "
          >
            Continue Shopping
          </Link>

        </div>

      </section>

    </div>

  );

}