import Link from "next/link";

import {
  Mail,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-800 bg-[#0F172A] text-white lg:block">

      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-6 text-sm">

          <div className="flex items-center gap-2">

            <Phone size={14} />

            <span>+64 444881839</span>

          </div>

          <div className="flex items-center gap-2">

            <Mail size={14} />

            <span>admin@ironworks-nz.site</span>

          </div>

          <div className="flex items-center gap-2">

            <MapPin size={14} />

            <span>Auckland, New Zealand</span>

          </div>

        </div>

        {/* Center */}

        <div className="flex items-center gap-2 text-sm font-medium text-red-300">

          <Truck size={15} />

          <span>
            World Delivery Across All Countries
          </span>

        </div>

        {/* Right */}

        <div className="flex items-center gap-6 text-sm">

          <Link
            href="/track-order"
            className="transition hover:text-[#DC2626]"
          >
            Track Order
          </Link>

          <Link
            href="/help"
            className="transition hover:text-[#DC2626]"
          >
            Help Centre
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-[#DC2626]"
          >
            Contact Us
          </Link>

          <span className="text-gray-500">
            |
          </span>

          <Link
            href="/login"
            className="font-medium transition hover:text-[#DC2626]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#DC2626] px-3 py-1.5 font-medium transition hover:bg-red-700"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}