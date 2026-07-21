import type { ReactNode } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  Heart,
  MapPin,
  User,
  Shield,
  Settings,
  ShoppingBag,
} from "lucide-react";

import { auth } from "@/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: Package,
    },
    {
      title: "Wishlist",
      href: "/dashboard/wishlist",
      icon: Heart,
    },
    {
      title: "Addresses",
      href: "/dashboard/addresses",
      icon: MapPin,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Security",
      href: "/dashboard/security",
      icon: Shield,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside
        className="
          fixed
          inset-y-0
          left-0
          hidden
          w-72
          border-r
          border-gray-200
          bg-white
          lg:flex
          lg:flex-col
        "
      >

        {/* Logo */}

        <div className="border-b border-gray-200 px-8 py-7">

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DC2626] text-white">

              <ShoppingBag size={26} />

            </div>

            <div>

              <h1 className="text-xl font-bold text-[#0F172A]">
                Ironworks NZ
              </h1>

              <p className="text-sm text-gray-500">
                Customer Portal
              </p>

            </div>

          </Link>

        </div>

                {/* Customer Profile */}

        <div className="border-b border-gray-200 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DC2626] text-xl font-bold text-white">

              {session.user.firstName.charAt(0)}
              {session.user.lastName.charAt(0)}

            </div>

            <div className="min-w-0 flex-1">

              <h2 className="truncate text-lg font-bold text-[#0F172A]">

                {session.user.firstName}{" "}
                {session.user.lastName}

              </h2>

              <p className="truncate text-sm text-gray-500">

                {session.user.email}

              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <div className="space-y-2">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    px-4
                    py-3
                    text-gray-700
                    transition-all
                    duration-200
                    hover:bg-red-50
                    hover:text-[#DC2626]
                  "
                >

                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </Link>

              );

            })}

          </div>

        </nav>

        {/* Sidebar Footer */}

        <div className="border-t border-gray-200 p-5">

          <Link
            href="/shop"
            className="
              mb-3
              flex
              items-center
              justify-center
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            Continue Shopping
          </Link>

          <form
            action={async () => {
              "use server";

              const { signOut } = await import("@/auth");

              await signOut({
                redirectTo: "/login",
              });
            }}
          >

            <button
              type="submit"
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#DC2626]
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              Logout
            </button>

          </form>

        </div>

      </aside>

            {/* Main Content */}

      <div className="flex min-h-screen flex-1 flex-col lg:ml-72">

        {/* Top Header */}

        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">

          <div className="flex h-20 items-center justify-between px-6 lg:px-10">

            {/* Welcome */}

            <div>

              <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Customer Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#0F172A]">

                Welcome back,
                {" "}
                {session.user.firstName}

              </h1>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-5">

              {/* Notifications */}

              <button
                type="button"
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  transition
                  hover:bg-gray-100
                "
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-600"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848
                    23.848 0 005.454-1.31A8.967
                    8.967 0 0118 9.75v-.7V9a6
                    6 0 10-12 0v.75c0
                    2.003-.658 3.95-1.857
                    5.422a23.848 23.848 0
                    005.454 1.31m5.26
                    0a24.255 24.255 0
                    01-5.714 0m5.714
                    0a3 3 0 11-5.714
                    0"
                  />

                </svg>

                <span
                  className="
                    absolute
                    right-2
                    top-2
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#DC2626]
                  "
                />

              </button>

              {/* User */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#DC2626]
                    text-lg
                    font-bold
                    text-white
                  "
                >

                  {session.user.firstName.charAt(0)}
                  {session.user.lastName.charAt(0)}

                </div>

                <div className="hidden md:block">

                  <h3 className="font-semibold text-[#0F172A]">

                    {session.user.firstName}
                    {" "}
                    {session.user.lastName}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {session.user.email}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </header>

        {/* Dashboard Content */}

        <main className="flex-1 bg-gray-50 p-6 lg:p-10">

          {children}

                  </main>

        {/* Footer */}

        <footer className="border-t border-gray-200 bg-white">

          <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-gray-500 md:flex-row lg:px-10">

            <p>
              © {new Date().getFullYear()} GlobalTrust.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <Link
                href="/shop"
                className="transition hover:text-[#DC2626]"
              >
                Shop
              </Link>

              <Link
                href="/contact"
                className="transition hover:text-[#DC2626]"
              >
                Contact
              </Link>

              <Link
                href="/privacy"
                className="transition hover:text-[#DC2626]"
              >
                Privacy Policy
              </Link>

            </div>

          </div>

        </footer>

      </div>

    </div>

  );
}