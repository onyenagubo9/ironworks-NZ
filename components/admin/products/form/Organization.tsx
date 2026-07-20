import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface OrganizationProps {
  categories: {
    id: string;
    name: string;
  }[];

  brands: {
    id: string;
    name: string;
  }[];

  register: UseFormRegister<ProductInput>;

  errors: FieldErrors<ProductInput>;
}

export default function Organization({
  categories,
  brands,
  register,
  errors,
}: OrganizationProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        Organization
      </h2>

      <div className="space-y-5">

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            {...register("categoryId")}
            defaultValue=""
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              p-3
              outline-none
              transition
              focus:border-[#DC2626]
            "
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}

          </select>

          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.categoryId.message}
            </p>
          )}

        </div>

        {/* Brand */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <select
            {...register("brandId")}
            defaultValue=""
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              p-3
              outline-none
              transition
              focus:border-[#DC2626]
            "
          >
            <option value="">
              No Brand
            </option>

            {brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}
              >
                {brand.name}
              </option>
            ))}

          </select>

          {errors.brandId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.brandId.message}
            </p>
          )}

        </div>

        {/* Tags */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Tags
          </label>

          <input
            type="text"
            placeholder="smartphone, flagship, apple"
          {...register("tags", {
          setValueAs: (value) => {
            if (Array.isArray(value)) {
              return value;
            }

            if (typeof value !== "string") {
              return [];
            }

            return value
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);
          },
        })}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              p-3
              outline-none
              transition
              focus:border-[#DC2626]
            "
          />

          {errors.tags && (
            <p className="mt-1 text-sm text-red-500">
              {errors.tags.message as string}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-500">
            Separate multiple tags with commas.
          </p>

        </div>

      </div>

    </section>
  );
}