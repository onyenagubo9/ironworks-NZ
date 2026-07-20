import { prisma } from "@/lib/prisma";

import ProductForm from "@/components/admin/products/form/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  const brands = await prisma.brand.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#0F172A]">
          Add Product
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm
        categories={categories}
        brands={brands}
      />
    </div>
  );
}