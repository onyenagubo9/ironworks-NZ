"use client";

import Link from "next/link";
import { X, Home, Store, Grid2X2, Tag, Heart, ShoppingCart, User, LogIn } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-bold text-[#0F172A]"
          >
            Global
            <span className="text-[#DC2626]">
              Trust
            </span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            <MenuLink
              href="/"
              icon={<Home size={20} />}
              label="Home"
              onClick={onClose}
            />

            <MenuLink
              href="/shop"
              icon={<Store size={20} />}
              label="Shop"
              onClick={onClose}
            />

            <MenuLink
              href="/categories"
              icon={<Grid2X2 size={20} />}
              label="Categories"
              onClick={onClose}
            />

            <MenuLink
              href="/brands"
              icon={<Tag size={20} />}
              label="Brands"
              onClick={onClose}
            />

            <MenuLink
              href="/wishlist"
              icon={<Heart size={20} />}
              label="Wishlist"
              onClick={onClose}
            />

            <MenuLink
              href="/cart"
              icon={<ShoppingCart size={20} />}
              label="Cart"
              onClick={onClose}
            />

            <MenuLink
              href="/account"
              icon={<User size={20} />}
              label="My Account"
              onClick={onClose}
            />

            <MenuLink
              href="/login"
              icon={<LogIn size={20} />}
              label="Login"
              onClick={onClose}
            />

          </div>

        </nav>

        {/* Footer */}

        <div className="border-t p-6">

          <p className="text-sm text-gray-500">
            Secure shopping with bank transfer and
            crypto payments.
          </p>

          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} ironworks.
            All rights reserved.
          </p>

        </div>

      </aside>
    </>
  );
}

interface MenuLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function MenuLink({
  href,
  icon,
  label,
  onClick,
}: MenuLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-red-50 hover:text-[#DC2626]"
    >
      {icon}

      <span className="font-medium">
        {label}
      </span>
    </Link>
  );
}