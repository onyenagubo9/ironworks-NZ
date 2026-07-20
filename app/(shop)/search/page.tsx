import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import SearchHeader from "@/components/frontend/search/SearchHeader";
import SearchResults from "@/components/frontend/search/SearchResults";
import EmptySearch from "@/components/frontend/search/EmptySearch";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const query = params.q?.trim() ?? "";

  if (!query) {
    return <EmptySearch query="" />;
  }

  const products =
    await prisma.product.findMany({
      where: {
        status: "ACTIVE",

        OR: [
          {
            name: {
              contains: query,
              mode: Prisma.QueryMode.insensitive,
            },
          },

          {
            sku: {
              contains: query,
              mode: Prisma.QueryMode.insensitive,
            },
          },

          {
            tags: {
              has: query,
            },
          },

          {
            category: {
              name: {
                contains: query,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },

          {
            brand: {
              name: {
                contains: query,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        ],
      },

      include: {
        category: true,

        brand: true,

        images: {
          where: {
            isCover: true,
          },

          take: 1,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  const formattedProducts =
    products.map((product) => ({
      id: product.id,

      name: product.name,

      slug: product.slug,

      price: Number(product.price),

      comparePrice: product.comparePrice
        ? Number(product.comparePrice)
        : null,

      featured: product.featured,

      category: {
        name: product.category.name,
      },

      brand: product.brand
        ? {
            name: product.brand.name,
          }
        : null,

      images: product.images.map((image) => ({
        imageUrl: image.imageUrl,
      })),
    }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      <SearchHeader
        query={query}
        total={formattedProducts.length}
      />

      {formattedProducts.length === 0 ? (
        <EmptySearch query={query} />
      ) : (
        <SearchResults
          products={formattedProducts}
        />
      )}

    </div>
  );
}