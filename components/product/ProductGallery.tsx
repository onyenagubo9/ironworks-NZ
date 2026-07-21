"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ProductImage {
  id: string;
  imageUrl: string;
  publicId: string;
  altText: string | null;
  isCover: boolean;
  sortOrder: number;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({
  images,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.find((image) => image.isCover)?.imageUrl ??
      images[0]?.imageUrl ??
      ""
  );

  if (!images.length) {
    return (
      <div className="flex h-150 items-center justify-center rounded-3xl border border-gray-200 bg-white">
        <div className="text-center">
          <ImageOff
            size={60}
            className="mx-auto text-gray-400"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Image Available
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            This product does not have any images yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* Thumbnails */}

      <div className="order-2 flex gap-4 overflow-x-auto lg:order-1 lg:w-24 lg:flex-col">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() =>
              setSelectedImage(image.imageUrl)
            }
            className={`
              relative
              h-24
              w-24
              overflow-hidden
              rounded-2xl
              border-2
              transition-all

              ${
                selectedImage === image.imageUrl
                  ? "border-[#DC2626]"
                  : "border-gray-200 hover:border-gray-400"
              }
            `}
          >
            <Image
              src={image.imageUrl}
              alt={image.altText ?? "Product"}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}

      <div className="order-1 flex-1 lg:order-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-gray-200 bg-white">
          <Image
            src={selectedImage}
            alt="Product Image"
            fill
            priority
            className="
              object-contain
              p-8
              transition-transform
              duration-300
              hover:scale-110
            "
          />
        </div>
      </div>
    </div>
  );
}