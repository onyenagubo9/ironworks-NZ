import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import InventoryHeader from "@/components/admin/inventory/InventoryHeader";
import InventoryToolbar from "@/components/admin/inventory/InventoryToolbar";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

interface InventoryPageProps {
  searchParams: Promise<{
    search?: string;
    stock?: string;
    page?: string;
  }>;
}

export default async function InventoryPage({
  searchParams,
}: InventoryPageProps) {
  const {
    search,
    stock,
    page,
  } = await searchParams;

  const currentPage = Number(page) || 1;

  const pageSize = 10;

  const skip =
    (currentPage - 1) * pageSize;

  const where: Prisma.ProductWhereInput =
    {};

  // Search

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        sku: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Stock Filter

  if (stock === "out") {
    where.inventory = {
      quantity: 0,
    };
  }

  if (stock === "low") {
    where.inventory = {
      quantity: {
        lte: 5,
      },
    };
  }

  if (stock === "in") {
    where.inventory = {
      quantity: {
        gt: 5,
      },
    };
  }

  const totalProducts =
    await prisma.product.count({
      where,
    });

  const products =
    await prisma.product.findMany({
      where,

      skip,

      take: pageSize,

      include: {
        category: true,

        inventory: true,

        images: {
          where: {
            isCover: true,
          },
          take: 1,
        },
      },

      orderBy: {
        name: "asc",
      },
    });

  return (
    <div className="space-y-6">

      <InventoryHeader />

      <InventoryToolbar />

      <InventoryTable
        products={products}
        currentPage={currentPage}
        totalProducts={totalProducts}
        pageSize={pageSize}
      />

    </div>
  );
}