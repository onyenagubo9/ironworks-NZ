"use client";

import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

import { CartProvider } from "@/context/CartProvider";

import PageLoader from "@/components/ui/PageLoader";

interface StorefrontLayoutProps {
  children: React.ReactNode;
}

export default function StorefrontLayout({
  children,
}: StorefrontLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <CartProvider>

      <div className="flex min-h-screen flex-col bg-gray-50">

        {/* Top Bar */}

        <TopBar />

        {/* Navigation */}

        <Navbar
          onOpenMobileMenu={() =>
            setMobileMenuOpen(true)
          }
        />

        {/* Mobile Menu */}

        <MobileMenu
          open={mobileMenuOpen}
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />

        {/* Main Content */}

        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}

        <Footer />

      </div>

    </CartProvider>
  );
}