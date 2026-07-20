import Link from "next/link";
import {
  Download,
  Plus,
} from "lucide-react";

export default function OrderHeader() {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders, payments and fulfillment.
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

          Export
        </button>

        <Link
          href="/admin/orders/new"
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
          <Plus size={18} />

          Create Order
        </Link>

      </div>

    </div>
  );
}