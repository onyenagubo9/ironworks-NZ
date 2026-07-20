"use client";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">

      <div className="flex flex-col items-center">

        {/* Spinner */}

        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-[#DC2626]" />

        <h2 className="mt-6 text-2xl font-bold text-[#0F172A]">
          Ironworks NZ
        </h2>

        <p className="mt-2 text-gray-500">
          Loading...
        </p>

      </div>

    </div>
  );
}