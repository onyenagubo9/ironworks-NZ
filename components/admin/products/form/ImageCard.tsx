"use client";

import Image from "next/image";
import { Trash2, Star } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";

import { ProductInput } from "@/schemas/product-schema";
import { ProductImage } from "./ProductImages";

interface Props {
  image: ProductImage;

  images: ProductImage[];

  setImages: React.Dispatch<
    React.SetStateAction<ProductImage[]>
  >;

  setValue: UseFormSetValue<ProductInput>;
}

export default function ImageCard({
  image,
  images,
  setImages,
  setValue,
}: Props) {
  function syncForm(updatedImages: ProductImage[]) {
    setValue(
      "images",
      updatedImages.map((img) => ({
        imageUrl: img.url,
        publicId: img.publicId,
        altText: "",
        isCover: img.isCover,
        sortOrder: img.sortOrder,
      }))
    );
  }

  const removeImage = () => {
    const updated = images.filter(
      (img) => img.id !== image.id
    );

    setImages(updated);

    syncForm(updated);
  };

  const setCoverImage = () => {
    const updated = images.map((img, index) => ({
      ...img,
      isCover: img.id === image.id,
      sortOrder:
        img.id === image.id
          ? 0
          : index + 1,
    }));

    setImages(updated);

    syncForm(updated);
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className="relative aspect-square">

        <Image
          src={image.url}
          alt=""
          fill
          className="object-cover"
        />

      </div>

      <div className="flex items-center justify-between p-4">

        <button
          type="button"
          onClick={setCoverImage}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
            image.isCover
              ? "bg-yellow-500 text-white"
              : "bg-[#0F172A] text-white hover:bg-black"
          }`}
        >
          <Star
            size={16}
            fill={
              image.isCover
                ? "currentColor"
                : "none"
            }
          />

          {image.isCover
            ? "Cover"
            : "Set Cover"}

        </button>

        <button
          type="button"
          onClick={removeImage}
          className="rounded-lg p-2 text-[#DC2626] transition hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}