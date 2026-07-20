"use client";

import { useState, useTransition } from "react";

import {
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { deleteBrand } from "@/actions/brand/delete-brand";

interface DeleteBrandDialogProps {
  id: string;
  name: string;
}

export default function DeleteBrandDialog({
  id,
  name,
}: DeleteBrandDialogProps) {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  const handleDelete = () => {
    setError("");

    startTransition(async () => {
      const result = await deleteBrand(id);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold">
                Delete Brand
              </h2>

              <button
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>

            </div>

            <p className="mt-6 text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-500">
              This action cannot be undone.
            </p>

            {error && (
              <div className="mt-5 rounded-lg bg-red-50 p-3 text-red-600">
                {error}
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-5 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-[#DC2626] px-6 py-2 font-semibold text-white"
              >
                {isPending ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}