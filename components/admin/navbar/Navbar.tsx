"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

interface NavbarProps {
  setSidebarOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Navbar({
  setSidebarOpen,
}: NavbarProps) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "A";

  return (
    <header
      className="
      sticky
      top-0
      z-40
      flex
      h-20
      items-center
      justify-between
      border-b
      border-gray-200
      bg-white/95
      px-4
      shadow-sm
      backdrop-blur
      lg:px-8
    "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen?.(true)}
          className="
            rounded-xl
            p-2
            hover:bg-gray-100
            lg:hidden
          "
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            Dashboard
          </h1>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={15} />

            {today}
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="hidden flex-1 justify-center px-10 xl:flex">

        <div className="relative w-full max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              py-3
              pl-11
              pr-5
              transition-all
              outline-none
              focus:border-[#DC2626]
              focus:bg-white
              focus:ring-2
              focus:ring-red-100
            "
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <button
          className="
            relative
            rounded-xl
            border
            border-gray-200
            bg-white
            p-3
            hover:bg-gray-100
          "
        >
          <Bell size={20} />

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

        <button
          className="
            hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            p-3
            hover:bg-gray-100
            md:block
          "
        >
          <Settings size={20} />
        </button>

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button
            onClick={() => setOpen(!open)}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-gray-200
              bg-white
              px-3
              py-2
              hover:bg-gray-50
            "
          >

            <div className="relative">

              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0F172A]
                    font-bold
                    text-white
                  "
                >
                  {initials}
                </div>
              )}

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-white
                  bg-green-500
                "
              />

            </div>

            <div className="hidden text-left lg:block">

              <h3 className="font-semibold text-[#0F172A]">
                {session?.user?.name || "Administrator"}
              </h3>

              <p className="max-w-45 truncate text-sm text-gray-500">
                {session?.user?.email}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-gray-500"
            />

          </button>

          {open && (

            <div
              className="
                absolute
                right-0
                mt-4
                w-64
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
              "
            >

              <div className="border-b p-5">

                <p className="font-semibold">
                  {session?.user?.name}
                </p>

                <p className="truncate text-sm text-gray-500">
                  {session?.user?.email}
                </p>

              </div>

              <button
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  hover:bg-gray-100
                "
              >
                <User size={18} />

                My Profile

              </button>

              <button
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  hover:bg-gray-100
                "
              >
                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={() => signOut()}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-t
                  px-5
                  py-4
                  text-[#DC2626]
                  hover:bg-red-50
                "
              >
                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}