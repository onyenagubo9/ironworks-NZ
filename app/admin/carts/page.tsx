import Link from "next/link";

import {
  ShoppingCart,
  Users,
  DollarSign,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Shopping Carts",
};

export default async function AdminCartsPage() {
  const carts = await prisma.cart.findMany({
    include: {
      user: true,

      items: {
        include: {
          product: {
            include: {
              images: {
                where: {
                  isCover: true,
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },
  });

  const totalCarts = carts.length;

  const totalCustomers = new Set(
    carts.map((cart) => cart.userId)
  ).size;

  const totalItems = carts.reduce(
    (total, cart) =>
      total +
      cart.items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
    0
  );

  const totalValue = carts.reduce(
    (total, cart) =>
      total +
      cart.items.reduce(
        (sum, item) =>
          sum +
          Number(
            item.product.price
          ) *
            item.quantity,
        0
      ),
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Shopping Carts

          </h1>

          <p className="mt-2 text-slate-500">

            Monitor active customer carts across your store.

          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Active Carts

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {totalCarts}

              </h2>

            </div>

            <div className="rounded-xl bg-blue-100 p-3">

              <ShoppingCart
                className="text-blue-600"
                size={28}
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Customers

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {totalCustomers}

              </h2>

            </div>

            <div className="rounded-xl bg-green-100 p-3">

              <Users
                className="text-green-600"
                size={28}
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Cart Items

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {totalItems}

              </h2>

            </div>

            <div className="rounded-xl bg-orange-100 p-3">

              <ShoppingCart
                className="text-orange-600"
                size={28}
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Cart Value

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                $
                {totalValue.toFixed(2)}

              </h2>

            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <DollarSign
                className="text-red-600"
                size={28}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            className="
              h-12
              w-full
              rounded-xl
              border
              border-slate-200
              pl-12
              pr-4
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

      </div>

      {/* Table */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">

                  Customer

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Items

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Total

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Last Updated

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Status

                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {carts.map((cart) => {

                const itemCount =
                  cart.items.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  );

                const cartTotal =
                  cart.items.reduce(
                    (sum, item) =>
                      sum +
                      Number(
                        item.product.price
                      ) *
                        item.quantity,
                    0
                  );

                return (

                  <tr
                    key={cart.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Customer */}
<td className="px-6 py-5">

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">

      {cart.user
        ? `${cart.user.firstName.charAt(0)}${cart.user.lastName.charAt(0)}`
        : "G"}

    </div>

    <div>

      {cart.user ? (

        <>

          <h3 className="font-semibold text-slate-900">

            {cart.user.firstName} {cart.user.lastName}

          </h3>

          <p className="text-sm text-slate-500">

            {cart.user.email}

          </p>

        </>

      ) : (

        <>

          <h3 className="font-semibold text-slate-900">

            Guest Customer

          </h3>

          <p className="text-sm text-slate-500">

            Session: {cart.sessionId}

          </p>

        </>

      )}

    </div>

  </div>

</td>
                    {/* Items */}

                    <td className="px-6 py-5 text-center">

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">

                        {itemCount}

                      </span>

                    </td>

                    {/* Total */}

                    <td className="px-6 py-5 text-center font-semibold text-green-600">

                      ${cartTotal.toFixed(2)}

                    </td>

                    {/* Updated */}

                    <td className="px-6 py-5 text-center text-sm text-slate-500">

                      {new Date(
                        cart.updatedAt
                      ).toLocaleString()}

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        Active

                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-end gap-2">

                        <Link
                          href={`/admin/carts/${cart.id}`}
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-50
                            text-blue-600
                            transition
                            hover:bg-blue-100
                          "
                        >

                          <Eye size={18} />

                        </Link>

                        <button
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-red-50
                            text-red-600
                            transition
                            hover:bg-red-100
                          "
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })}

                          </tbody>

          </table>

        </div>

        {/* Empty State */}

        {carts.length === 0 && (

          <div className="flex flex-col items-center justify-center px-8 py-24 text-center">

            <div className="rounded-full bg-slate-100 p-6">

              <ShoppingCart
                size={60}
                className="text-slate-400"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">

              No Active Carts

            </h2>

            <p className="mt-3 max-w-md text-slate-500">

              There are currently no customer
              shopping carts available.

            </p>

          </div>

        )}

      </div>

      {/* Summary */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900">

            Active Customers

          </h3>

          <p className="mt-4 text-4xl font-bold text-blue-600">

            {totalCustomers}

          </p>

          <p className="mt-2 text-sm text-slate-500">

            Customers currently have products
            saved in their shopping carts.

          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900">

            Products in Carts

          </h3>

          <p className="mt-4 text-4xl font-bold text-orange-600">

            {totalItems}

          </p>

          <p className="mt-2 text-sm text-slate-500">

            Total quantity of products across
            all active shopping carts.

          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h3 className="text-lg font-semibold text-slate-900">

            Estimated Cart Value

          </h3>

          <p className="mt-4 text-4xl font-bold text-green-600">

            ${totalValue.toFixed(2)}

          </p>

          <p className="mt-2 text-sm text-slate-500">

            Combined value of all active
            shopping carts.

          </p>

        </div>

      </div>
            {/* Footer */}

      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-900">

            Shopping Cart Overview

          </h3>

          <p className="mt-1 text-sm text-slate-500">

            Showing {carts.length} active
            shopping cart
            {carts.length !== 1 ? "s" : ""}.

          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >

            Refresh

          </button>

          <button
            type="button"
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >

            Export CSV

          </button>

        </div>

      </div>

      {/* Pagination */}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

        <p className="text-sm text-slate-500">

          Showing all {carts.length} active
          shopping carts.

        </p>

        <div className="flex items-center gap-2">

          <button
            disabled
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              text-slate-400
              disabled:cursor-not-allowed
            "
          >

            Previous

          </button>

          <button
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
            "
          >

            1

          </button>

          <button
            disabled
            className="
              rounded-lg
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              text-slate-400
              disabled:cursor-not-allowed
            "
          >

            Next

          </button>

        </div>

      </div>

    </div>

  );
}