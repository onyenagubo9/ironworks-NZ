export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      <div className="mb-10 h-10 w-80 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border bg-white"
          >
            <div className="h-72 animate-pulse bg-gray-200" />

            <div className="space-y-4 p-6">

              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="h-6 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

              <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />

              <div className="h-12 animate-pulse rounded-xl bg-gray-200" />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}