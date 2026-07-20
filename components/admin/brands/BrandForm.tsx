"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { BrandSchema } from "@/schemas/brand-schema";
import { createBrand } from "@/actions/brand/create-brand";
import { updateBrand } from "@/actions/brand/update-brand";

import { ImagePlus, Loader2, Save, X } from "lucide-react";

interface BrandFormProps {
  mode?: "create" | "edit";
  brand?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    website: string | null;
    logoUrl: string | null;
    logoPublicId: string | null;
    featured: boolean;
    isActive: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
  };
}

export default function BrandForm({
  mode = "create",
  brand,
}: BrandFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      name: brand?.name ?? "",
      slug: brand?.slug ?? "",
      description: brand?.description ?? "",
      website: brand?.website ?? "",
      featured: brand?.featured ?? false,
      isActive: brand?.isActive ?? true,
      seoTitle: brand?.seoTitle ?? "",
      seoDescription: brand?.seoDescription ?? "",
      logoUrl: brand?.logoUrl ?? "",
      logoPublicId: brand?.logoPublicId ?? "",
    },
  });

  const logoUrl = useWatch({ control, name: "logoUrl" });
  const name = useWatch({ control, name: "name" });

  useEffect(() => {
    if (mode === "create" && name) {
      const generatedSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setValue("slug", generatedSlug);
    }
  }, [name, mode, setValue]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/brand", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setValue("logoUrl", data.url);
      setValue("logoPublicId", data.publicId);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof BrandSchema>) {
    setLoading(true);

    try {
      if (mode === "create") {
        await createBrand(values);
      } else {
        await updateBrand(brand!.id, values);
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* Brand Information */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              Brand Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-medium">Brand Name</label>
                <input
                  {...register("name")}
                  placeholder="Apple"
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">Slug</label>
                <input
                  {...register("slug")}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">Website</label>
                <input
                  {...register("website")}
                  placeholder="https://apple.com"
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Description</label>
                <textarea
                  rows={6}
                  {...register("description")}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">SEO</h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-medium">SEO Title</label>
                <input
                  {...register("seoTitle")}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                  placeholder="Apple Products"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">SEO Description</label>
                <textarea
                  rows={5}
                  {...register("seoDescription")}
                  className="w-full rounded-xl border p-3 outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* BRAND LOGO */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              Brand Logo
            </h2>

            {logoUrl ? (
              <div className="space-y-5">
                <div className="relative overflow-hidden rounded-2xl border">
                  <Image
                    src={logoUrl}
                    alt="Brand Logo"
                    width={400}
                    height={400}
                    className="h-64 w-full object-contain bg-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setValue("logoUrl", "");
                    setValue("logoPublicId", "");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-300 py-3 font-medium text-red-600 transition hover:bg-red-50"
                >
                  <X size={18} />
                  Remove Logo
                </button>
              </div>
            ) : (
              <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition hover:border-[#DC2626]">
                {uploading ? (
                  <>
                    <Loader2
                      className="animate-spin text-[#DC2626]"
                      size={40}
                    />
                    <p className="mt-4 text-gray-500">Uploading...</p>
                  </>
                ) : (
                  <>
                    <ImagePlus size={55} className="text-gray-400" />
                    <p className="mt-4 text-gray-500">Upload Brand Logo</p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* SETTINGS */}
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-[#0F172A]">
              Brand Settings
            </h2>

            <div className="space-y-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="h-5 w-5"
                />
                <span className="font-medium">Featured Brand</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="h-5 w-5"
                />
                <span className="font-medium">Active Brand</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || uploading}
          className="flex items-center gap-2 rounded-xl bg-[#DC2626] px-8 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {mode === "create" ? "Creating Brand..." : "Updating Brand..."}
            </>
          ) : (
            <>
              <Save size={18} />
              {mode === "create" ? "Save Brand" : "Update Brand"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}