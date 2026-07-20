import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getCart } from "@/actions/cart/get-cart";

import EmptyCart from "@/components/frontend/cart/EmptyCart";
import CheckoutSteps from "@/components/frontend/checkout/CheckoutSteps";
import CheckoutForm from "@/components/frontend/checkout/CheckoutForm";
import OrderSummary from "@/components/frontend/checkout/OrderSummary";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/checkout");
  }

  const cart = await getCart();

  if (!cart.success) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700">
            Unable to load checkout
          </h2>

          <p className="mt-3 text-gray-600">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Complete your order securely.
        </p>

      </div>

      {/* Checkout Progress */}

      <CheckoutSteps currentStep="checkout" />

      {/* Checkout Content */}

      <div className="mt-10 grid gap-10 lg:grid-cols-3">

        {/* Left Side */}

        <div className="space-y-8 lg:col-span-2">

          <CheckoutForm />

        </div>

        {/* Right Side */}

        <div>

          <OrderSummary
            items={cart.items}
            subtotal={cart.subtotal}
            shipping={0}
            tax={0}
            discount={0}
          />

        </div>

      </div>

    </div>
  );
}