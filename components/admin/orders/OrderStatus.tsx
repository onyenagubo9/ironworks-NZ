interface OrderStatusProps {
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";
}

export default function OrderStatus({
  status,
}: OrderStatusProps) {
  switch (status) {
    case "PENDING":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );

    case "CONFIRMED":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          Confirmed
        </span>
      );

    case "PROCESSING":
      return (
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          Processing
        </span>
      );

    case "SHIPPED":
      return (
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          Shipped
        </span>
      );

    case "DELIVERED":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Delivered
        </span>
      );

    case "CANCELLED":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Cancelled
        </span>
      );

    case "REFUNDED":
      return (
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
          Refunded
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          Unknown
        </span>
      );
  }
}