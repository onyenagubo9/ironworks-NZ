import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import BrandForm from "@/components/admin/brands/BrandForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBrandPage({
  params,
}: Props) {
  const { id } = await params;

  const brand = await prisma.brand.findUnique({
    where: {
      id,
    },
  });

  if (!brand) {
    notFound();
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Edit Brand
        </h1>

        <p className="mt-2 text-gray-500">
          Update your brand.
        </p>

      </div>

      <BrandForm
        mode="edit"
        brand={brand}
      />

    </div>
  );
}