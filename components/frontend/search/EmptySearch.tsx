import { SearchX } from "lucide-react";

export default function EmptySearch({
  query,
}: {
  query: string;
}) {
  return (
    <div className="py-24 text-center">

      <SearchX
        className="mx-auto text-gray-300"
        size={70}
      />

      <h2 className="mt-8 text-3xl font-bold">
        No Products Found
      </h2>

      <p className="mt-4 text-gray-500">
        We couldn't find any products matching
        "<strong>{query}</strong>"
      </p>

    </div>
  );
}