import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import ProductHeader from "@/components/admin/products/ProductHeader";
import ProductToolbar from "@/components/admin/products/ProductToolbar";
import ProductTable from "@/components/admin/products/ProductTable";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    category?: string;
    brand?: string;
    featured?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const {
    search,
    status,
    category,
    brand,
    featured,
    sort,
    page,
  } = await searchParams;

  const currentPage = Number(page) || 1;

  const pageSize = 10;

  const skip = (currentPage - 1) * pageSize;

  const where: Prisma.ProductWhereInput = {};

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
      {
        slug: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Status

  if (
    status === "ACTIVE" ||
    status === "DRAFT" ||
    status === "ARCHIVED"
  ) {
    where.status = status;
  }

  // Category

  if (category) {
    where.categoryId = category;
  }

  // Brand

  if (brand) {
    where.brandId = brand;
  }

  // Featured

  if (featured === "true") {
    where.featured = true;
  }

  if (featured === "false") {
    where.featured = false;
  }

  // Sorting

  let orderBy: Prisma.ProductOrderByWithRelationInput =
    {
      createdAt: "desc",
    };

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "name":
      orderBy = {
        name: "asc",
      };
      break;

    case "price-low":
      orderBy = {
        price: "asc",
      };
      break;

    case "price-high":
      orderBy = {
        price: "desc",
      };
      break;
  }

  const [
    totalProducts,
    products,
    categories,
    brands,
  ] = await Promise.all([
    prisma.product.count({
      where,
    }),

    prisma.product.findMany({
      where,

      skip,

      take: pageSize,

      include: {
        category: true,

        brand: true,

        inventory: true,

        images: {
          where: {
            isCover: true,
          },

          take: 1,
        },
      },

      orderBy,
    }),

    prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    }),

    prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <div className="space-y-6">

      <ProductHeader />

      <ProductToolbar
        categories={categories}
        brands={brands}
      />

      <ProductTable
        products={products}
        currentPage={currentPage}
        totalProducts={totalProducts}
        pageSize={pageSize}
      />

    </div>
  );
}