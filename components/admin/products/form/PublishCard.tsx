"use client";

import {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

interface PublishCardProps {
  register: UseFormRegister<ProductInput>;

  watch: UseFormWatch<ProductInput>;

  isPending: boolean;

  isEditing?: boolean;

  errors?: FieldErrors<ProductInput>;
}

export default function PublishCard({
  register,
  watch,
  isPending,
  isEditing = false,
}: PublishCardProps) {
  const status = watch("status");

  return (
    <section className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold text-[#0F172A]">
        Publishing
      </h2>

      {/* Status */}

      <div className="mb-6">

        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          {...register("status")}
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
        >
          <option value="DRAFT">
            Draft
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="ARCHIVED">
            Archived
          </option>

        </select>

      </div>

      {/* Featured */}

      <div className="mb-8 flex items-center gap-3">

        <input
          id="featured"
          type="checkbox"
          {...register("featured")}
          className="h-5 w-5 rounded border-gray-300 text-[#DC2626]"
        />

        <label
          htmlFor="featured"
          className="font-medium"
        >
          Featured Product
        </label>

      </div>

      {/* Status Preview */}

      <div className="mb-8 rounded-xl bg-gray-50 p-4">

        <p className="text-sm text-gray-500">
          Current Status
        </p>

        <span
          className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : status === "DRAFT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {status}
        </span>

      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={isPending}
        className="
          w-full
          rounded-xl
          bg-[#DC2626]
          py-3
          font-semibold
          text-white
          transition
          hover:bg-red-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isPending
          ? isEditing
            ? "Updating Product..."
            : "Creating Product..."
          : isEditing
          ? "Update Product"
          : "Create Product"}
      </button>

    </section>
  );
}