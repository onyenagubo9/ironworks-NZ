import BrandForm from "@/components/admin/brands/BrandForm";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#0F172A]">
          Add Brand
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new product brand.
        </p>
      </div>

      <BrandForm mode="create" />
    </div>
  );
}