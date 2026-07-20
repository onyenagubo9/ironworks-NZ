import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface BasicInformationProps {
  register: UseFormRegister<ProductInput>;
  errors: FieldErrors<ProductInput>;
}

export default function BasicInformation({
  register,
  errors,
}: BasicInformationProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        Basic Information
      </h2>

      <div className="space-y-5">

        {/* Product Name */}

        <div>

          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            {...register("name")}
            placeholder="Nike Air Max"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}

        </div>

        {/* Short Description */}

        <div>

          <label className="mb-2 block font-medium">
            Short Description
          </label>

          <textarea
            rows={3}
            {...register("shortDescription")}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.shortDescription && (
            <p className="mt-1 text-sm text-red-500">
              {errors.shortDescription.message}
            </p>
          )}

        </div>

        {/* Full Description */}

        <div>

          <label className="mb-2 block font-medium">
            Full Description
          </label>

          <textarea
            rows={8}
            {...register("description")}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* SKU */}

          <div>

            <label className="mb-2 block font-medium">
              SKU
            </label>

            <input
              {...register("sku")}
              className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
            />

            {errors.sku && (
              <p className="mt-1 text-sm text-red-500">
                {errors.sku.message}
              </p>
            )}

          </div>

          {/* Barcode */}

          <div>

            <label className="mb-2 block font-medium">
              Barcode
            </label>

            <input
              {...register("barcode")}
              className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
            />

            {errors.barcode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.barcode.message}
              </p>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}