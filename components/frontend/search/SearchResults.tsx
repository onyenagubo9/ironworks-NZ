import ProductCard from "@/components/frontend/product/ProductCard";

// Extract the product type directly from ProductCard's props for strict typing
type Product = React.ComponentProps<typeof ProductCard>["product"];

interface SearchResultsProps {
  products: Product[];
}

export default function SearchResults({ products }: SearchResultsProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}