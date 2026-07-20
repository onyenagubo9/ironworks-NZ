"use client";

import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function ProductActions() {
  return (
    <div className="flex items-center justify-center gap-3">

      <button className="rounded-lg p-2 hover:bg-gray-100">
        <Eye size={18} />
      </button>

      <Link
        href="/admin/products/1/edit"
        className="rounded-lg p-2 hover:bg-gray-100"
      >
        <Pencil size={18} />
      </Link>

      <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
        <Trash2 size={18} />
      </button>

    </div>
  );
}