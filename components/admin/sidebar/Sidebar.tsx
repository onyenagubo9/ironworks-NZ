"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  FolderTree,
  Tags,
  Boxes,
  ClipboardList,
  Users,
  Star,
  TicketPercent,
  Image,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  mobile?: boolean;
}

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Tags,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    title: "Banners",
    href: "/admin/banners",
    icon: Image,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  mobile = false,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-full flex-col bg-[#0F172A] text-white"
          : "fixed left-0 top-0 hidden h-screen w-72 flex-col bg-[#0F172A] text-white shadow-2xl lg:flex"
      }
    >
      {/* Logo */}
      <div className="border-b border-slate-700 px-8 py-7">
        <h1 className="text-3xl font-bold tracking-wide text-white">
          E-Commerce
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Administration Panel
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">

          {menus.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300

                ${
                  active
                    ? "bg-[#DC2626] text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
                `}
              >
                <Icon
                  size={20}
                  className={`transition ${
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );

          })}

        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-5">

        <button
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[#DC2626]
          px-5
          py-3
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>
    </aside>
  );
}