import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div>
          <span className="inline-flex rounded-full bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-400">
            New Zealand&apos;s Trusted Industrial Supplier
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            Premium Steel &amp;
            <span className="block text-[#DC2626]">
              Industrial Supplies
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            Discover high-quality steel, fabrication materials, industrial
            hardware and construction products delivered across New Zealand.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/categories"
              className="rounded-xl border border-gray-600 px-8 py-4 font-semibold text-white transition hover:border-white"
            >
              Browse Categories
            </Link>
          </div>

          {/* Features */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <Feature
              icon={<Truck size={22} />}
              title="Fast Delivery"
              description="Nationwide shipping"
            />

            <Feature
              icon={<ShieldCheck size={22} />}
              title="Secure Payments"
              description="Bank Transfer"
            />

            <Feature
              icon={<Building2 size={22} />}
              title="Trusted Quality"
              description="Premium Materials"
            />
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-[#DC2626]/20 blur-3xl" />
          <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl">
            <Image
              src="/construct1.avif"
              alt="Ironworks NZ"
              width={900}
              height={700}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DC2626] text-white">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}