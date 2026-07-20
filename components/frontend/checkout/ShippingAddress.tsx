"use client";

import {
  Home,
  MapPin,
  User,
  Phone,
  Globe,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

export default function ShippingAddress() {
  const {
    checkout,
    updateShippingAddress,
  } = useCheckout();

  const form = checkout.shippingAddress;

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    updateShippingAddress({
      [field]: value,
    });
  }

  return (
    <div className="space-y-6">

      {/* Name */}

      <div className="grid gap-6 md:grid-cols-2">

        <InputField
          icon={<User size={18} />}
          label="First Name"
          placeholder="John"
          value={form.firstName}
          onChange={(value) =>
            updateField("firstName", value)
          }
        />

        <InputField
          icon={<User size={18} />}
          label="Last Name"
          placeholder="Doe"
          value={form.lastName}
          onChange={(value) =>
            updateField("lastName", value)
          }
        />

      </div>

      {/* Company */}

      <InputField
        icon={<Home size={18} />}
        label="Company (Optional)"
        placeholder="Ironworks Ltd"
        value={form.company}
        onChange={(value) =>
          updateField("company", value)
        }
      />

      {/* Phone */}

      <InputField
        icon={<Phone size={18} />}
        label="Phone Number"
        placeholder="+64 21 123 4567"
        value={form.phone}
        onChange={(value) =>
          updateField("phone", value)
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

      {/* State / City */}

      <div className="grid gap-6 md:grid-cols-2">

        <InputField
          icon={<MapPin size={18} />}
          label="State / Region"
          placeholder="Auckland"
          value={form.state}
          onChange={(value) =>
            updateField("state", value)
          }
        />

        <InputField
          icon={<MapPin size={18} />}
          label="City"
          placeholder="Auckland"
          value={form.city}
          onChange={(value) =>
            updateField("city", value)
          }
        />

      </div>

      {/* Suburb */}

      <InputField
        icon={<MapPin size={18} />}
        label="Suburb"
        placeholder="Manukau"
        value={form.suburb}
        onChange={(value) =>
          updateField("suburb", value)
        }
      />

      {/* Address */}

      <InputField
        icon={<Home size={18} />}
        label="Street Address"
        placeholder="123 Queen Street"
        value={form.address1}
        onChange={(value) =>
          updateField("address1", value)
        }
      />

      <InputField
        icon={<Home size={18} />}
        label="Apartment / Suite (Optional)"
        placeholder="Apartment 4B"
        value={form.address2}
        onChange={(value) =>
          updateField("address2", value)
        }
      />

      {/* Postal Code */}

      <InputField
        icon={<MapPin size={18} />}
        label="Postal Code"
        placeholder="1010"
        value={form.postalCode}
        onChange={(value) =>
          updateField(
            "postalCode",
            value
          )
        }
      />

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