"use client";

import { useEffect, useRef, useState } from "react";
import {
  Control,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";

import UploadDropzone from "./UploadDropzone";
import ImageCard from "./ImageCard";

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  isCover: boolean;
  sortOrder: number;
}

interface ProductImagesProps {
  control: Control<ProductInput>;
  setValue: UseFormSetValue<ProductInput>;
  initialImages?: ProductInput["images"];
}

export default function ProductImages({
  control,
  setValue,
}: ProductImagesProps) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const hasInitialized = useRef(false);

  // Watch form images safely using useWatch hook
  const formImages = useWatch({
    control,
    name: "images",
  });

  // Safe initial hydration when editing existing products
  useEffect(() => {
    if (hasInitialized.current) return;

    if (formImages && formImages.length > 0) {
      setImages(
        formImages.map((image, index) => ({
          id: crypto.randomUUID(),
          url: image.imageUrl,
          publicId: image.publicId,
          isCover: image.isCover ?? false,
          sortOrder: image.sortOrder ?? index,
        }))
      );
      hasInitialized.current = true;
    }
  }, [formImages]);

  // Keep React Hook Form in sync when images state changes locally
  useEffect(() => {
    if (!hasInitialized.current && images.length === 0) return;

    setValue(
      "images",
      images.map((image) => ({
        imageUrl: image.url,
        publicId: image.publicId,
        altText: "",
        isCover: image.isCover,
        sortOrder: image.sortOrder,
      })),
      { shouldValidate: true }
    );
  }, [images, setValue]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#0F172A]">
          Product Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload high-quality product images.
        </p>
      </div>

      <UploadDropzone images={images} setImages={setImages} />

      {images.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              images={images}
              setImages={setImages}
              setValue={setValue}
            />
          ))}
        </div>
      )}
    </section>
  );
}