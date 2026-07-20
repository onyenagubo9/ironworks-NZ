"use client";

import {
  Check,
  CreditCard,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";

type CheckoutStep =
  | "cart"
  | "checkout"
  | "payment"
  | "complete";

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  {
    id: "cart",
    title: "Cart",
    icon: ShoppingCart,
  },
  {
    id: "checkout",
    title: "Checkout",
    icon: CreditCard,
  },
  {
    id: "payment",
    title: "Payment",
    icon: CreditCard,
  },
  {
    id: "complete",
    title: "Complete",
    icon: PackageCheck,
  },
] as const;

export default function CheckoutSteps({
  currentStep,
}: CheckoutStepsProps) {
  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            index < currentIndex;

          const active =
            index === currentIndex;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center"
            >
              {/* Step */}

              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    transition-all
                    ${
                      completed
                        ? "border-green-600 bg-green-600 text-white"
                        : active
                        ? "border-[#DC2626] bg-[#DC2626] text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={24} />
                  ) : (
                    <Icon size={22} />
                  )}
                </div>

                <span
                  className={`
                    mt-3
                    text-sm
                    font-semibold
                    ${
                      active
                        ? "text-[#DC2626]"
                        : completed
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  `}
                >
                  {step.title}
                </span>

              </div>

              {/* Connector */}

              {index < steps.length - 1 && (
                <div className="mx-4 mb-8 h-1 flex-1 rounded-full bg-gray-200">

                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      ${
                        completed
                          ? "w-full bg-green-600"
                          : "w-0"
                      }
                    `}
                  />

                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}