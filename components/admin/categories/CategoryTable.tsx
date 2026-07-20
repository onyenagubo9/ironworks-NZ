import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import DeleteCategoryDialog from "@/components/admin/categories/DeleteCategoryDialog";

interface CategoryTableProps {
  categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    featured: boolean;
    isActive: boolean;
    createdAt: Date;

    _count: {
      products: number;
    };

    parent: {
      name: string;
    } | null;
  }[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="flex h-112.5 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">

        <h2 className="text-2xl font-bold text-[#0F172A]">
          No Categories
        </h2>

        <p className="mt-3 text-gray-500">
          Start by creating your first category.
        </p>

        <Link
          href="/admin/categories/new"
          className="mt-8 rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
        >
          Add Category
        </Link>

      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F172A]">
              Parent
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F172A]">
              Products
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F172A]">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F172A]">
              Featured
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F172A]">
              Created
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F172A]">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-t transition hover:bg-gray-50"
            >

              {/* CATEGORY */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  {category.imageUrl ? (

                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="rounded-xl border object-cover"
                    />

                  ) : (

                    <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">

                      No Image

                    </div>

                  )}

                  <div>

                    <h3 className="font-semibold text-[#0F172A]">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {category.slug}
                    </p>

                  </div>

                </div>

              </td>

              {/* PARENT */}

              <td className="px-6 py-5">
                {category.parent?.name ?? "-"}
              </td>

              {/* PRODUCTS */}

              <td className="px-6 py-5 text-center">
                {category._count.products}
              </td>

              {/* STATUS */}

              <td className="px-6 py-5 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    category.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.isActive
                    ? "Active"
                    : "Hidden"}
                </span>

              </td>

              {/* FEATURED */}

              <td className="px-6 py-5 text-center">

                {category.featured ? (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Featured
                  </span>
                ) : (
                  "-"
                )}

              </td>

              {/* CREATED */}

              <td className="px-6 py-5 text-center">
                {new Date(
                  category.createdAt
                ).toLocaleDateString()}
              </td>

              {/* ACTIONS */}

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <Link
                    href={`/admin/categories/${category.id}`}
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                  >
                    <Pencil size={18} />
                  </Link>

                 <DeleteCategoryDialog
                    id={category.id}
                    name={category.name}
                  />

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}