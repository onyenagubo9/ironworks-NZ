import Image from "next/image";

interface ViewCategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    featured: boolean;
    isActive: boolean;
    createdAt: Date;
    parent: {
      name: string;
    } | null;
    _count: {
      products: number;
    };
  };
}

export default function ViewCategoryCard({
  category,
}: ViewCategoryCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Image */}

        <div className="w-full lg:w-80">

          {category.imageUrl ? (

            <Image
              src={category.imageUrl}
              alt={category.name}
              width={400}
              height={400}
              className="rounded-2xl border object-cover"
            />

          ) : (

            <div className="flex h-80 items-center justify-center rounded-2xl border bg-gray-100">

              <p className="text-gray-400">
                No Image
              </p>

            </div>

          )}

        </div>

        {/* Details */}

        <div className="flex-1 space-y-6">

          <div>

            <h1 className="text-4xl font-bold text-[#0F172A]">
              {category.name}
            </h1>

            <p className="mt-2 text-gray-500">
              {category.slug}
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <InfoCard
              title="Products"
              value={category._count.products.toString()}
            />

            <InfoCard
              title="Parent Category"
              value={category.parent?.name ?? "None"}
            />

            <InfoCard
              title="Status"
              value={
                category.isActive
                  ? "Active"
                  : "Hidden"
              }
            />

            <InfoCard
              title="Featured"
              value={
                category.featured
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
              {category.description ||
                "No description"}
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