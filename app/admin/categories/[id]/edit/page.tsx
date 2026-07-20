import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import CategoryForm from "@/components/admin/categories/CategoryForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: Props) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    notFound();
  }

  const parents = await prisma.category.findMany({
    where: {
      id: {
        not: id,
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-500">
          Update category information.
        </p>

      </div>

      <CategoryForm
        mode="edit"
        category={category}
        parents={parents}
      />

    </div>
  );
}