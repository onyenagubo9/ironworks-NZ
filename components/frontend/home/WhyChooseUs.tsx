import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Headset,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left Content */}
        <div>
          <span className="inline-flex rounded-full bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-400">
            Why Ironworks NZ
          </span>

          <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            Built for Contractors, Builders &amp; Industry Professionals
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-300">
            From steel fabrication to construction materials and industrial
            hardware, Ironworks NZ delivers trusted products, competitive
            pricing and reliable service across New Zealand.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-6">
            <Feature
              icon={<Truck size={22} />}
              title="Fast Nationwide Delivery"
              description="Reliable shipping throughout New Zealand."
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Secure Payments"
              description="Safe bank transfer payments with receipt verification."
            />

            <Feature
              icon={<Warehouse size={22} />}
              title="Premium Industrial Products"
              description="Carefully selected products from trusted manufacturers."
            />

            <Feature
              icon={<Headset size={22} />}
              title="Dedicated Support"
              description="Friendly customer service before and after your purchase."
            />
          </div>

          <Link
            href="/shop"
            className="mt-12 inline-flex items-center gap-3 rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            Browse Products
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right Side */}
        <div>
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/construct2.jpg"
              alt="Ironworks NZ"
              width={800}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Statistics */}
          <div className="mt-8 grid grid-cols-2 gap-5">
            <StatCard number="5000+" label="Products" />
            <StatCard number="100+" label="Trusted Brands" />
            <StatCard number="24/7" label="Support" />
            <StatCard number="NZ Wide" label="Delivery" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- */

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex gap-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DC2626] text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 leading-7 text-gray-400">{description}</p>
      </div>
    </div>
  );
}

/* -------------------------------- */

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
      <h3 className="text-3xl font-bold text-[#DC2626]">{number}</h3>
      <p className="mt-2 text-gray-300">{label}</p>
    </div>
  );
}