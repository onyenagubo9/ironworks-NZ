"use client";

import { useState } from "react";

import {
  Clock3,
  Package,
  Truck,
  Store,
  CheckCircle2,
} from "lucide-react";

type DeliveryMethod =
  | "standard"
  | "express"
  | "pickup";

const deliveryOptions = [
  {
    id: "standard",
    title: "Standard Delivery",
    description:
      "Delivered within 3–5 business days.",
    price: 0,
    icon: Truck,
    eta: "3-5 Business Days",
  },
  {
    id: "express",
    title: "Express Delivery",
    description:
      "Priority delivery for urgent orders.",
    price: 19.99,
    icon: Package,
    eta: "1-2 Business Days",
  },
  {
    id: "pickup",
    title: "Store Pickup",
    description:
      "Collect your order from our warehouse.",
    price: 0,
    icon: Store,
    eta: "Ready Today",
  },
] as const;

export default function DeliveryMethod() {
  const [selectedMethod, setSelectedMethod] =
    useState<DeliveryMethod>(
      "standard"
    );

  return (
    <div className="space-y-5">

      {deliveryOptions.map((option) => {
        const Icon = option.icon;

        const selected =
          selectedMethod === option.id;

        return (
          <label
            key={option.id}
            className={`
              flex
              cursor-pointer
              items-start
              gap-5
              rounded-2xl
              border-2
              p-5
              transition-all
              duration-200
              ${
                selected
                  ? "border-[#DC2626] bg-red-50"
                  : "border-gray-200 hover:border-red-200"
              }
            `}
          >
            {/* Radio */}

            <input
              type="radio"
              name="deliveryMethod"
              checked={selected}
              onChange={() =>
                setSelectedMethod(
                  option.id
                )
              }
              className="mt-1 h-5 w-5 accent-[#DC2626]"
            />

            {/* Icon */}

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                ${
                  selected
                    ? "bg-[#DC2626] text-white"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              <Icon size={26} />
            </div>

            {/* Details */}

            <div className="flex-1">

              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {option.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {option.description}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-lg font-bold text-[#DC2626]">

                    {option.price === 0
                      ? "FREE"
                      : `NZ$${option.price.toFixed(
                          2
                        )}`}

                  </p>

                </div>

              </div>

              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">

                <div className="flex items-center gap-2">

                  <Clock3 size={16} />

                  {option.eta}

                </div>

                {selected && (
                  <div className="flex items-center gap-2 font-medium text-green-600">

                    <CheckCircle2
                      size={18}
                    />

                    Selected

                  </div>
                )}

              </div>

            </div>

          </label>
        );
      })}

      {/* Information */}

      <div className="rounded-2xl bg-gray-50 p-5">

        <h4 className="font-semibold text-[#0F172A]">
          Delivery Information
        </h4>

        <ul className="mt-3 space-y-2 text-sm text-gray-600">

          <li>
            • Orders are processed Monday to Friday.
          </li>

          <li>
            • Rural deliveries may take an additional 1–2 business days.
          </li>

          <li>
            • Large steel products may require special freight arrangements.
          </li>

          <li>
            • You will receive tracking information once your order has been dispatched.
          </li>

        </ul>

      </div>

    </div>
  );
}