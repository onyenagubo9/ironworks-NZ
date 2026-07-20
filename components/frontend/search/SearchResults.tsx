import ProductCard from "@/components/frontend/product/ProductCard";

interface Props {
  products: any[];
}

export default function SearchResults({
  products,
}: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}