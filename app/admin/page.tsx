import Link from "next/link";

import {
  ArrowRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  OrderStatus,
  PaymentStatus,
  ProductStatus,
  Role,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

export default async function AdminPage() {

  const [
    totalRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    pendingPayments,
    lowStockProducts,
    recentOrders,
    latestCustomers,
  ] = await Promise.all([

    // Total Revenue
    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.PAID,
      },
      _sum: {
        amount: true,
      },
    }),

    // Orders
    prisma.order.count(),

    // Customers
    prisma.user.count({
      where: {
        role: Role.CUSTOMER,
      },
    }),

    // Active Products
    prisma.product.count({
      where: {
        status: ProductStatus.ACTIVE,
      },
    }),

    // Pending Payments
    prisma.payment.count({
      where: {
        status: PaymentStatus.PENDING,
      },
    }),

    // Low Stock Products
    prisma.inventory.findMany({
      where: {
        quantity: {
          lte: 5,
        },
      },

      include: {
        product: true,
      },

      orderBy: {
        quantity: "asc",
      },

      take: 5,
    }),

    // Recent Orders
    prisma.order.findMany({
      take: 8,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        customer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },

        payment: true,
      },
    }),

    // Latest Customers
    prisma.user.findMany({
      where: {
        role: Role.CUSTOMER,
      },

      take: 6,

      orderBy: {
        createdAt: "desc",
      },
    }),

  ]);

  const revenue =
    Number(
      totalRevenue._sum.amount ?? 0
    );

  const processingOrders =
    await prisma.order.count({
      where: {
        status: OrderStatus.PROCESSING,
      },
    });

  return (

    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-[#DC2626]">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#0F172A]">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Monitor sales, customers,
            inventory, payments and orders
            across your ecommerce platform.
          </p>

        </div>

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
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

          Visit Store

          <ArrowRight size={18} />

        </Link>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Revenue */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Revenue
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
                NZ$
                {revenue.toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </h2>

            </div>

            <div className="rounded-2xl bg-green-100 p-4">

              <DollarSign
                size={32}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-sm text-gray-500">
              Successful Payments
            </span>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Live
            </span>

          </div>

        </div>

        {/* Orders */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
                {totalOrders.toLocaleString()}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4">

              <ShoppingCart
                size={32}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-sm text-gray-500">
              Processing Orders
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {processingOrders}
            </span>

          </div>

        </div>

        {/* Customers */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Customers
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
                {totalCustomers.toLocaleString()}
              </h2>

            </div>

            <div className="rounded-2xl bg-purple-100 p-4">

              <Users
                size={32}
                className="text-purple-600"
              />

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-sm text-gray-500">
              Registered Users
            </span>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
              {latestCustomers.length} New
            </span>

          </div>

        </div>

        {/* Products */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Active Products
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
                {totalProducts.toLocaleString()}
              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4">

              <Package
                size={32}
                className="text-[#DC2626]"
              />

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-sm text-gray-500">
              Low Stock Alerts
            </span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-[#DC2626]">
              {lowStockProducts.length}
            </span>

          </div>

        </div>

      </div>

      {/* Dashboard Content */}

      <div className="grid gap-8 xl:grid-cols-3">
                {/* Recent Orders */}

        <section className="xl:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-200 p-6">

            <div>

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest customer orders placed in your store.
              </p>

            </div>

            <Link
              href="/admin/orders"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100"
            >
              View All
            </Link>

          </div>

          {recentOrders.length === 0 ? (

            <div className="flex h-72 items-center justify-center">

              <div className="text-center">

                <ShoppingCart
                  size={48}
                  className="mx-auto text-gray-300"
                />

                <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">
                  No Orders Yet
                </h3>

                <p className="mt-2 text-gray-500">
                  Customer orders will appear here.
                </p>

              </div>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="px-6 py-4"></th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >

                      <td className="px-6 py-5">

                        <div>

                          <p className="font-semibold text-[#0F172A]">
                            {order.orderNumber}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <div>

                          <p className="font-medium text-[#0F172A]">
                            {order.customer.firstName}{" "}
                            {order.customer.lastName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.customer.email}
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-5 font-semibold">
                        NZ$
                        {Number(
                          order.total
                        ).toFixed(2)}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentStatus ===
                            PaymentStatus.PAID
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            order.status ===
                            OrderStatus.DELIVERED
                              ? "bg-green-100 text-green-700"
                              : order.status ===
                                  OrderStatus.SHIPPED
                                ? "bg-blue-100 text-blue-700"
                                : order.status ===
                                    OrderStatus.PROCESSING
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-right">

                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-semibold text-[#DC2626] hover:underline"
                        >
                          View
                        </Link>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* Right Sidebar */}

        <div className="space-y-8">

                    {/* Pending Payments */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-200 p-6">

              <div>

                <h2 className="text-xl font-bold text-[#0F172A]">
                  Pending Payments
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Waiting for payment verification.
                </p>

              </div>

              <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                {pendingPayments}
              </span>

            </div>

            {recentOrders.filter(
              (order) =>
                order.paymentStatus ===
                PaymentStatus.PENDING
            ).length === 0 ? (

              <div className="p-6 text-center text-gray-500">

                No pending payments.

              </div>

            ) : (

              <div className="divide-y divide-gray-100">

                {recentOrders
                  .filter(
                    (order) =>
                      order.paymentStatus ===
                      PaymentStatus.PENDING
                  )
                  .slice(0, 5)
                  .map((order) => (

                    <div
                      key={order.id}
                      className="flex items-center justify-between p-5"
                    >

                      <div>

                        <p className="font-semibold text-[#0F172A]">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {order.customer.firstName}{" "}
                          {order.customer.lastName}
                        </p>

                      </div>

                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-semibold text-[#DC2626] hover:underline"
                      >
                        Review
                      </Link>

                    </div>

                  ))}

              </div>

            )}

          </section>

          {/* Low Stock */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-6">

              <h2 className="text-xl font-bold text-[#0F172A]">
                Low Stock Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Products that need restocking.
              </p>

            </div>

            {lowStockProducts.length === 0 ? (

              <div className="p-6 text-center">

                <p className="text-green-600 font-medium">
                  🎉 Inventory levels look good.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-gray-100">

                {lowStockProducts.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between p-5"
                  >

                    <div>

                      <p className="font-semibold text-[#0F172A]">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        SKU: {item.product.sku}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        item.quantity === 0
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.quantity} left
                    </span>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* Quick Actions */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-6">

              <h2 className="text-xl font-bold text-[#0F172A]">
                Quick Actions
              </h2>

            </div>

            <div className="space-y-3 p-6">

              <Link
                href="/admin/products/create"
                className="block rounded-xl bg-[#DC2626] px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700"
              >
                Add Product
              </Link>

              <Link
                href="/admin/orders"
                className="block rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold transition hover:bg-gray-100"
              >
                Manage Orders
              </Link>

              <Link
                href="/admin/categories"
                className="block rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold transition hover:bg-gray-100"
              >
                Categories
              </Link>

              <Link
                href="/admin/brands"
                className="block rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold transition hover:bg-gray-100"
              >
                Brands
              </Link>

            </div>

          </section>

        </div>

      </div>
            {/* Bottom Section */}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">

        {/* Latest Customers */}

        <section className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-200 p-6">

            <div>

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Latest Customers
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recently registered customers.
              </p>

            </div>

            <Link
              href="/admin/customers"
              className="font-semibold text-[#DC2626] hover:underline"
            >
              View All
            </Link>

          </div>

          {latestCustomers.length === 0 ? (

            <div className="flex h-56 items-center justify-center">

              <div className="text-center">

                <Users
                  size={48}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-gray-500">
                  No customers found.
                </p>

              </div>

            </div>

          ) : (

            <div className="divide-y divide-gray-100">

              {latestCustomers.map((customer) => (

                <div
                  key={customer.id}
                  className="flex items-center justify-between p-6"
                >

                  <div>

                    <h3 className="font-semibold text-[#0F172A]">
                      {customer.firstName}{" "}
                      {customer.lastName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {customer.email}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      Joined{" "}
                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Active
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Store Overview */}

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 p-6">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Store Overview
            </h2>

          </div>

          <div className="space-y-5 p-6">

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Active Products
              </span>

              <span className="font-bold">
                {totalProducts}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Customers
              </span>

              <span className="font-bold">
                {totalCustomers}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Orders
              </span>

              <span className="font-bold">
                {totalOrders}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Pending Payments
              </span>

              <span className="font-bold text-yellow-600">
                {pendingPayments}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-gray-600">
                Low Stock
              </span>

              <span className="font-bold text-red-600">
                {lowStockProducts.length}
              </span>

            </div>

            <div className="border-t pt-5">

              <div className="flex items-center justify-between">

                <span className="text-lg font-semibold">
                  Revenue
                </span>

                <span className="text-2xl font-bold text-[#DC2626]">
                  NZ$
                  {revenue.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}