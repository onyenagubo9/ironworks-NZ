"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  Menu,
  User,
} from "lucide-react";

import SearchBar from "./SearchBar";
import CartBadge from "@/components/frontend/cart/CartBadge";

interface NavbarProps {
  onOpenMobileMenu?: () => void;
}

export default function Navbar({
  onOpenMobileMenu,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

              <Image
                src="/ironwork.png"
                alt="Ironworks NZ"
                fill
                className="object-contain p-2"
                priority
              />

            </div>

            <div className="hidden sm:block">

              <h1 className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                Ironworks
                <span className="ml-1 text-[#DC2626]">
                  NZ
                </span>
              </h1>

              <p className="-mt-1 text-xs tracking-wide text-gray-500">
                Industrial & Construction Supplies
              </p>

            </div>

          </Link>

        </div>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">

          <NavLink href="/">
            Home
          </NavLink>

          <NavLink href="/shop">
            Shop
          </NavLink>

          <NavLink href="/categories">
            Categories
          </NavLink>

          <NavLink href="/brands">
            Brands
          </NavLink>

          <NavLink href="/about">
            About
          </NavLink>

          <NavLink href="/contact">
            Contact
          </NavLink>

        </nav>

        {/* Search */}

        <div className="mx-8 hidden max-w-md flex-1 lg:block">

          <SearchBar />

        </div>

        {/* Right */}

        <div className="flex items-center gap-2">

          {/* Wishlist */}

          <Link
            href="/wishlist"
            className="relative rounded-xl p-3 transition hover:bg-gray-100"
          >
            <Heart size={22} />

            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#DC2626]
                text-xs
                font-semibold
                text-white
              "
            >
              0
            </span>

          </Link>

          {/* Cart */}

          <CartBadge />

          {/* Account */}

          <Link
            href="/account"
            className="rounded-xl p-3 transition hover:bg-gray-100"
          >
            <User size={22} />
          </Link>

        </div>

      </div>

      {/* Mobile Search */}

      <div className="border-t bg-white p-4 lg:hidden">

        <SearchBar />

      </div>

    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({
  href,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className="
        relative
        font-medium
        text-gray-700
        transition
        duration-200
        hover:text-[#DC2626]
        after:absolute
        after:bottom-1.5
        after:left-0
        after:h-0.5
        after:w-0
        after:bg-[#DC2626]
        after:transition-all
        after:duration-300
        hover:after:w-full
      "
    >
      {children}
    </Link>
  );
}