"use client";

import { useEffect, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/actions/product/create-product";
import { updateProduct } from "@/actions/product/update-product";

import {
  ProductInput,
  ProductSchema,
} from "@/schemas/product-schema";

import BasicInformation from "./BasicInformation";
import Pricing from "./Pricing";
import ProductImages from "./ProductImages";
import Inventory from "./Inventory";
import Organization from "./Organization";
import Seo from "./Seo";
import PublishCard from "./PublishCard";
interface ProductFormProps {
  categories: {
    id: string;
    name: string;
  }[];

  brands: {
    id: string;
    name: string;
  }[];

  initialData?: ProductInput & {
    id: string;
  };
}

export default function ProductForm({
  categories,
  brands,
  initialData,
}: ProductFormProps) {
  const [isPending, startTransition] =
    useTransition();
const {
  register,
  handleSubmit,
  watch,
  setValue,
  reset,
  formState: {
    errors,
  },
} = useForm<ProductInput>({
  resolver: zodResolver(ProductSchema),

  defaultValues:
    initialData ?? {
      featured: false,

      trackQuantity: true,

      allowBackorder: false,

      quantity: 0,

      lowStockThreshold: 5,

      status: "DRAFT",

      tags: [],

      images: [],
    },
});

useEffect(() => {
  if (initialData) {
    reset(initialData);
  }
}, [initialData, reset]);

async function onSubmit(
  values: ProductInput
) {
  startTransition(async () => {
    const result = initialData
      ? await updateProduct(
          initialData.id,
          values
        )
      : await createProduct(values);

    if (result.success) {
      alert(
        initialData
          ? "Product updated successfully!"
          : "Product created successfully!"
      );
    } else {
      alert(result.error);
    }
  });
}
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Left */}

        <div className="space-y-6 xl:col-span-2">

          <BasicInformation
            register={register}
            errors={errors}
          />

         <ProductImages
        watch={watch}
        setValue={setValue}
        initialImages={initialData?.images ?? []}
      />

          <Pricing
            register={register}
            errors={errors}
          />

          <Inventory
            register={register}
            watch={watch}
            errors={errors}
          />

          <Seo
            register={register}
            errors={errors}
          />

        </div>

        {/* Right */}

        <div className="space-y-6">

          <Organization
            categories={categories}
            brands={brands}
            register={register}
            errors={errors}
          />

         <PublishCard
        register={register}
        watch={watch}
        isPending={isPending}
        isEditing={!!initialData}
      />

        </div>

      </div>

    </form>
  );
}