"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteOrder } from "@/actions/order/delete-order";

interface DeleteOrderDialogProps {
  id: string;
  orderNumber: string;
}

export default function DeleteOrderDialog({
  id,
  orderNumber,
}: DeleteOrderDialogProps) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteOrder(id);

      if (result.success) {
        setOpen(false);

        alert(
          "Order deleted successfully."
        );
      } else {
        alert(result.error);
      }
    });
  }

  return (
    <>
      {/* Delete Button */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
      >
        <Trash2 size={18} />
      </button>

      {/* Dialog */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-xl font-bold text-[#0F172A]">
              Delete Order
            </h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete
              order{" "}
              <span className="font-semibold">
                #{orderNumber}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-600">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                disabled={isPending}
                className="rounded-xl border px-5 py-2 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {isPending
                  ? "Deleting..."
                  : "Delete Order"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}