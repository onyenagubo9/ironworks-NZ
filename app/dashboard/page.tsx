import { redirect } from "next/navigation";
import Link from "next/link";

import {
  ArrowRight,
  Heart,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const [
    totalOrders,
    pendingOrders,
    wishlistCount,
    addressCount,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        customerId: session.user.id,
      },
    }),

    prisma.order.count({
      where: {
        customerId: session.user.id,
        status: "PENDING",
      },
    }),

    prisma.wishlist.count({
      where: {
        userId: session.user.id,
      },
    }),

    prisma.address.count({
      where: {
        userId: session.user.id,
      },
    }),

    prisma.order.findMany({
      where: {
        customerId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Package,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Wishlist",
      value: wishlistCount,
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Saved Addresses",
      value: addressCount,
      icon: MapPin,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-10">

      {/* Welcome Banner */}

      <section className="rounded-3xl bg-linear-to-r from-[#DC2626] to-red-700 p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Welcome back,
          {" "}
          {session.user.firstName}
          👋
        </h1>

        <p className="mt-4 max-w-2xl text-red-100">
          Manage your orders, addresses,
          wishlist and account settings from
          one convenient dashboard.
        </p>

      </section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (

            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
                    {stat.value}
                  </h2>

                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.color}`}
                >

                  <Icon size={28} />

                </div>

              </div>

            </div>

          );

        })}

      </section>
            {/* Dashboard Grid */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Column */}

        <div className="space-y-8 lg:col-span-2">

          {/* Quick Actions */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Quick Actions
              </h2>

              <ArrowRight className="text-gray-400" />

            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <Link
                href="/shop"
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  p-6
                  transition
                  hover:border-[#DC2626]
                  hover:bg-red-50
                "
              >

                <ShoppingCart
                  size={34}
                  className="text-[#DC2626]"
                />

                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                  Continue Shopping
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Browse our latest products
                  and special offers.
                </p>

              </Link>

              <Link
                href="/dashboard/orders"
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  p-6
                  transition
                  hover:border-[#DC2626]
                  hover:bg-red-50
                "
              >

                <Package
                  size={34}
                  className="text-[#DC2626]"
                />

                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                  View Orders
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Track the progress of your
                  recent purchases.
                </p>

              </Link>

              <Link
                href="/dashboard/wishlist"
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  p-6
                  transition
                  hover:border-[#DC2626]
                  hover:bg-red-50
                "
              >

                <Heart
                  size={34}
                  className="text-[#DC2626]"
                />

                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                  Wishlist
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  View and manage your saved
                  favourite products.
                </p>

              </Link>

              <Link
                href="/dashboard/addresses"
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  p-6
                  transition
                  hover:border-[#DC2626]
                  hover:bg-red-50
                "
              >

                <MapPin
                  size={34}
                  className="text-[#DC2626]"
                />

                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                  Addresses
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  Update your shipping and
                  billing addresses.
                </p>

              </Link>

            </div>

          </section>

          {/* Recent Orders */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-[#0F172A]">
                Recent Orders
              </h2>

              <Link
                href="/dashboard/orders"
                className="font-semibold text-[#DC2626] hover:underline"
              >
                View All
              </Link>

            </div>

            {recentOrders.length === 0 ? (

              <div className="rounded-xl bg-gray-50 p-10 text-center">

                <Package
                  size={48}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-5 text-xl font-bold text-[#0F172A]">
                  No Orders Yet
                </h3>

                <p className="mt-3 text-gray-600">
                  Start shopping to see your
                  orders here.
                </p>

                <Link
                  href="/shop"
                  className="mt-6 inline-flex rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                  Shop Now
                </Link>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="pb-4 text-left text-sm font-semibold text-gray-500">
                        Order
                      </th>

                      <th className="pb-4 text-left text-sm font-semibold text-gray-500">
                        Date
                      </th>

                      <th className="pb-4 text-left text-sm font-semibold text-gray-500">
                        Status
                      </th>

                      <th className="pb-4 text-right text-sm font-semibold text-gray-500">
                        Total
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {recentOrders.map((order) => (

                      <tr
                        key={order.id}
                        className="border-b last:border-0"
                      >

                        <td className="py-5 font-semibold text-[#0F172A]">
                          {order.orderNumber}
                        </td>

                        <td className="py-5 text-gray-600">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-5">

                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                            {order.status}

                          </span>

                        </td>

                        <td className="py-5 text-right font-bold text-[#DC2626]">

                          NZ$
                          {Number(
                            order.total
                          ).toFixed(2)}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </section>

                  </div>

        {/* Right Sidebar */}

        <div className="space-y-8">

          {/* Account Overview */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Account Overview
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Customer Name
                </span>

                <span className="font-semibold text-[#0F172A]">

                  {session.user.firstName}{" "}
                  {session.user.lastName}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Email
                </span>

                <span className="font-semibold text-[#0F172A]">

                  {session.user.email}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Account Type
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                  {session.user.role}

                </span>

              </div>

            </div>

          </section>

          {/* Profile Completion */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Profile Completion
            </h2>

            <div className="mt-8">

              <div className="mb-3 flex justify-between">

                <span className="text-gray-600">
                  Completion
                </span>

                <span className="font-bold text-[#DC2626]">
                  80%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                <div className="h-full w-4/5 rounded-full bg-[#DC2626]" />

              </div>

              <p className="mt-5 text-sm leading-6 text-gray-600">
                Complete your profile and add
                your shipping address to enjoy a
                faster checkout experience.
              </p>

              <Link
                href="/dashboard/profile"
                className="mt-6 inline-flex rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Complete Profile
              </Link>

            </div>

          </section>

          {/* Quick Summary */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Quick Summary
            </h2>

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Orders
                </span>

                <span className="font-bold">
                  {totalOrders}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Pending
                </span>

                <span className="font-bold text-yellow-600">
                  {pendingOrders}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Wishlist
                </span>

                <span className="font-bold text-pink-600">
                  {wishlistCount}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Addresses
                </span>

                <span className="font-bold text-green-600">
                  {addressCount}
                </span>

              </div>

            </div>

          </section>

          {/* Recent Activity */}

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-8">

            <h2 className="text-xl font-bold text-[#0F172A]">
              Recent Activity
            </h2>

            <div className="mt-6 space-y-5">

              <div>

                <p className="font-semibold">
                  Account Created
                </p>

                <p className="text-sm text-gray-600">
                  Welcome to GlobalTrust.
                </p>

              </div>

              <div>

                <p className="font-semibold">
                  Dashboard Ready
                </p>

                <p className="text-sm text-gray-600">
                  Manage your orders, addresses,
                  wishlist and profile from here.
                </p>

              </div>

            </div>

          </section>

        </div>

      </div>

            {/* Customer Tips */}

      <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

          <div>

            <h2 className="text-3xl font-bold text-[#0F172A]">
              Get More From Your Account
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              Keep your profile information updated,
              save multiple delivery addresses, create
              wishlists, and monitor every order from
              one secure dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <Link
              href="/dashboard/profile"
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
              Edit Profile
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

        </div>

      </section>

    </div>
  );
}