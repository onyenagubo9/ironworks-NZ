import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface InventoryProps {
  register: UseFormRegister<ProductInput>;
  watch: UseFormWatch<ProductInput>;
  errors: FieldErrors<ProductInput>;
}

export default function Inventory({
  register,
  watch,
  errors,
}: InventoryProps) {
  const trackQuantity = watch("trackQuantity");

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        Inventory
      </h2>

      <div className="space-y-6">

        <div className="grid gap-5 md:grid-cols-2">

          {/* Quantity */}

          <div>

            <label className="mb-2 block font-medium">
              Quantity
            </label>

            <input
              type="number"
              {...register("quantity", {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
            />

            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.quantity.message}
              </p>
            )}

          </div>

          {/* Low Stock */}

          <div>

            <label className="mb-2 block font-medium">
              Low Stock Alert
            </label>

            <input
              type="number"
              {...register("lowStockThreshold", {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
            />

            {errors.lowStockThreshold && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lowStockThreshold.message}
              </p>
            )}

          </div>

        </div>

        {/* Track Inventory */}

        <div className="flex items-center justify-between rounded-xl border p-4">

          <div>

            <h3 className="font-semibold">
              Track Inventory
            </h3>

            <p className="text-sm text-gray-500">
              Automatically track stock quantity.
            </p>

          </div>

          <input
            type="checkbox"
            {...register("trackQuantity")}
            className="h-5 w-5"
          />

        </div>

        {/* Allow Backorders */}

        <div className="flex items-center justify-between rounded-xl border p-4">

          <div>

            <h3 className="font-semibold">
              Allow Backorders
            </h3>

            <p className="text-sm text-gray-500">
              Continue selling when stock reaches zero.
            </p>

          </div>

          <input
            type="checkbox"
            {...register("allowBackorder")}
            disabled={!trackQuantity}
            className="h-5 w-5"
          />

        </div>

      </div>

    </section>
  );
}