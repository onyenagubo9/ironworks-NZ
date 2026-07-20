"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";

export default function CategoryToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [status, setStatus] = useState(
    searchParams.get("status") ?? ""
  );

  const [featured, setFeatured] = useState(
    searchParams.get("featured") ?? ""
  );

  const [sort, setSort] = useState(
    searchParams.get("sort") ?? "newest"
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);

      if (status) params.set("status", status);

      if (featured) params.set("featured", featured);

      if (sort) params.set("sort", sort);

      router.push(
        `/admin/categories?${params.toString()}`
      );
    }, 400);

    return () => clearTimeout(timeout);
  }, [
    search,
    status,
    featured,
    sort,
    router,
  ]);

  function clearFilters() {
    setSearch("");

    setStatus("");

    setFeatured("");

    setSort("newest");

    router.push("/admin/categories");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 xl:flex-row">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-4 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search category by name or slug..."
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-[#DC2626]
            "
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#DC2626]
          "
        >
          <option value="">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="hidden">
            Hidden
          </option>

        </select>

        {/* Featured */}

        <select
          value={featured}
          onChange={(e) =>
            setFeatured(e.target.value)
          }
          className="
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#DC2626]
          "
        >
          <option value="">
            All Categories
          </option>

          <option value="true">
            Featured
          </option>

          <option value="false">
            Not Featured
          </option>

        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            rounded-xl
            border
            border-gray-300
            bg-white
            px-4
            py-3
            outline-none
            transition
            focus:border-[#DC2626]
          "
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="name-asc">
            Name A-Z
          </option>

          <option value="name-desc">
            Name Z-A
          </option>

        </select>

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white
            px-5
            py-3
            font-medium
            text-[#0F172A]
            transition
            hover:bg-gray-100
          "
        >
          <RotateCcw size={18} />

          Clear

        </button>

        {/* Filter Indicator */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#0F172A]
            px-5
            py-3
            font-semibold
            text-white
          "
        >
          <Filter size={18} />

          Filters

        </div>

      </div>

    </div>
  );
}