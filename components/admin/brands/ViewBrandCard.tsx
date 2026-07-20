import Image from "next/image";

interface ViewBrandCardProps {
  brand: {
    id: string;

    name: string;

    slug: string;

    description: string | null;

    website: string | null;

    logoUrl: string | null;

    featured: boolean;

    isActive: boolean;

    seoTitle: string | null;

    seoDescription: string | null;

    createdAt: Date;

    _count: {
      products: number;
    };
  };
}

export default function ViewBrandCard({
  brand,
}: ViewBrandCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Logo */}

        <div className="w-full lg:w-80">

          {brand.logoUrl ? (

            <Image
              src={brand.logoUrl}
              alt={brand.name}
              width={400}
              height={400}
              className="rounded-2xl border object-contain bg-white"
            />

          ) : (

            <div className="flex h-80 items-center justify-center rounded-2xl border bg-gray-100">

              <p className="text-gray-400">
                No Logo
              </p>

            </div>

          )}

        </div>

        {/* Details */}

        <div className="flex-1 space-y-6">

          <div>

            <h1 className="text-4xl font-bold text-[#0F172A]">
              {brand.name}
            </h1>

            <p className="mt-2 text-gray-500">
              {brand.slug}
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <InfoCard
              title="Products"
              value={brand._count.products.toString()}
            />

            <InfoCard
              title="Website"
              value={
                brand.website ?? "-"
              }
            />

            <InfoCard
              title="Status"
              value={
                brand.isActive
                  ? "Active"
                  : "Hidden"
              }
            />

            <InfoCard
              title="Featured"
              value={
                brand.featured
                  ? "Yes"
                  : "No"
              }
            />

          </div>

          <div>

            <h2 className="mb-2 text-xl font-bold">
              Description
            </h2>

            <p className="text-gray-600">
              {brand.description ??
                "No description"}
            </p>

          </div>

          <div>

            <h2 className="mb-2 text-xl font-bold">
              SEO Title
            </h2>

            <p className="text-gray-600">
              {brand.seoTitle ??
                "-"}
            </p>

          </div>

          <div>

            <h2 className="mb-2 text-xl font-bold">
              SEO Description
            </h2>

            <p className="text-gray-600">
              {brand.seoDescription ??
                "-"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-gray-50 p-5">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold text-[#0F172A]">
        {value}
      </h3>

    </div>
  );
}