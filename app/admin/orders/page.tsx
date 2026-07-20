import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import OrderHeader from "@/components/admin/orders/OrderHeader";
import OrderToolbar from "@/components/admin/orders/OrderToolbar";
import OrderTable from "@/components/admin/orders/OrderTable";

interface OrdersPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    payment?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function OrdersPage({
  searchParams,
}: OrdersPageProps) {
  const {
    search,
    status,
    payment,
    sort,
    page,
  } = await searchParams;

  const currentPage = Number(page) || 1;

  const pageSize = 10;

  const skip = (currentPage - 1) * pageSize;

  const where: Prisma.OrderWhereInput = {};

  // ============================
  // Search
  // ============================

  if (search) {
    where.OR = [
      {
        orderNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        customer: {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        customer: {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
      {
        customer: {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  // ============================
  // Order Status
  // ============================

  if (
    status === "PENDING" ||
    status === "CONFIRMED" ||
    status === "PROCESSING" ||
    status === "SHIPPED" ||
    status === "DELIVERED" ||
    status === "CANCELLED" ||
    status === "REFUNDED"
  ) {
    where.status = status;
  }

  // ============================
  // Payment Status
  // ============================

  if (
    payment === "PENDING" ||
    payment === "PAID" ||
    payment === "FAILED" ||
    payment === "REFUNDED"
  ) {
    where.paymentStatus = payment;
  }

  // ============================
  // Sorting
  // ============================

  let orderBy: Prisma.OrderOrderByWithRelationInput =
    {
      createdAt: "desc",
    };

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "amount-low":
      orderBy = {
        total: "asc",
      };
      break;

    case "amount-high":
      orderBy = {
        total: "desc",
      };
      break;
  }

  const [
    totalOrders,
    orders,
  ] = await Promise.all([
    prisma.order.count({
      where,
    }),

    prisma.order.findMany({
      where,

      skip,

      take: pageSize,

      include: {
        customer: true,

        items: {
          include: {
            product: true,
          },
        },

        payment: true,
      },

      orderBy,
    }),
  ]);

  return (
    <div className="space-y-6">

      <OrderHeader />

      <OrderToolbar />

      <OrderTable
        orders={orders}
        currentPage={currentPage}
        totalOrders={totalOrders}
        pageSize={pageSize}
      />

    </div>
  );
}