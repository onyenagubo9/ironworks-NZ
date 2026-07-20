"use client";

import axios from "axios";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { ProductImage } from "./ProductImages";

interface Props {
  images: ProductImage[];

  setImages: React.Dispatch<
    React.SetStateAction<ProductImage[]>
  >;
}

export default function UploadDropzone({
  images,
  setImages,
}: Props) {
  const onDrop = async (
    acceptedFiles: File[]
  ) => {
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();

        formData.append("file", file);

        const { data } = await axios.post(
          "/api/upload/product",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setImages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),

            url: data.imageUrl,

            publicId: data.publicId,

            isCover: prev.length === 0,

            sortOrder: prev.length,
          },
        ]);
      }
    } catch (error: any) {
      console.error("Upload Error:", error);

      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Image upload failed.";

      alert(message);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    multiple: true,

    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/jpg": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border-2
        border-dashed
        p-12
        transition
        ${
          isDragActive
            ? "border-[#DC2626] bg-red-50"
            : "border-gray-300 hover:border-[#DC2626]"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={60}
        className="text-[#DC2626]"
      />

      <h3 className="mt-5 text-xl font-semibold text-[#0F172A]">
        Drag & Drop Images
      </h3>

      <p className="mt-2 text-center text-gray-500">
        Drop product images here
        <br />
        or click to browse your computer.
      </p>

      <p className="mt-4 text-sm text-gray-400">
        JPG, PNG, WEBP • Multiple files supported
      </p>
    </div>
  );
}