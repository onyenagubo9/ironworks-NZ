import { notFound } from "next/navigation";

import { getBrand } from "@/actions/brand/get-brand";

import ViewBrandCard from "@/components/admin/brands/ViewBrandCard";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandPage({
  params,
}: Props) {
  const { id } = await params;

  const brand = await getBrand(id);

  if (!brand) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Brand Details
        </h1>

        <p className="mt-2 text-gray-500">
          View brand information.
        </p>

      </div>

      <ViewBrandCard
        brand={brand}
      />

    </div>
  );
}