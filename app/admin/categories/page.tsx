import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import CategoryHeader from "@/components/admin/categories/CategoryHeader";
import CategoryToolbar from "@/components/admin/categories/CategoryToolbar";
import CategoryTable from "@/components/admin/categories/CategoryTable";

interface CategoriesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    featured?: string;
    sort?: string;
  }>;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const {
    search,
    status,
    featured,
    sort,
  } = await searchParams;

  const where: Prisma.CategoryWhereInput = {};

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
        slug: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  // Status Filter
  if (status === "active") {
    where.isActive = true;
  }

  if (status === "hidden") {
    where.isActive = false;
  }

  // Featured Filter
  if (featured === "true") {
    where.featured = true;
  }

  if (featured === "false") {
    where.featured = false;
  }

  // Sorting
  let orderBy: Prisma.CategoryOrderByWithRelationInput = {
    createdAt: "desc",
  };

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

  const categories = await prisma.category.findMany({
    where,

    include: {
      parent: {
        select: {
          name: true,
        },
      },

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

      <CategoryHeader />

      <CategoryToolbar />

      <CategoryTable
        categories={categories}
      />

    </div>
  );
}