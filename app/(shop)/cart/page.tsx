import { getCart } from "@/actions/cart/get-cart";

import EmptyCart from "@/components/frontend/cart/EmptyCart";
import CartItem from "@/components/frontend/cart/CartItem";
import CartSummary from "@/components/frontend/cart/CartSummary";

export default async function CartPage() {
  const result = await getCart();

  if (!result.success) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700">
            Failed to load cart
          </h2>

          <p className="mt-3 text-gray-600">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  if (result.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Header */}

      <div className="mb-10 flex flex-col gap-2">

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Shopping Cart
        </h1>

        <p className="text-gray-500">
          {result.itemCount} item
          {result.itemCount !== 1 && "s"} in your cart
        </p>

      </div>

      {/* Content */}

      <div className="grid gap-10 lg:grid-cols-3">

        {/* Cart Items */}

        <div className="space-y-6 lg:col-span-2">

          {result.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

        </div>

        {/* Summary */}

        <div>

          <CartSummary
            subtotal={result.subtotal}
            shipping={0}
            tax={0}
            discount={0}
          />

        </div>

      </div>

    </div>
  );
}