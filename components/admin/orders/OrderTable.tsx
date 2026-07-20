import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
  Eye,
  Pencil,
} from "lucide-react";

import OrderStatus from "./OrderStatus";
import PaymentStatus from "./PaymentStatus";
import DeleteOrderDialog from "./DeleteOrderDialog";

interface OrderTableProps {
  orders: {
    id: string;
    orderNumber: string;

    status:
      | "PENDING"
      | "CONFIRMED"
      | "PROCESSING"
      | "SHIPPED"
      | "DELIVERED"
      | "CANCELLED"
      | "REFUNDED";

    paymentStatus:
      | "PENDING"
      | "PAID"
      | "FAILED"
      | "REFUNDED";

    total: Prisma.Decimal;

    createdAt: Date;

    customer: {
      firstName: string;
      lastName: string;
      email: string;
    };

    items: {
      id: string;
    }[];

    payment: {
      id: string;
    } | null;
  }[];

  currentPage: number;

  totalOrders: number;

  pageSize: number;
}

export default function OrderTable({
  orders,
  currentPage,
  totalOrders,
  pageSize,
}: OrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex h-112.5 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">

        <h2 className="text-2xl font-bold text-[#0F172A]">
          No Orders Found
        </h2>

        <p className="mt-3 text-gray-500">
          Orders will appear here after customers place them.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Items
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Total
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Payment
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t transition hover:bg-gray-50"
              >

                {/* Order */}

                <td className="px-6 py-5">

                  <div>

                    <h3 className="font-semibold text-[#0F172A]">
                      #{order.orderNumber}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {order.id.slice(0, 10)}
                    </p>

                  </div>

                </td>

                {/* Customer */}

                <td className="px-6 py-5">

                  <div>

                    <p className="font-semibold">
                      {order.customer.firstName}{" "}
                      {order.customer.lastName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.customer.email}
                    </p>

                  </div>

                </td>

                {/* Items */}

                <td className="px-6 py-5 text-center">

                  {order.items.length}

                </td>

                {/* Total */}

                <td className="px-6 py-5 text-center font-semibold">

                  $
                  {Number(order.total).toLocaleString()}

                </td>

                {/* Payment */}

                <td className="px-6 py-5 text-center">

                  <PaymentStatus
                    status={order.paymentStatus}
                  />

                </td>

                {/* Status */}

                <td className="px-6 py-5 text-center">

                  <OrderStatus
                    status={order.status}
                  />

                </td>

                {/* Date */}

                <td className="px-6 py-5 text-center">

                  {order.createdAt.toLocaleDateString()}

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/admin/orders/${order.id}/edit`}
                      className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                    >
                      <Pencil size={18} />
                    </Link>

                    <DeleteOrderDialog
                      id={order.id}
                      orderNumber={order.orderNumber}
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t px-6 py-4">

        <p className="text-sm text-gray-500">

          Showing{" "}

          <span className="font-semibold">
            {orders.length}
          </span>{" "}

          of{" "}

          <span className="font-semibold">
            {totalOrders}
          </span>{" "}

          orders

        </p>

        <div className="flex items-center gap-2">

          <Link
            href={`?page=${Math.max(
              currentPage - 1,
              1
            )}`}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>

          <span className="rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-semibold text-white">
            {currentPage}
          </span>

          <Link
            href={`?page=${currentPage + 1}`}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              currentPage * pageSize >= totalOrders
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
          >
            Next
          </Link>

        </div>

      </div>

    </div>
  );
}