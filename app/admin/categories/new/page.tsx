import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="space-y-8">

      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#DC2626]"
      >
        <ArrowLeft size={18} />

        Back to Categories
      </Link>

      <div>

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Add New Category
        </h1>

        <p className="mt-2 text-gray-500">
          Create a category for your store.
        </p>

      </div>

      <CategoryForm />

    </div>
  );
}