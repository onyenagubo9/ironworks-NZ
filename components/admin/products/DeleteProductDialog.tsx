"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteProduct } from "@/actions/product/delete-product";

interface DeleteProductDialogProps {
  id: string;
  name: string;
}

export default function DeleteProductDialog({
  id,
  name,
}: DeleteProductDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteProduct(id);

      if (!result.success) {
        alert(
          result.error ??
            "Failed to delete product."
        );

        return;
      }

      alert("Product deleted successfully.");
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="
        rounded-lg
        bg-red-50
        p-2
        text-red-600
        transition
        hover:bg-red-100
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <Trash2 size={18} />
    </button>
  );
}