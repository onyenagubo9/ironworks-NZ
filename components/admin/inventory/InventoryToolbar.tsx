"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Search,
  X,
} from "lucide-react";

export default function InventoryToolbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.replace(
        `/admin/inventory?${params.toString()}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  function updateFilter(
    key: string,
    value: string
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");

    router.push(
      `/admin/inventory?${params.toString()}`
    );
  }

  function clearFilters() {
    router.push("/admin/inventory");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-4">

        {/* Search */}

        <div className="relative lg:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by product name or SKU..."
            className="
              w-full
              rounded-xl
              border
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-[#DC2626]
            "
          />

        </div>

        {/* Stock Filter */}

        <select
          defaultValue={
            searchParams.get("stock") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "stock",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
        >
          <option value="">
            All Stock
          </option>

          <option value="in">
            In Stock
          </option>

          <option value="low">
            Low Stock
          </option>

          <option value="out">
            Out of Stock
          </option>

        </select>

        {/* Clear Filters */}

        <button
          type="button"
          onClick={clearFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            px-4
            py-3
            transition
            hover:bg-gray-50
          "
        >
          <X size={18} />

          Clear Filters

        </button>

      </div>

    </div>
  );
}