import { notFound } from "next/navigation";

import { getCategory } from "@/actions/category/get-category";

import ViewCategoryCard from "@/components/admin/categories/ViewCategoryCard";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { id } = await params;

  const category = await getCategory(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Category Details
        </h1>

        <p className="mt-2 text-gray-500">
          View category information.
        </p>

      </div>

      <ViewCategoryCard
        category={category}
      />

    </div>
  );
}