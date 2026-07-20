export default function ProductPagination() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">

      <p className="text-sm text-gray-500">
        Showing 1–3 of 3 products
      </p>

      <div className="flex gap-2">

        <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
          Previous
        </button>

        <button className="rounded-lg bg-[#DC2626] px-4 py-2 text-white">
          1
        </button>

        <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
          Next
        </button>

      </div>

    </div>
  );
}