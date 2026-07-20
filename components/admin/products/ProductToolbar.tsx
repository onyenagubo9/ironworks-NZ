"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductToolbarProps {
  categories: {
    id: string;
    name: string;
  }[];

  brands: {
    id: string;
    name: string;
  }[];
}

export default function ProductToolbar({
  categories,
  brands,
}: ProductToolbarProps) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.replace(
        `/admin/products?${params.toString()}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

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
      `/admin/products?${params.toString()}`
    );
  }

  function clearFilters() {
    router.push("/admin/products");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 xl:grid-cols-6">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-[#DC2626]"
          />

        </div>

        {/* Category */}

        <select
          defaultValue={
            searchParams.get("category") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "category",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Brand */}

        <select
          defaultValue={
            searchParams.get("brand") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "brand",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="">
            All Brands
          </option>

          {brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          defaultValue={
            searchParams.get("status") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "status",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="">
            All Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="DRAFT">
            Draft
          </option>

          <option value="ARCHIVED">
            Archived
          </option>

        </select>

        {/* Sort */}

        <select
          defaultValue={
            searchParams.get("sort") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "sort",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="name">
            Name
          </option>

          <option value="price-low">
            Price ↑
          </option>

          <option value="price-high">
            Price ↓
          </option>

        </select>

      </div>

      <div className="mt-4 flex justify-end">

        <button
          onClick={clearFilters}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-50"
        >
          <X size={16} />

          Clear Filters

        </button>

      </div>

    </div>
  );
}