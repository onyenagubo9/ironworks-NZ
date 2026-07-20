import Link from "next/link";
import {
  Download,
  PackagePlus,
} from "lucide-react";

export default function InventoryHeader() {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Inventory
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor stock levels, manage inventory, and keep products available for customers.
        </p>

      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white
            px-5
            py-3
            font-medium
            text-[#0F172A]
            transition
            hover:bg-gray-50
          "
        >
          <Download size={18} />

          Export Inventory
        </button>

        <Link
          href="/admin/products/new"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#DC2626]
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
          "
        >
          <PackagePlus size={18} />

          Add Product
        </Link>

      </div>

    </div>
  );
}