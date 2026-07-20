import Link from "next/link";
import { Plus } from "lucide-react";

export default function BrandHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

      <div>

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Brands
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all your product brands.
        </p>

      </div>

      <Link
        href="/admin/brands/new"
        className="flex items-center gap-2 rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        <Plus size={18} />

        Add Brand

      </Link>

    </div>
  );
}