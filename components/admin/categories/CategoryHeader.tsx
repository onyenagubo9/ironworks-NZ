import Link from "next/link";
import { Plus } from "lucide-react";

export default function CategoryHeader() {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Organize products into categories.
        </p>

      </div>

      <Link
        href="/admin/categories/new"
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[#DC2626]
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
      >
        <Plus size={20} />

        Add Category
      </Link>

    </div>
  );
}