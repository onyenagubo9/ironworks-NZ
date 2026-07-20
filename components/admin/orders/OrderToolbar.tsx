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

export default function OrderToolbar() {
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

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      router.replace(
        `/admin/orders?${params.toString()}`
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
      `/admin/orders?${params.toString()}`
    );
  }

  function clearFilters() {
    router.push("/admin/orders");
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 xl:grid-cols-5">

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
            placeholder="Search by order #, customer..."
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

        {/* Order Status */}

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
            All Orders
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="CONFIRMED">
            Confirmed
          </option>

          <option value="PROCESSING">
            Processing
          </option>

          <option value="SHIPPED">
            Shipped
          </option>

          <option value="DELIVERED">
            Delivered
          </option>

          <option value="CANCELLED">
            Cancelled
          </option>

          <option value="REFUNDED">
            Refunded
          </option>

        </select>

        {/* Payment Status */}

        <select
          defaultValue={
            searchParams.get("payment") ?? ""
          }
          onChange={(e) =>
            updateFilter(
              "payment",
              e.target.value
            )
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="">
            Payment Status
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="FAILED">
            Failed
          </option>

          <option value="REFUNDED">
            Refunded
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

          <option value="amount-low">
            Amount ↑
          </option>

          <option value="amount-high">
            Amount ↓
          </option>

        </select>

      </div>

      <div className="mt-5 flex justify-end">

        <button
          type="button"
          onClick={clearFilters}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          <X size={16} />

          Clear Filters

        </button>

      </div>

    </div>
  );
}