"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import {
  AlertCircle,
  CheckCircle2,
  FileImage,
  Loader2,
  Upload,
  X,
} from "lucide-react";

interface UploadReceiptProps {
  orderId: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export default function UploadReceipt({
  orderId,
}: UploadReceiptProps) {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function clearFile() {
    setFile(null);

    setPreview("");

    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function validateFile(file: File) {
    if (
      !ALLOWED_TYPES.includes(file.type)
    ) {
      setError(
        "Only JPG, PNG, WEBP and PDF files are allowed."
      );

      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Maximum file size is 10MB."
      );

      return false;
    }

    return true;
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected =
      event.target.files?.[0];

    if (!selected) return;

    setError("");

    if (!validateFile(selected)) {
      return;
    }

    setFile(selected);

    if (
      selected.type.startsWith("image/")
    ) {
      const reader =
        new FileReader();

      reader.onload = () => {
        setPreview(
          reader.result as string
        );
      };

      reader.readAsDataURL(selected);
    } else {
      setPreview("");
    }
  }

    function handleDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (!droppedFile) return;

    setError("");

    if (!validateFile(droppedFile)) {
      return;
    }

    setFile(droppedFile);

    if (
      droppedFile.type.startsWith(
        "image/"
      )
    ) {
      const reader =
        new FileReader();

      reader.onload = () => {
        setPreview(
          reader.result as string
        );
      };

      reader.readAsDataURL(
        droppedFile
      );
    } else {
      setPreview("");
    }
  }

  function handleDragOver(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
  }

  async function handleUpload() {
    if (!file || loading) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();

      formData.append(
        "orderId",
        orderId
      );

      formData.append(
        "receipt",
        file
      );

      const response = await fetch(
        "/api/orders/upload-receipt",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ??
            "Unable to upload receipt."
        );
      }

      setSuccess(true);

      setTimeout(() => {
        router.push(
          `/orders/${orderId}`
        );

        router.refresh();
      }, 1500);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        onChange={handleFileChange}
      />

      <div
        onClick={openFilePicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="
          cursor-pointer
          rounded-2xl
          border-2
          border-dashed
          border-gray-300
          bg-gray-50
          p-10
          transition
          hover:border-[#DC2626]
          hover:bg-red-50
        "
      >

        {!file ? (

          <div className="flex flex-col items-center text-center">

            <Upload
              size={46}
              className="text-[#DC2626]"
            />

            <h3 className="mt-5 text-xl font-bold text-[#0F172A]">
              Upload Receipt
            </h3>

            <p className="mt-2 text-gray-600">
              Drag & drop your receipt here,
              or click to browse.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              JPG, PNG, WEBP or PDF
              (Maximum 10MB)
            </p>

          </div>

        ) : (

          <div className="space-y-4">

                      {preview ? (

              <div className="overflow-hidden rounded-xl border border-gray-200">

                <div className="relative h-80 w-full">

                  <Image
                    src={preview}
                    alt="Receipt Preview"
                    fill
                    unoptimized
                    className="object-contain"
                  />

                </div>

              </div>

            ) : (

              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">

                <FileImage
                  size={36}
                  className="text-[#DC2626]"
                />

                <div>

                  <p className="font-semibold text-[#0F172A]">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    PDF Document
                  </p>

                </div>

              </div>

            )}

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">

              <div>

                <p className="font-semibold text-[#0F172A]">
                  {file.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  clearFile();
                }}
                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
              >
                <X size={20} />
              </button>

            </div>

          </div>

        )}

      </div>

            {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

          <AlertCircle size={20} />

          <span>{error}</span>

        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

          <CheckCircle2 size={20} />

          <span>
            Receipt uploaded successfully.
            Redirecting...
          </span>

        </div>
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
        className="
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[#DC2626]
          text-lg
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
              size={22}
              className="animate-spin"
            />

            Uploading Receipt...
          </>
        ) : (
          <>
            <Upload size={22} />

            Upload Receipt
          </>
        )}
      </button>

    </div>
  );
}