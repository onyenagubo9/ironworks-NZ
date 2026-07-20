import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface PricingProps {
  register: UseFormRegister<ProductInput>;
  errors: FieldErrors<ProductInput>;
}

export default function Pricing({
  register,
  errors,
}: PricingProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        Pricing
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        {/* Cost Price */}

        <div>

          <label className="mb-2 block font-medium">
            Cost Price
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("costPrice", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.costPrice && (
            <p className="mt-1 text-sm text-red-500">
              {errors.costPrice.message}
            </p>
          )}

        </div>

        {/* Selling Price */}

        <div>

          <label className="mb-2 block font-medium">
            Selling Price
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}

        </div>

        {/* Compare Price */}

        <div>

          <label className="mb-2 block font-medium">
            Compare Price
          </label>

          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("comparePrice", {
              valueAsNumber: true,
            })}
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.comparePrice && (
            <p className="mt-1 text-sm text-red-500">
              {errors.comparePrice.message}
            </p>
          )}

        </div>

      </div>

    </section>
  );
}