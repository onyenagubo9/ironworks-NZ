"use client";

import { useEffect, useState } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
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
  watch: UseFormWatch<ProductInput>;
  setValue: UseFormSetValue<ProductInput>;
  initialImages?: ProductInput["images"];
}

export default function ProductImages({
  watch,
  setValue,
  initialImages,
}: ProductImagesProps) {
  const formImages = watch("images");

  const [images, setImages] = useState<ProductImage[]>(() => {
    const sourceImages =
      initialImages && initialImages.length > 0
        ? initialImages
        : formImages ?? [];

    return sourceImages.map((image, index) => ({
      id: `${Date.now()}-${index}`,
      url: image.imageUrl,
      publicId: image.publicId,
      isCover: image.isCover ?? index === 0,
      sortOrder: image.sortOrder ?? index,
    }));
  });

  useEffect(() => {
    setValue(
      "images",
      images.map((image) => ({
        imageUrl: image.url,
        publicId: image.publicId,
        altText: "",
        isCover: image.isCover,
        sortOrder: image.sortOrder,
      })),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
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

      <UploadDropzone
        images={images}
        setImages={setImages}
      />

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