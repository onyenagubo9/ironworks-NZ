import { Metadata } from "next";
import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Ironworks NZ",
  description:
    "Get in touch with Ironworks NZ. We're here to help with product enquiries, orders and support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

              Contact Ironworks NZ

            </span>

            <h1 className="mt-8 text-5xl font-bold text-white">

              We'd Love to Hear From You

            </h1>

            <p className="mt-8 text-xl leading-9 text-gray-300">

              Whether you have a question about our products,
              your order, or need expert advice, our team is
              ready to help.

            </p>

          </div>

        </div>

      </section>

      {/* Contact Details */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-8 shadow-sm text-center">

            <Mail
              className="mx-auto text-[#DC2626]"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold">

              Email

            </h3>

            <p className="mt-3 text-gray-600">

              admin@ironworks-nz.site

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm text-center">

            <Phone
              className="mx-auto text-[#DC2626]"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold">

              Phone

            </h3>

            <p className="mt-3 text-gray-600">

              +64 XXX XXX XXX

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm text-center">

            <MapPin
              className="mx-auto text-[#DC2626]"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold">

              Address

            </h3>

            <p className="mt-3 text-gray-600">

              Auckland,
              New Zealand

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm text-center">

            <Clock
              className="mx-auto text-[#DC2626]"
              size={42}
            />

            <h3 className="mt-5 text-xl font-bold">

              Business Hours

            </h3>

            <p className="mt-3 text-gray-600">

              Mon – Fri
              <br />
              8:00 AM – 5:00 PM

            </p>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="pb-24">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2">

                        {/* Contact Form */}

            <div className="rounded-3xl bg-white p-10 shadow-lg">

              <h2 className="text-3xl font-bold text-[#0F172A]">

                Send Us a Message

              </h2>

              <p className="mt-3 text-gray-500">

                Complete the form below and our team will get
                back to you as soon as possible.

              </p>

              <form className="mt-10 space-y-6">

                <div className="grid gap-6 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block font-medium text-[#0F172A]">

                      First Name

                    </label>

                    <input
                      type="text"
                      placeholder="John"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#DC2626]
                      "
                    />

                  </div>

                  <div>

                    <label className="mb-2 block font-medium text-[#0F172A]">

                      Last Name

                    </label>

                    <input
                      type="text"
                      placeholder="Doe"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#DC2626]
                      "
                    />

                  </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block font-medium text-[#0F172A]">

                      Email Address

                    </label>

                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#DC2626]
                      "
                    />

                  </div>

                  <div>

                    <label className="mb-2 block font-medium text-[#0F172A]">

                      Phone Number

                    </label>

                    <input
                      type="tel"
                      placeholder="+64..."
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#DC2626]
                      "
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium text-[#0F172A]">

                    Subject

                  </label>

                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-[#DC2626]
                    "
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium text-[#0F172A]">

                    Message

                  </label>

                  <textarea
                    rows={7}
                    placeholder="Write your message here..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      outline-none
                      transition
                      focus:border-[#DC2626]
                    "
                  />

                </div>

                <button
                  type="submit"
                  className="
                    w-full
                    rounded-xl
                    bg-[#DC2626]
                    px-6
                    py-4
                    text-lg
                    font-semibold
                    text-white
                    transition
                    hover:bg-red-700
                  "
                >

                  Send Message

                </button>

              </form>

            </div>
                        {/* Company Information */}

            <div className="space-y-8">

              {/* Contact Information */}

              <div className="rounded-3xl bg-white p-10 shadow-lg">

                <h2 className="text-3xl font-bold text-[#0F172A]">

                  Get In Touch

                </h2>

                <p className="mt-4 text-gray-600">

                  We're committed to providing fast, friendly,
                  and professional support. Contact us using any
                  of the methods below.

                </p>

                <div className="mt-10 space-y-8">

                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                      <Mail
                        size={26}
                        className="text-[#DC2626]"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-[#0F172A]">

                        Email Address

                      </h3>

                      <p className="mt-2 text-gray-600">

                        admin@ironworks-nz.site

                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                      <Phone
                        size={26}
                        className="text-[#DC2626]"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-[#0F172A]">

                        Phone

                      </h3>

                      <p className="mt-2 text-gray-600">

                        +64 XXX XXX XXX

                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                      <MapPin
                        size={26}
                        className="text-[#DC2626]"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-[#0F172A]">

                        Office Address

                      </h3>

                      <p className="mt-2 text-gray-600">

                        Auckland,
                        New Zealand

                      </p>

                    </div>

                  </div>

                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

                      <Clock
                        size={26}
                        className="text-[#DC2626]"
                      />

                    </div>

                    <div>

                      <h3 className="text-lg font-bold text-[#0F172A]">

                        Office Hours

                      </h3>

                      <p className="mt-2 text-gray-600">

                        Monday – Friday

                        <br />

                        8:00 AM – 5:00 PM

                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Map */}

              <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

                <div className="flex h-80 items-center justify-center bg-gray-100">

                  <div className="text-center">

                    <MapPin
                      size={60}
                      className="mx-auto text-[#DC2626]"
                    />

                    <h3 className="mt-5 text-2xl font-bold text-[#0F172A]">

                      Google Maps

                    </h3>

                    <p className="mt-3 text-gray-500">

                      Embed your Google Map here.

                    </p>

                  </div>

                </div>

              </div>

              {/* FAQ */}

              <div className="rounded-3xl bg-white p-10 shadow-lg">

                <h2 className="text-3xl font-bold text-[#0F172A]">

                  Frequently Asked Questions

                </h2>

                <div className="mt-8 space-y-8">

                  <div>

                    <h3 className="text-lg font-semibold text-[#0F172A]">

                      How quickly do you respond?

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Most enquiries receive a response within
                      one business day.

                    </p>

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-[#0F172A]">

                      Can I request a quotation?

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Yes. Contact us with the products you're
                      interested in and we'll prepare a quote.

                    </p>

                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-[#0F172A]">

                      Do you provide product support?

                    </h3>

                    <p className="mt-2 text-gray-600">

                      Absolutely. Our team can help you choose
                      the right equipment and answer technical
                      questions.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* Call To Action */}

      <section className="bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">

        <div className="mx-auto max-w-5xl px-6 py-24 text-center">

          <span className="inline-flex rounded-full bg-red-500/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-red-300">

            We're Here To Help

          </span>

          <h2 className="mt-6 text-4xl font-bold text-white">

            Let's Build Something Great Together

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

            Whether you're sourcing industrial equipment,
            requesting a quotation, or looking for expert
            advice, our experienced team is ready to help
            you find the right solution.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/shop"
              className="
                rounded-xl
                bg-[#DC2626]
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >

              Browse Products

            </Link>

            <Link
              href="/about"
              className="
                rounded-xl
                border
                border-white
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-white
                hover:text-[#0F172A]
              "
            >

              Learn More About Us

            </Link>

          </div>

        </div>

      </section>

    </main>

  );
}