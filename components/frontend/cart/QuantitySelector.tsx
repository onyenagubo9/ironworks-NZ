"use client";

import { Loader2, Minus, Plus } from "lucide-react";
import { useTransition } from "react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => Promise<void> | void;
  onDecrease: () => Promise<void> | void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 999,
}: QuantitySelectorProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleIncrease() {
    if (quantity >= max) return;

    startTransition(async () => {
      await onIncrease();
    });
  }

  function handleDecrease() {
    if (quantity <= min) return;

    startTransition(async () => {
      await onDecrease();
    });
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white">

      {/* Decrease */}

      <button
        type="button"
        onClick={handleDecrease}
        disabled={
          isPending ||
          quantity <= min
        }
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isPending ? (
          <Loader2
            size={16}
            className="animate-spin"
          />
        ) : (
          <Minus size={18} />
        )}
      </button>

      {/* Quantity */}

      <div
        className="
          flex
          h-11
          min-w-15
          items-center
          justify-center
          border-x
          border-gray-300
          px-4
          text-sm
          font-semibold
        "
      >
        {quantity}
      </div>

      {/* Increase */}

      <button
        type="button"
        onClick={handleIncrease}
        disabled={
          isPending ||
          quantity >= max
        }
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isPending ? (
          <Loader2
            size={16}
            className="animate-spin"
          />
        ) : (
          <Plus size={18} />
        )}
      </button>

    </div>
  );
}