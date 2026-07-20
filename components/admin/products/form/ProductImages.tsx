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
}: ProductImagesProps) {
  const [images, setImages] = useState<ProductImage[]>([]);

  // Load existing images when editing
  useEffect(() => {
  const formImages = watch("images");

  if (!formImages) return;

  setImages(
    formImages.map((image, index) => ({
      id: crypto.randomUUID(),
      url: image.imageUrl,
      publicId: image.publicId,
      isCover: image.isCover ?? false,
      sortOrder: image.sortOrder ?? index,
    }))
  );
}, [watch]);

  // Keep React Hook Form in sync
  useEffect(() => {
    setValue(
      "images",
      images.map((image) => ({
        imageUrl: image.url,
        publicId: image.publicId,
        altText: "",
        isCover: image.isCover,
        sortOrder: image.sortOrder,
      }))
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