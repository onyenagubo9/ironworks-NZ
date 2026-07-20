import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import BrandHeader from "@/components/admin/brands/BrandHeader";
import BrandToolbar from "@/components/admin/brands/BrandToolbar";
import BrandTable from "@/components/admin/brands/BrandTable";

interface BrandsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    featured?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function BrandsPage({
  searchParams,
}: BrandsPageProps) {
  const {
    search,
    status,
    featured,
    sort,
    page,
  } = await searchParams;

  const currentPage = Math.max(
    Number(page) || 1,
    1
  );

  const pageSize = 10;

  const skip = (currentPage - 1) * pageSize;

  const where: Prisma.BrandWhereInput = {};

  // -----------------------------
  // Search
  // -----------------------------

  if (search?.trim()) {
    where.OR = [
      {
        name: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
      {
        website: {
          contains: search.trim(),
          mode: "insensitive",
        },
      },
    ];
  }

  // -----------------------------
  // Status
  // -----------------------------

  if (status === "active") {
    where.isActive = true;
  } else if (status === "hidden") {
    where.isActive = false;
  }

  // -----------------------------
  // Featured
  // -----------------------------

  if (featured === "true") {
    where.featured = true;
  } else if (featured === "false") {
    where.featured = false;
  }

  // -----------------------------
  // Sorting
  // -----------------------------

  let orderBy: Prisma.BrandOrderByWithRelationInput;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "name-asc":
      orderBy = {
        name: "asc",
      };
      break;

    case "name-desc":
      orderBy = {
        name: "desc",
      };
      break;

    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const totalBrands =
    await prisma.brand.count({
      where,
    });

  const brands =
    await prisma.brand.findMany({
      where,

      skip,

      take: pageSize,

      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },

      orderBy,
    });

  return (
    <div className="space-y-6">
      <BrandHeader />

      <BrandToolbar />

      <BrandTable
        brands={brands}
        currentPage={currentPage}
        totalBrands={totalBrands}
        pageSize={pageSize}
      />
    </div>
  );
}