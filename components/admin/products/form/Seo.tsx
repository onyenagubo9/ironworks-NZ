import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface SeoProps {
  register: UseFormRegister<ProductInput>;
  errors: FieldErrors<ProductInput>;
}

export default function Seo({
  register,
  errors,
}: SeoProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        SEO
      </h2>

      <div className="space-y-5">

        {/* Slug */}

        <div>

          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            {...register("slug")}
            placeholder="nike-air-max"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">
              {errors.slug.message}
            </p>
          )}

        </div>

        {/* Meta Title */}

        <div>

          <label className="mb-2 block font-medium">
            Meta Title
          </label>

          <input
            {...register("metaTitle")}
            placeholder="Nike Air Max Running Shoes"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.metaTitle && (
            <p className="mt-1 text-sm text-red-500">
              {errors.metaTitle.message}
            </p>
          )}

        </div>

        {/* Meta Description */}

        <div>

          <label className="mb-2 block font-medium">
            Meta Description
          </label>

          <textarea
            rows={4}
            {...register("metaDescription")}
            placeholder="Write a concise SEO description..."
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.metaDescription && (
            <p className="mt-1 text-sm text-red-500">
              {errors.metaDescription.message}
            </p>
          )}

        </div>

        {/* Meta Keywords */}

        <div>

          <label className="mb-2 block font-medium">
            Meta Keywords
          </label>

          <input
            {...register("metaKeywords")}
            placeholder="nike, shoes, running, sports"
            className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
          />

          {errors.metaKeywords && (
            <p className="mt-1 text-sm text-red-500">
              {errors.metaKeywords.message}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Separate keywords with commas.
          </p>

        </div>

      </div>

    </section>
  );
}