"use client";

import {
  Globe,
  Home,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

export default function BillingAddress() {
  const {
    checkout,
    updateBillingAddress,
    setSameAsShipping,
  } = useCheckout();

  const sameAsShipping =
    checkout.sameAsShipping;

  const form =
    checkout.billingAddress;

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    updateBillingAddress({
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">

      {/* Same Address */}

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">

        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) =>
            setSameAsShipping(
              e.target.checked
            )
          }
          className="h-5 w-5 accent-[#DC2626]"
        />

        <div>

          <p className="font-semibold text-[#0F172A]">
            Same as shipping address
          </p>

          <p className="text-sm text-gray-500">
            Use the shipping address as
            your billing address.
          </p>

        </div>

      </label>

      {sameAsShipping ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">

          <p className="font-medium text-green-700">
            Your billing address will
            automatically be the same as
            your shipping address.
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {/* Name */}

          <div className="grid gap-6 md:grid-cols-2">

            <InputField
              icon={<User size={18} />}
              label="First Name"
              value={form.firstName}
              placeholder="John"
              onChange={(value) =>
                updateField(
                  "firstName",
                  value
                )
              }
            />

            <InputField
              icon={<User size={18} />}
              label="Last Name"
              value={form.lastName}
              placeholder="Doe"
              onChange={(value) =>
                updateField(
                  "lastName",
                  value
                )
              }
            />

          </div>

          {/* Company */}

          <InputField
            icon={<Home size={18} />}
            label="Company (Optional)"
            value={form.company}
            placeholder="Ironworks Ltd"
            onChange={(value) =>
              updateField(
                "company",
                value
              )
            }
          />

          {/* Phone */}

          <InputField
            icon={<Phone size={18} />}
            label="Phone Number"
            value={form.phone}
            placeholder="+64 21 123 4567"
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
          />

          {/* Country */}

          <div>

            <label className="mb-2 block font-medium text-gray-700">
              Country
            </label>

            <div className="relative">

              <Globe
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={form.country}
                onChange={(e) =>
                  updateField(
                    "country",
                    e.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
              >
                <option value="New Zealand">
                  New Zealand
                </option>

                <option value="Australia">
                  Australia
                </option>

                <option value="United States">
                  United States
                </option>

                <option value="United Kingdom">
                  United Kingdom
                </option>

              </select>

            </div>

          </div>

                    {/* State & City */}

          <div className="grid gap-6 md:grid-cols-2">

            <InputField
              icon={<MapPin size={18} />}
              label="State / Region"
              value={form.state}
              placeholder="Auckland"
              onChange={(value) =>
                updateField(
                  "state",
                  value
                )
              }
            />

            <InputField
              icon={<MapPin size={18} />}
              label="City"
              value={form.city}
              placeholder="Auckland"
              onChange={(value) =>
                updateField(
                  "city",
                  value
                )
              }
            />

          </div>

          {/* Suburb */}

          <InputField
            icon={<MapPin size={18} />}
            label="Suburb"
            value={form.suburb}
            placeholder="Manukau"
            onChange={(value) =>
              updateField(
                "suburb",
                value
              )
            }
          />

          {/* Address */}

          <InputField
            icon={<Home size={18} />}
            label="Street Address"
            value={form.address1}
            placeholder="123 Queen Street"
            onChange={(value) =>
              updateField(
                "address1",
                value
              )
            }
          />

          <InputField
            icon={<Home size={18} />}
            label="Apartment / Suite"
            value={form.address2}
            placeholder="Apartment 2A"
            onChange={(value) =>
              updateField(
                "address2",
                value
              )
            }
          />

          {/* Postal Code */}

          <InputField
            icon={<MapPin size={18} />}
            label="Postal Code"
            value={form.postalCode}
            placeholder="1010"
            onChange={(value) =>
              updateField(
                "postalCode",
                value
              )
            }
          />

        </div>
      )}

    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (
    value: string
  ) => void;
}

function InputField({
  label,
  value,
  placeholder,
  icon,
  onChange,
}: InputFieldProps) {
  return (
    <div>

      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-red-100"
        />

      </div>

    </div>
  );
}