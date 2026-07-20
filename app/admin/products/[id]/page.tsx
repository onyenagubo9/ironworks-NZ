import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },

    include: {
      category: true,

      brand: true,

      inventory: true,

      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/admin/products"
            className="mb-5 inline-flex items-center gap-2 text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={18} />

            Back to Products
          </Link>

          <h1 className="text-4xl font-bold text-[#0F172A]">
            {product.name}
          </h1>

          <p className="mt-2 text-gray-500">
            SKU: {product.sku}
          </p>

        </div>

        <Link
          href={`/admin/products/${product.id}/edit`}
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
          <Pencil size={18} />

          Edit Product
        </Link>

      </div>

            <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Side */}

        <div className="space-y-8 lg:col-span-2">

        {/* Product Images */}

      <section className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold text-[#0F172A]">
          Product Images
        </h2>

        {product.images.length > 0 ? (

          <>

            {/* Cover Image */}

            <div className="relative aspect-square overflow-hidden rounded-2xl border">

              <Image
                src={product.images[0].imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />

            </div>

            {/* Gallery */}

            {product.images.length > 1 && (

              <div className="mt-5 grid grid-cols-5 gap-4">

                {product.images.map((image) => (

                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden rounded-xl border"
                  >

                    <Image
                      src={image.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />

                  </div>

                ))}

              </div>

            )}

          </>

        ) : (

          <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">

            <p className="text-gray-500">
              No product images uploaded.
            </p>

          </div>

        )}

      </section>

      {/* Basic Information */}

      <section className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-semibold text-[#0F172A]">
          Basic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="mb-2 text-sm font-medium text-gray-500">
              Product Name
            </p>

            <p className="font-semibold">
              {product.name}
            </p>

          </div>

          <div>

            <p className="mb-2 text-sm font-medium text-gray-500">
              Slug
            </p>

            <p className="font-semibold">
              {product.slug}
            </p>

          </div>

          <div>

            <p className="mb-2 text-sm font-medium text-gray-500">
              SKU
            </p>

            <p className="font-semibold">
              {product.sku}
            </p>

          </div>

          <div>

            <p className="mb-2 text-sm font-medium text-gray-500">
              Barcode
            </p>

            <p className="font-semibold">
              {product.barcode || "-"}
            </p>

          </div>

        </div>

      </section>

      {/* Descriptions */}

      <section className="rounded-2xl border bg-white p-8 shadow-sm">

        <h2 className="mb-8 text-2xl font-semibold text-[#0F172A]">
          Product Description
        </h2>

        <div className="space-y-8">

          <div>

            <h3 className="mb-3 font-semibold">
              Short Description
            </h3>

            <p className="leading-7 text-gray-600">
              {product.shortDescription ||
                "No short description."}
            </p>

          </div>

          <div>

            <h3 className="mb-3 font-semibold">
              Full Description
            </h3>

            <p className="whitespace-pre-wrap leading-8 text-gray-600">
              {product.description}
            </p>

          </div>

        </div>

      </section>

              </div>

        {/* Right Sidebar */}

        <div className="space-y-6">

          {/* Pricing */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Pricing
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Selling Price
                </span>

                <span className="font-semibold">
                  $
                  {Number(product.price).toLocaleString()}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Compare Price
                </span>

                <span className="font-semibold">
                  {product.comparePrice
                    ? `$${Number(
                        product.comparePrice
                      ).toLocaleString()}`
                    : "-"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Cost Price
                </span>

                <span className="font-semibold">
                  {product.costPrice
                    ? `$${Number(
                        product.costPrice
                      ).toLocaleString()}`
                    : "-"}
                </span>

              </div>

            </div>

          </section>

          {/* Inventory */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Inventory
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Quantity
                </span>

                <span className="font-semibold">
                  {product.inventory?.quantity ?? 0}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Reserved
                </span>

                <span className="font-semibold">
                  {product.inventory
                    ?.reservedQuantity ?? 0}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Low Stock Alert
                </span>

                <span className="font-semibold">
                  {product.inventory?.lowStock ?? "-"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Track Stock
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.inventory?.trackStock
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.inventory?.trackStock
                    ? "Enabled"
                    : "Disabled"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Backorders
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.inventory
                      ?.allowBackorder
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.inventory
                    ?.allowBackorder
                    ? "Allowed"
                    : "Disabled"}
                </span>

              </div>

            </div>

          </section>

          {/* Organization */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Organization
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-semibold">
                  {product.category.name}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Brand
                </span>

                <span className="font-semibold">
                  {product.brand?.name ?? "-"}
                </span>

              </div>

            </div>

          </section>

          {/* Status */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Publishing
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : product.status ===
                        "DRAFT"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Featured
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.featured
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.featured
                    ? "Yes"
                    : "No"}
                </span>

              </div>

            </div>

          </section>
                    {/* SEO */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              SEO
            </h2>

            <div className="space-y-5">

              <div>

                <p className="mb-2 text-sm font-medium text-gray-500">
                  Meta Title
                </p>

                <p>
                  {product.metaTitle || "-"}
                </p>

              </div>

              <div>

                <p className="mb-2 text-sm font-medium text-gray-500">
                  Meta Description
                </p>

                <p className="text-gray-600">
                  {product.metaDescription || "-"}
                </p>

              </div>

              <div>

                <p className="mb-2 text-sm font-medium text-gray-500">
                  Meta Keywords
                </p>

                <p className="text-gray-600">
                  {product.metaKeywords || "-"}
                </p>

              </div>

            </div>

          </section>

          {/* Tags */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Tags
            </h2>

            {product.tags.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {product.tags.map((tag) => (

                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-gray-500">
                No tags added.
              </p>

            )}

          </section>

          {/* Shipping */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Shipping Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Weight
                </span>

                <span className="font-semibold">
                  {product.weight
                    ? `${product.weight} kg`
                    : "-"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Length
                </span>

                <span className="font-semibold">
                  {product.length
                    ? `${product.length} cm`
                    : "-"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Width
                </span>

                <span className="font-semibold">
                  {product.width
                    ? `${product.width} cm`
                    : "-"}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Height
                </span>

                <span className="font-semibold">
                  {product.height
                    ? `${product.height} cm`
                    : "-"}
                </span>

              </div>

            </div>

          </section>

          {/* Dates */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
              Activity
            </h2>

            <div className="space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Created
                </span>

                <span className="font-semibold">
                  {product.createdAt.toLocaleDateString()}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-500">
                  Last Updated
                </span>

                <span className="font-semibold">
                  {product.updatedAt.toLocaleDateString()}
                </span>

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>

  );
}