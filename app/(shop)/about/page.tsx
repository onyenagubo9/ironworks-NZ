import { Metadata } from "next";
import Link from "next/link";

import {
  Building2,
  ShieldCheck,
  Wrench,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Ironworks NZ",
  description:
    "Learn more about Ironworks NZ, our mission, values, and commitment to supplying premium industrial and construction products.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              About Ironworks NZ

            </span>

            <h1 className="mt-8 text-5xl font-bold text-white">

              Building Strong Partnerships
              <br />
              Through Quality Products

            </h1>

            <p className="mt-8 text-xl leading-9 text-gray-300">

              We supply trusted industrial,
              engineering, construction and heavy-duty
              equipment from leading global manufacturers,
              helping businesses complete projects safely,
              efficiently and successfully.

            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-5">

              <Link
                href="/shop"
                className="rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
              >
                Shop Products
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0F172A]"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Company Story */}

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          <div>

            <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">

              Our Story

            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#0F172A]">

              Delivering Reliable Industrial Solutions

            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">

              Ironworks NZ was established with a simple goal:
              provide businesses with dependable industrial,
              engineering and construction products from
              manufacturers known for quality and performance.

            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">

              From small contractors to large industrial
              organizations, we help customers source equipment
              and tools that improve productivity while
              maintaining the highest standards of reliability.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">

            <div className="grid gap-8 sm:grid-cols-2">

              <div className="text-center">

                <Building2
                  className="mx-auto text-[#DC2626]"
                  size={50}
                />

                <h3 className="mt-5 text-xl font-bold">

                  Trusted Suppliers

                </h3>

                <p className="mt-3 text-gray-500">

                  Working with leading manufacturers.

                </p>

              </div>

              <div className="text-center">

                <ShieldCheck
                  className="mx-auto text-[#DC2626]"
                  size={50}
                />

                <h3 className="mt-5 text-xl font-bold">

                  Quality Assured

                </h3>

                <p className="mt-3 text-gray-500">

                  Products selected for reliability.

                </p>

              </div>

                            <div className="text-center">

                <Wrench
                  className="mx-auto text-[#DC2626]"
                  size={50}
                />

                <h3 className="mt-5 text-xl font-bold">

                  Professional Equipment

                </h3>

                <p className="mt-3 text-gray-500">

                  Premium tools and machinery for every project.

                </p>

              </div>

              <div className="text-center">

                <Users
                  className="mx-auto text-[#DC2626]"
                  size={50}
                />

                <h3 className="mt-5 text-xl font-bold">

                  Customer Focused

                </h3>

                <p className="mt-3 text-gray-500">

                  Building long-term partnerships through excellent service.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2">

            <div className="rounded-3xl border border-gray-200 p-10 shadow-sm">

              <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">

                Our Mission

              </span>

              <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">

                Empowering Every Project

              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">

                Our mission is to supply businesses,
                contractors and industries with dependable
                products that improve efficiency, safety
                and long-term performance.

              </p>

            </div>

            <div className="rounded-3xl border border-gray-200 p-10 shadow-sm">

              <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">

                Our Vision

              </span>

              <h2 className="mt-4 text-3xl font-bold text-[#0F172A]">

                Becoming New Zealand's Preferred Industrial Supplier

              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">

                We strive to become the first choice
                for industrial equipment by combining
                trusted brands, exceptional customer
                service and innovative solutions.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Core Values */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">

              Our Values

            </span>

            <h2 className="mt-4 text-4xl font-bold text-[#0F172A]">

              What Drives Our Business

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

              Every decision we make is guided by a
              commitment to quality, integrity and
              customer success.

            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-[#0F172A]">

                Quality

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                We source reliable products from
                globally recognized manufacturers.

              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-[#0F172A]">

                Integrity

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                Honest advice, transparent pricing
                and dependable customer service.

              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-[#0F172A]">

                Innovation

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                Continuously improving our products,
                services and customer experience.

              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">

              <h3 className="text-2xl font-bold text-[#0F172A]">

                Partnership

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                We succeed when our customers
                succeed.

              </p>

            </div>

          </div>

        </div>

      </section>

            {/* Why Choose Us */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">

                Why Choose Ironworks NZ

              </span>

              <h2 className="mt-4 text-4xl font-bold text-[#0F172A]">

                Your Trusted Industrial Partner

              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">

                We understand that every project demands
                reliable equipment and dependable suppliers.
                That's why we work hard to provide quality
                products backed by outstanding customer service.

              </p>

              <div className="mt-10 space-y-6">

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">

                    <ShieldCheck
                      size={22}
                      className="text-[#DC2626]"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-[#0F172A]">

                      Premium Quality Products

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Carefully sourced from trusted manufacturers
                      known for durability and performance.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">

                    <Users
                      size={22}
                      className="text-[#DC2626]"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-[#0F172A]">

                      Dedicated Customer Support

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Friendly assistance before, during and
                      after every purchase.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">

                    <Building2
                      size={22}
                      className="text-[#DC2626]"
                    />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-[#0F172A]">

                      Industry Experience

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Years of experience helping businesses
                      choose the right equipment.

                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div className="rounded-3xl bg-[#0F172A] p-10 text-center text-white">

                <h3 className="text-5xl font-bold text-[#DC2626]">

                  500+

                </h3>

                <p className="mt-4 text-gray-300">

                  Industrial Products

                </p>

              </div>

              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

                <h3 className="text-5xl font-bold text-[#DC2626]">

                  100+

                </h3>

                <p className="mt-4 text-gray-600">

                  Trusted Brands

                </p>

              </div>

              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

                <h3 className="text-5xl font-bold text-[#DC2626]">

                  24/7

                </h3>

                <p className="mt-4 text-gray-600">

                  Customer Support

                </p>

              </div>

              <div className="rounded-3xl bg-[#DC2626] p-10 text-center text-white">

                <h3 className="text-5xl font-bold">

                  100%

                </h3>

                <p className="mt-4 text-red-100">

                  Quality Commitment

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <h2 className="text-4xl font-bold text-white">

            Ready to Start Your Next Project?

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

            Browse our complete catalogue of industrial,
            engineering and construction products from
            leading global brands.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/shop"
              className="rounded-xl bg-[#DC2626] px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
            >

              Browse Products

            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-[#0F172A]"
            >

              Contact Us

            </Link>

          </div>

        </div>

      </section>

    </main>

  );
}