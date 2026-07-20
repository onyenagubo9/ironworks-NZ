export default function CategoryPagination() {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-5">

      <p className="text-sm text-gray-500">
        Showing 0 Categories
      </p>

      <div className="flex gap-2">

        <button className="rounded-lg border px-4 py-2">
          Previous
        </button>

        <button className="rounded-lg bg-[#DC2626] px-4 py-2 text-white">
          1
        </button>

        <button className="rounded-lg border px-4 py-2">
          Next
        </button>

      </div>

    </div>
  );
}