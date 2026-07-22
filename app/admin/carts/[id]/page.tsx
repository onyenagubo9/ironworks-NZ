import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ShoppingCart,
  User,
  Calendar,
  Clock,
  Mail,
  Phone,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { id } = await params;

  const cart = await prisma.cart.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!cart) {
    return {
      title: "Cart Not Found",
    };
  }

  return {
    title: `Cart ${cart.id.slice(0, 8)}`,
  };
}

export default async function CartDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const cart = await prisma.cart.findUnique({
    where: {
      id,
    },

    include: {
      user: true,

      items: {
        include: {
          product: {
            include: {
              images: {
                orderBy: {
                  sortOrder: "asc",
                },
              },

              inventory: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    notFound();
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total +
      Number(item.product.price) *
        item.quantity,
    0
  );

  const totalItems = cart.items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <div className="space-y-8">

      {/* Back */}

      <Link
        href="/admin/carts"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={18} />

        Back to Carts
      </Link>

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">

            Shopping Cart Details

          </h1>

          <p className="mt-2 text-slate-500">

            View products currently saved in
            this customer's shopping cart.

          </p>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Total Items

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {totalItems}

              </h2>

            </div>

            <ShoppingCart
              className="text-blue-600"
              size={32}
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Cart Value

              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">

                ${subtotal.toFixed(2)}

              </h2>

            </div>

            <ShoppingCart
              className="text-green-600"
              size={32}
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">

                Products

              </p>

              <h2 className="mt-2 text-3xl font-bold">

                {cart.items.length}

              </h2>

            </div>

            <ShoppingCart
              className="text-orange-600"
              size={32}
            />

          </div>

        </div>

      </div>

      {/* Customer Information */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-xl font-semibold text-slate-900">

          Customer Information

        </h2>

        <div className="grid gap-8 md:grid-cols-2">

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <User
                className="text-blue-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">

                  Customer

                </p>

                <p className="font-semibold">

                  {cart.user
                    ? `${cart.user.firstName} ${cart.user.lastName}`
                    : "Guest Customer"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Mail
                className="text-blue-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">

                  Email

                </p>

                <p>

                  {cart.user?.email ??
                    "N/A"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Phone
                className="text-blue-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">

                  Phone

                </p>

                <p>

                  {cart.user?.phone ??
                    "N/A"}

                </p>

              </div>

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <Calendar
                className="text-green-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">

                  Created

                </p>

                <p>

                  {new Date(
                    cart.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Clock
                className="text-orange-600"
                size={20}
              />

              <div>

                <p className="text-sm text-slate-500">

                  Last Updated

                </p>

                <p>

                  {new Date(
                    cart.updatedAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Cart Items */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">

                  Product

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  SKU

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Stock

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Quantity

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Unit Price

                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">

                  Total

                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {cart.items.map((item) => {

                const coverImage =
                  item.product.images.find(
                    (image) => image.isCover
                  ) ??
                  item.product.images[0];

                const lineTotal =
                  Number(item.product.price) *
                  item.quantity;

                return (

                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Product */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-slate-100">

                          {coverImage ? (

                            <Image
                              src={
                                coverImage.imageUrl
                              }
                              alt={
                                item.product.name
                              }
                              fill
                              className="object-cover"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center text-xs text-slate-400">

                              No Image

                            </div>

                          )}

                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-900">

                            {item.product.name}

                          </h3>

                          <p className="mt-1 text-sm text-slate-500">

                            {item.product.slug}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* SKU */}

                    <td className="px-6 py-5 text-center">

                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium">

                        {item.product.sku}

                      </span>

                    </td>

                    {/* Stock */}

                    <td className="px-6 py-5 text-center">

                      {item.product.inventory ? (

                        item.product.inventory.quantity >
                        0 ? (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                            {item.product.inventory.quantity} Available

                          </span>

                        ) : (

                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">

                            Out of Stock

                          </span>

                        )

                      ) : (

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">

                          Not Tracked

                        </span>

                      )}

                    </td>

                    {/* Quantity */}

                    <td className="px-6 py-5 text-center">

                      <span className="rounded-lg bg-blue-50 px-3 py-1 font-semibold text-blue-700">

                        {item.quantity}

                      </span>

                    </td>

                    {/* Unit Price */}

                    <td className="px-6 py-5 text-center font-medium">

                      $

                      {Number(
                        item.product.price
                      ).toFixed(2)}

                    </td>

                    {/* Line Total */}

                    <td className="px-6 py-5 text-center">

                      <span className="font-bold text-green-600">

                        $

                        {lineTotal.toFixed(2)}

                      </span>

                    </td>

                  </tr>

                );

              })}

                          </tbody>

          </table>

        </div>

        {/* Empty Cart */}

        {cart.items.length === 0 && (

          <div className="flex flex-col items-center justify-center px-8 py-20 text-center">

            <ShoppingCart
              size={70}
              className="text-slate-300"
            />

            <h2 className="mt-6 text-2xl font-bold text-slate-900">

              This Cart is Empty

            </h2>

            <p className="mt-3 max-w-md text-slate-500">

              There are currently no products
              inside this customer's shopping
              cart.

            </p>

          </div>

        )}

      </div>

      {/* Cart Summary */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Summary */}

        <div className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">

            Cart Summary

          </h2>

          <div className="mt-8 space-y-5">

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Products

              </span>

              <span className="font-semibold">

                {cart.items.length}

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Total Quantity

              </span>

              <span className="font-semibold">

                {totalItems}

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-500">

                Cart Value

              </span>

              <span className="font-semibold text-green-600">

                ${subtotal.toFixed(2)}

              </span>

            </div>

            <div className="border-t pt-5">

              <div className="flex items-center justify-between">

                <span className="text-lg font-semibold">

                  Estimated Total

                </span>

                <span className="text-2xl font-bold text-green-600">

                  ${subtotal.toFixed(2)}

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">

            Actions

          </h2>

          <div className="mt-8 space-y-4">

            <button
              type="button"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                bg-red-600
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >

              Empty Cart

            </button>

            <button
              type="button"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-slate-300
                bg-white
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >

              Remove Selected Item

            </button>

            <Link
              href="/admin/carts"
              className="
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >

              Back to Carts

            </Link>

          </div>

        </div>

      </div>

            {/* Footer */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-slate-900">

              Cart Overview

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              Cart ID: {cart.id}

            </p>

          </div>

          <div className="flex items-center gap-6">

            <div className="text-center">

              <p className="text-sm text-slate-500">

                Products

              </p>

              <p className="text-2xl font-bold text-slate-900">

                {cart.items.length}

              </p>

            </div>

            <div className="text-center">

              <p className="text-sm text-slate-500">

                Quantity

              </p>

              <p className="text-2xl font-bold text-blue-600">

                {totalItems}

              </p>

            </div>

            <div className="text-center">

              <p className="text-sm text-slate-500">

                Total

              </p>

              <p className="text-2xl font-bold text-green-600">

                ${subtotal.toFixed(2)}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}