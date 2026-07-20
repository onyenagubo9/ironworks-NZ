export default function SearchHeader({
  query,
  total,
}: {
  query: string;
  total: number;
}) {
  return (
    <div className="mb-12">

      <h1 className="text-4xl font-bold">

        Search Results

      </h1>

      <p className="mt-4 text-gray-500">

        Showing{" "}

        <span className="font-semibold">

          {total}

        </span>{" "}

        result{total !== 1 && "s"} for{" "}

        <span className="font-semibold">

          "{query}"

        </span>

      </p>

    </div>
  );
}