import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
} from "lucide-react";

import DeleteBrandDialog from "@/components/admin/brands/DeleteBrandDialog";

interface BrandTableProps {
  brands: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    logoUrl: string | null;
    website: string | null;
    featured: boolean;
    isActive: boolean;
    createdAt: Date;

    _count: {
      products: number;
    };
  }[];

  currentPage: number;

  totalBrands: number;

  pageSize: number;
}

export default function BrandTable({
  brands,
  currentPage,
  totalBrands,
  pageSize,
}: BrandTableProps) {
  const totalPages = Math.ceil(
    totalBrands / pageSize
  );

  if (brands.length === 0) {
    return (
      <div className="flex h-112.5 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">

        <h2 className="text-2xl font-bold text-[#0F172A]">
          No Brands Found
        </h2>

        <p className="mt-3 text-gray-500">
          Start by creating your first brand.
        </p>

        <Link
          href="/admin/brands/new"
          className="mt-8 rounded-xl bg-[#DC2626] px-8 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Add Brand
        </Link>

      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Brand
            </th>

            <th className="px-6 py-4 text-left">
              Website
            </th>

            <th className="px-6 py-4 text-center">
              Products
            </th>

            <th className="px-6 py-4 text-center">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Featured
            </th>

            <th className="px-6 py-4 text-center">
              Created
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

                      {brands.map((brand) => (
            <tr
              key={brand.id}
              className="border-t transition hover:bg-gray-50"
            >
              {/* BRAND */}

              <td className="px-6 py-5">
                <div className="flex items-center gap-4">

                  {brand.logoUrl ? (

                    <Image
                      src={brand.logoUrl}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="rounded-xl border object-contain bg-white"
                    />

                  ) : (

                    <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                      No Logo
                    </div>

                  )}

                  <div>

                    <h3 className="font-semibold text-[#0F172A]">
                      {brand.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {brand.slug}
                    </p>

                  </div>

                </div>
              </td>

              {/* WEBSITE */}

              <td className="px-6 py-5">

                {brand.website ? (

                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>

                ) : (

                  <span className="text-gray-400">
                    —
                  </span>

                )}

              </td>

              {/* PRODUCTS */}

              <td className="px-6 py-5 text-center">
                {brand._count.products}
              </td>

              {/* STATUS */}

              <td className="px-6 py-5 text-center">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    brand.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {brand.isActive
                    ? "Active"
                    : "Hidden"}
                </span>

              </td>

              {/* FEATURED */}

              <td className="px-6 py-5 text-center">

                {brand.featured ? (

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Featured
                  </span>

                ) : (

                  <span className="text-gray-400">
                    —
                  </span>

                )}

              </td>

              {/* CREATED */}

              <td className="px-6 py-5 text-center">
                {new Date(
                  brand.createdAt
                ).toLocaleDateString()}
              </td>

              {/* ACTIONS */}

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <Link
                    href={`/admin/brands/${brand.id}`}
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/admin/brands/${brand.id}/edit`}
                    className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                  >
                    <Pencil size={18} />
                  </Link>

                  <DeleteBrandDialog
                    id={brand.id}
                    name={brand.name}
                  />

                </div>

              </td>

            </tr>
          ))}

                  </tbody>

      </table>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">

          <Link
            href={
              currentPage > 1
                ? `?page=${currentPage - 1}`
                : "#"
            }
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              currentPage === 1
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "hover:bg-white"
            }`}
          >
            <ChevronLeft size={16} />

            Previous
          </Link>

          <div className="flex items-center gap-2">

            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1
            ).map((page) => (
              <Link
                key={page}
                href={`?page=${page}`}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                  page === currentPage
                    ? "bg-[#DC2626] text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {page}
              </Link>
            ))}

          </div>

          <Link
            href={
              currentPage < totalPages
                ? `?page=${currentPage + 1}`
                : "#"
            }
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
              currentPage === totalPages
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "hover:bg-white"
            }`}
          >
            Next

            <ChevronRight size={16} />
          </Link>

        </div>
      )}

    </div>
  );
}