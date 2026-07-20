"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  X,
} from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] =
    useState("");

  function clearSearch() {
    setQuery("");
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const value = query.trim();

    if (!value) return;

    router.push(
      `/search?q=${encodeURIComponent(value)}`
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full"
    >
      {/* Search Icon */}

      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}

      <input
        type="search"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search products, brands or categories..."
        className="
          h-13
          w-full
          rounded-full
          border
          border-gray-300
          bg-white
          pl-12
          pr-28
          text-sm
          outline-none
          transition-all
          focus:border-[#DC2626]
          focus:ring-4
          focus:ring-red-100
        "
      />

      {/* Clear */}

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-22 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
        >
          <X size={18} />
        </button>
      )}

      {/* Search Button */}

      <button
        type="submit"
        className="
          absolute
          right-1
          top-1
          bottom-1
          rounded-full
          bg-[#DC2626]
          px-6
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
      >
        Search
      </button>

    </form>
  );
}