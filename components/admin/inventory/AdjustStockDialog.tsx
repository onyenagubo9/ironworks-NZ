"use client";

import { useState, useTransition } from "react";
import { PackagePlus } from "lucide-react";

import { adjustStock } from "@/actions/inventory/adjust-stock";

interface AdjustStockDialogProps {
  productId: string;
  productName: string;
  currentQuantity: number;
}

export default function AdjustStockDialog({
  productId,
  productName,
  currentQuantity,
}: AdjustStockDialogProps) {
  const [open, setOpen] = useState(false);

  const [quantity, setQuantity] = useState(
    currentQuantity
  );

  const [reason, setReason] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit() {
    startTransition(async () => {
      const result = await adjustStock({
        productId,
        quantity,
        reason,
      });

      if (result.success) {
        alert("Inventory updated successfully.");

        setOpen(false);
      } else {
        alert(result.error);
      }
    });
  }

  return (
    <>
      {/* Open Button */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
      >
        <PackagePlus size={18} />
      </button>

      {/* Dialog */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Adjust Inventory
            </h2>

            <p className="mt-2 text-gray-500">
              {productName}
            </p>

            <div className="mt-8 space-y-6">

              {/* Current Stock */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Current Stock
                </label>

                <input
                  value={currentQuantity}
                  disabled
                  className="w-full rounded-xl border bg-gray-100 px-4 py-3"
                />

              </div>

              {/* New Quantity */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Quantity
                </label>

                <input
                  type="number"
                  min={0}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
                />

              </div>

              {/* Reason */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Reason
                </label>

                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  placeholder="Reason for inventory adjustment..."
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
                />

              </div>

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                type="button"
                disabled={isPending}
                onClick={() => setOpen(false)}
                className="rounded-xl border px-5 py-3 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleSubmit}
                className="rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isPending
                  ? "Updating..."
                  : "Update Stock"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}