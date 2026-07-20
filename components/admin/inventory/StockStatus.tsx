interface StockStatusProps {
  quantity: number;
  lowStock: number;
}

export default function StockStatus({
  quantity,
  lowStock,
}: StockStatusProps) {
  // Out of Stock
  if (quantity <= 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
        Out of Stock
      </span>
    );
  }

  // Low Stock
  if (quantity <= lowStock) {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
        Low Stock
      </span>
    );
  }

  // In Stock
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
      In Stock
    </span>
  );
}