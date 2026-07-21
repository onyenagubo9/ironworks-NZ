import Image from "next/image";
import Link from "next/link";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#0F172A] text-white">

      {/* Main Footer */}

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-5">

        {/* Company */}

        <div className="lg:col-span-2">

          <Link
            href="/"
            className="inline-flex items-center gap-4"
          >

            <Image
              src="/ironwork.png"
              alt="Ironworks NZ"
              width={70}
              height={70}
              priority
            />

            <div>

              <h2 className="text-3xl font-extrabold tracking-tight">

                Ironworks

                <span className="text-[#DC2626]">
                  {" "}NZ
                </span>

              </h2>

              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">

                Industrial & Steel Supplies

              </p>

            </div>

          </Link>

          <p className="mt-8 max-w-md leading-8 text-gray-300">

            Ironworks NZ supplies premium steel,
            construction materials, fabrication
            equipment and industrial hardware to
            professionals across New Zealand.

          </p>

          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-4">

              <Phone
                size={18}
                className="text-[#DC2626]"
              />

              <span>+64 44881839</span>

            </div>

            <div className="flex items-center gap-4">

              <Mail
                size={18}
                className="text-[#DC2626]"
              />

              <span>

                support@ironworksnz.co.nz

              </span>

            </div>

            <div className="flex items-start gap-4">

              <MapPin
                size={18}
                className="mt-1 text-[#DC2626]"
              />

              <span>

                Auckland,
                New Zealand

              </span>

            </div>

          </div>

        </div>

        {/* Shop */}

        <div>

          <h3 className="mb-6 text-xl font-semibold">

            Shop

          </h3>

          <div className="space-y-4">

            <FooterLink
              href="/shop"
              label="All Products"
            />

            <FooterLink
              href="/categories"
              label="Categories"
            />

            <FooterLink
              href="/brands"
              label="Brands"
            />

            <FooterLink
              href="/new-arrivals"
              label="New Arrivals"
            />

            <FooterLink
              href="/featured"
              label="Featured Products"
            />

          </div>

        </div>

                {/* Customer Service */}

        <div>

          <h3 className="mb-6 text-xl font-semibold">
            Customer Service
          </h3>

          <div className="space-y-4">

            <FooterLink
              href="/contact"
              label="Contact Us"
            />

            <FooterLink
              href="/faq"
              label="FAQs"
            />

            <FooterLink
              href="/shipping"
              label="Shipping Information"
            />

            <FooterLink
              href="/returns"
              label="Returns & Refunds"
            />

            <FooterLink
              href="/privacy"
              label="Privacy Policy"
            />

            <FooterLink
              href="/terms"
              label="Terms & Conditions"
            />

          </div>

        </div>

        {/* Newsletter */}

        <div>

          <h3 className="mb-6 text-xl font-semibold">
            Stay Updated
          </h3>

          <p className="mb-6 leading-7 text-gray-300">

            Subscribe to receive new product
            announcements, special offers and
            exclusive discounts from Ironworks NZ.

          </p>

          <form className="space-y-4">

            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                rounded-xl
                border
                border-gray-700
                bg-[#1E293B]
                px-4
                py-3
                outline-none
                transition
                focus:border-[#DC2626]
              "
            />

            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-[#DC2626]
                py-3
                font-semibold
                transition
                hover:bg-red-700
              "
            >
              Subscribe
            </button>

          </form>

          {/* Social Media */}

          <div className="mt-8">

            <h4 className="mb-4 font-semibold">
              Follow Us
            </h4>

            <div className="flex gap-3">

              <SocialLink href="#">

                <FaFacebookF size={18} />

              </SocialLink>

              <SocialLink href="#">

                <FaInstagram size={18} />

              </SocialLink>

              <SocialLink href="#">

                <FaXTwitter size={18} />

              </SocialLink>

              <SocialLink href="#">

                <FaLinkedinIn size={18} />

              </SocialLink>

            </div>

          </div>

        </div>

      </div>

            {/* Why Choose Ironworks NZ */}

      <div className="border-t border-gray-800">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Premium Quality
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              We source high-quality steel,
              construction materials and industrial
              products from trusted manufacturers.
            </p>

          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">
              Fast NZ Delivery
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Reliable nationwide shipping across
              New Zealand with secure packaging and
              fast dispatch.
            </p>

          </div>

          <div>

            <h3 className="text-lg font-semibold text-white">
              Secure Payments
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Shop confidently using secure bank
              transfer payments with payment receipt
              verification.
            </p>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Ironworks NZ.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">

            <Link
              href="/privacy"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/shipping"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Shipping
            </Link>

            <Link
              href="/returns"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Returns
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

/* -------------------------------- */
/* Footer Link */
/* -------------------------------- */

interface FooterLinkProps {
  href: string;
  label: string;
}

function FooterLink({
  href,
  label,
}: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="block text-gray-300 transition hover:translate-x-1 hover:text-[#DC2626]"
    >
      {label}
    </Link>
  );
}

/* -------------------------------- */
/* Social Link */
/* -------------------------------- */

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

function SocialLink({
  href,
  children,
}: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-[#1E293B]
        text-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-[#DC2626]
      "
    >
      {children}
    </Link>
  );
}