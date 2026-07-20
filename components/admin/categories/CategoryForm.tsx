"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ImagePlus,
  Loader2,
  Save,
} from "lucide-react";

import {
  CategorySchema,
  CategoryInput,
} from "@/schemas/category-schema";

import { createCategory } from "@/actions/category/create-category";
import { updateCategory } from "@/actions/category/update-category";


interface CategoryFormProps {
  mode?: "create" | "edit";

  category?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    imagePublicId: string | null;
    parentId: string | null;
    featured: boolean;
    isActive: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
  };

  parents?: {
    id: string;
    name: string;
  }[];
}

export default function CategoryForm({
  mode = "create",
  category,
  parents = [],
}: CategoryFormProps)  {
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);

    const [preview, setPreview] = useState(
    category?.imageUrl ?? ""
    );

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),

   defaultValues: {
    name: category?.name ?? "",

    slug: category?.slug ?? "", 

    description: category?.description ?? "",

    parentId: category?.parentId ?? "",

    featured: category?.featured ?? false,

    isActive: category?.isActive ?? true,

    seoTitle: category?.seoTitle ?? "",

    seoDescription: category?.seoDescription ?? "",

    imageUrl: category?.imageUrl ?? "",

    imagePublicId: category?.imagePublicId ?? "",
    },
  });

  const categoryName = watch("name");

  useEffect(() => {
    if (!categoryName) return;

    const slug = categoryName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    setValue("slug", slug);
  }, [categoryName, setValue]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(
        "/api/upload/category",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setPreview(data.url);

      setValue("imageUrl", data.url);

      setValue("imagePublicId", data.publicId);
    } catch (err) {
      console.error(err);

      setError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };
  const onSubmit = async (values: CategoryInput) => {
  setLoading(true);

  setError("");

  setSuccess("");

  let result;

  if (mode === "create") {
    result = await createCategory(values);
  } else {
    result = await updateCategory(category!.id, values);
  }

  if (result?.error) {
    setError(result.error);
    setLoading(false);
    return;
  }

  setSuccess(
    mode === "create"
      ? "Category created successfully."
      : "Category updated successfully."
  );

  if (mode === "create") {
    reset();
    setPreview("");
  }

  setLoading(false);
};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-8 lg:col-span-2">

          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              Category Information
            </h2>

            <div className="space-y-6">

              <div>

                <label className="mb-2 block font-medium">
                  Category Name
                </label>

                <input
                  {...register("name")}
                  placeholder="Electronics"
                  className="w-full rounded-xl border p-3 outline-none transition focus:border-[#DC2626]"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Slug
                </label>

                <input
                  {...register("slug")}
                  placeholder="electronics"
                  className="w-full rounded-xl border p-3 outline-none transition focus:border-[#DC2626]"
                />

                {errors.slug && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={6}
                  {...register("description")}
                  className="w-full rounded-xl border p-3 outline-none transition focus:border-[#DC2626]"
                />

              </div>

            </div>

          </div>
                    {/* SEO */}

          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              SEO Information
            </h2>

            <div className="space-y-6">

              <div>

                <label className="mb-2 block font-medium">
                  SEO Title
                </label>

                <input
                  {...register("seoTitle")}
                  placeholder="SEO Title"
                  className="w-full rounded-xl border p-3 outline-none transition focus:border-[#DC2626]"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  SEO Description
                </label>

                <textarea
                  rows={5}
                  {...register("seoDescription")}
                  placeholder="SEO Description"
                  className="w-full rounded-xl border p-3 outline-none transition focus:border-[#DC2626]"
                />

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          {/* IMAGE */}

          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-[#0F172A]">
              Category Image
            </h2>

            <label
              className="
                flex
                h-72
                cursor-pointer
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border-2
                border-dashed
                border-gray-300
                transition
                hover:border-[#DC2626]
              "
            >

              {preview ? (

                <img
                  src={preview}
                  alt="Category"
                  className="h-full w-full object-cover"
                />

              ) : uploading ? (

                <>
                  <Loader2
                    size={42}
                    className="animate-spin text-[#DC2626]"
                  />

                  <p className="mt-4 text-gray-500">
                    Uploading image...
                  </p>
                </>

              ) : (

                <>
                  <ImagePlus
                    size={55}
                    className="text-gray-400"
                  />

                  <p className="mt-4 font-medium text-gray-600">
                    Click to Upload
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    PNG, JPG or WEBP
                  </p>
                </>

              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />

            </label>

            <input
              type="hidden"
              {...register("imageUrl")}
            />

            <input
              type="hidden"
              {...register("imagePublicId")}
            />

          </div>

                    {/* ORGANIZATION */}

          <div className="rounded-2xl border bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              Organization
            </h2>

            <div className="space-y-6">

              {/* Parent Category */}

              <div>

                <label className="mb-2 block font-medium">
                  Parent Category
                </label>

                <select
                  {...register("parentId")}
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
                    No Parent Category
                  </option>

                  {/* Categories from database will be loaded here */}
                </select>

              </div>

              {/* Status */}

              <div>

                <label className="mb-2 block font-medium">
                  Status
                </label>

                <select
                  {...register("isActive", {
                    setValueAs: (value) => value === "true",
                  })}
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
                  <option value="true">
                    Active
                  </option>

                  <option value="false">
                    Hidden
                  </option>

                </select>

              </div>

              {/* Featured */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-4
                "
              >

                <div>

                  <h4 className="font-semibold text-[#0F172A]">
                    Featured Category
                  </h4>

                  <p className="text-sm text-gray-500">
                    Display this category in featured sections.
                  </p>

                </div>

                <input
                  type="checkbox"
                  {...register("featured")}
                  className="
                    h-5
                    w-5
                    accent-[#DC2626]
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ALERTS */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            rounded-xl
            border
            border-green-200
            bg-green-50
            px-5
            py-4
            text-green-700
          "
        >
          {success}
        </div>
      )}

            {/* BUTTONS */}

      <div className="flex flex-col-reverse gap-4 border-t pt-8 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() => {
            reset();
            setPreview("");
            setError("");
            setSuccess("");
          }}
          className="
            rounded-xl
            border
            border-gray-300
            bg-white
            px-8
            py-3
            font-semibold
            text-[#0F172A]
            transition
            hover:bg-gray-100
          "
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading || uploading}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#DC2626]
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={18}
                        />
            {mode === "create"
                ? "Saving..."
                : "Updating..."}
            </>
          ) : (
            <>
              <Save size={18} />

              {mode === "create"
            ? "Save Category"
            : "Update Category"}
            </>
          )}
        </button>

      </div>

    </form>
  );
}