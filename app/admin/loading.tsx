function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-12 w-12 rounded-xl bg-gray-200" />

      <div className="mb-3 h-4 w-28 rounded bg-gray-200" />

      <div className="h-8 w-40 rounded bg-gray-300" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-4 border-b py-4">
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
      <div className="h-4 rounded bg-gray-200" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="animate-pulse">
        <div className="mb-3 h-8 w-72 rounded bg-gray-300" />
        <div className="h-4 w-48 rounded bg-gray-200" />
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 h-5 w-48 rounded bg-gray-300" />

          <div className="h-80 rounded-xl bg-gray-200" />
        </div>

        <div className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-6 h-5 w-36 rounded bg-gray-300" />

          <div className="space-y-5">
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6 h-6 w-48 animate-pulse rounded bg-gray-300" />

        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRowSkeleton key={index} />
          ))}
        </div>

      </div>

    </div>
  );
}