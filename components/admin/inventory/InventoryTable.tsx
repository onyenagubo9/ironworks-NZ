import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Pencil,
} from "lucide-react";

import StockStatus from "./StockStatus";
import AdjustStockDialog from "./AdjustStockDialog";

interface InventoryTableProps {
  products: {
    id: string;
    name: string;
    sku: string;

    category: {
      name: string;
    };

    inventory: {
      quantity: number;
      reservedQuantity: number;
      lowStock: number;
      trackStock: boolean;
    } | null;

    images: {
      imageUrl: string;
    }[];
  }[];

  currentPage: number;

  totalProducts: number;

  pageSize: number;
}

export default function InventoryTable({
  products,
  currentPage,
  totalProducts,
  pageSize,
}: InventoryTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-112.5 flex-col items-center justify-center rounded-2xl border border-dashed bg-white">
        <h2 className="text-2xl font-bold text-[#0F172A]">
          No Products Found
        </h2>

        <p className="mt-3 text-gray-500">
          No inventory matches your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Quantity
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Reserved
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Available
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Low Stock
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => {
              const quantity =
                product.inventory?.quantity ?? 0;

              const reserved =
                product.inventory
                  ?.reservedQuantity ?? 0;

              const available =
                quantity - reserved;

              const lowStock =
                product.inventory?.lowStock ?? 5;

              return (
                <tr
                  key={product.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  {/* Product */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      {product.images.length > 0 ? (
                        <Image
                          src={product.images[0].imageUrl}
                          alt={product.name}
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
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {product.sku}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">
                    {product.category.name}
                  </td>

                  {/* Quantity */}

                  <td className="px-6 py-5 text-center font-semibold">
                    {quantity}
                  </td>

                  {/* Reserved */}

                  <td className="px-6 py-5 text-center">
                    {reserved}
                  </td>

                  {/* Available */}

                  <td className="px-6 py-5 text-center font-semibold">
                    {available}
                  </td>

                  {/* Low Stock */}

                  <td className="px-6 py-5 text-center">
                    {lowStock}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 text-center">

                    <StockStatus
                      quantity={quantity}
                      lowStock={lowStock}
                    />

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/admin/products/${product.id}`}
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                      >
                        <Pencil size={18} />
                      </Link>

                      <AdjustStockDialog
                        productId={product.id}
                        productName={product.name}
                        currentQuantity={
                          product.inventory?.quantity ?? 0
                        }
                      />

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t px-6 py-4">

        <p className="text-sm text-gray-500">

          Showing{" "}

          <span className="font-semibold">
            {products.length}
          </span>{" "}

          of{" "}

          <span className="font-semibold">
            {totalProducts}
          </span>{" "}

          products

        </p>

        <div className="flex items-center gap-2">

          <Link
            href={`?page=${Math.max(
              currentPage - 1,
              1
            )}`}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
          >
            Previous
          </Link>

          <span className="rounded-lg bg-[#DC2626] px-4 py-2 text-sm font-semibold text-white">
            {currentPage}
          </span>

          <Link
            href={`?page=${currentPage + 1}`}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              currentPage * pageSize >= totalProducts
                ? "pointer-events-none opacity-50"
                : "hover:bg-gray-50"
            }`}
          >
            Next
          </Link>

        </div>

      </div>

    </div>
  );
}