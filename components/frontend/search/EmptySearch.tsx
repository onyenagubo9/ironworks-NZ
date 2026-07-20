import { SearchX } from "lucide-react";

interface EmptySearchProps {
  query: string;
}

export default function EmptySearch({ query }: EmptySearchProps) {
  return (
    <div className="py-24 text-center">
      <SearchX className="mx-auto text-gray-300" size={70} />

      <h2 className="mt-8 text-3xl font-bold">No Products Found</h2>

      <p className="mt-4 text-gray-500">
        We couldn&apos;t find any products matching &quot;
        <strong>{query}</strong>&quot;
      </p>
    </div>
  );
}