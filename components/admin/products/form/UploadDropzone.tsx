"use client";

import axios from "axios";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { ProductImage } from "./ProductImages";

interface Props {
  images?: ProductImage[];
  setImages: React.Dispatch<
    React.SetStateAction<ProductImage[]>
  >;
}

interface UploadResponse {
  imageUrl: string;
  publicId: string;
  error?: string;
}

export default function UploadDropzone({
  setImages,
}: Props) {
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await axios.post<UploadResponse>(
          "/api/upload/product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          url: data.imageUrl,
          publicId: data.publicId,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      setImages((prev) => {
        const hasCover = prev.some((img) => img.isCover);

        const newImages: ProductImage[] = uploadedFiles.map((file, index) => ({
          id: crypto.randomUUID(),
          url: file.url,
          publicId: file.publicId,
          isCover: !hasCover && index === 0,
          sortOrder: prev.length + index,
        }));

        return [...prev, ...newImages];
      });
    } catch (error: unknown) {
      console.error("Upload Error:", error);

      let message = "Image upload failed.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.error || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      alert(message);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition ${
        isDragActive
          ? "border-[#DC2626] bg-red-50"
          : "border-gray-300 hover:border-[#DC2626]"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud size={60} className="text-[#DC2626]" />

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