interface SearchHeaderProps {
  query: string;
  total: number;
}

export default function SearchHeader({ query, total }: SearchHeaderProps) {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold">Search Results</h1>

      <p className="mt-4 text-gray-500">
        Showing <span className="font-semibold">{total}</span> result
        {total !== 1 && "s"} for{" "}
        <span className="font-semibold">&quot;{query}&quot;</span>
      </p>
    </div>
  );
}