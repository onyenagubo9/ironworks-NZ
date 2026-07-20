interface PaymentStatusProps {
  status:
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";
}

export default function PaymentStatus({
  status,
}: PaymentStatusProps) {
  switch (status) {
    case "PENDING":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      );

    case "PAID":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Paid
        </span>
      );

    case "FAILED":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Failed
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