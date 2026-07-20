"use client";

import { useState } from "react";

import {
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    alert(
      `Subscribed successfully: ${email}`
    );

    setEmail("");
  }

  return (
    <section className="bg-linear-to-r from-[#0F172A] via-slate-900 to-[#0F172A] py-24">

      <div className="mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-800/70 p-10 backdrop-blur lg:p-16">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DC2626]">

              <Mail
                size={38}
                className="text-white"
              />

            </div>

            <h2 className="mt-8 text-4xl font-extrabold text-white lg:text-5xl">

              Stay Updated

            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">

              Subscribe to receive exclusive
              offers, new product arrivals,
              industry updates and special
              promotions from Ironworks NZ.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-12 max-w-2xl"
            >

              <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-xl md:flex-row">

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl border border-gray-200 px-5 py-4 outline-none focus:border-[#DC2626]"
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-8 py-4 font-semibold text-white transition hover:bg-red-700"
                >
                  Subscribe

                  <ArrowRight size={18} />

                </button>

              </div>

            </form>

            {/* Benefits */}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">

              <span>
                ✓ Exclusive Discounts
              </span>

              <span>
                ✓ New Product Alerts
              </span>

              <span>
                ✓ Industry News
              </span>

              <span>
                ✓ No Spam
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}