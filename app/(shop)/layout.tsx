import type { Metadata } from "next";

import StorefrontLayout from "@/components/frontend/layout/StorefrontLayout";

export const metadata: Metadata = {
  title: {
    default: "Ironworks NZ",
    template: "%s | Ironworks NZ",
  },

  description:
    "Ironworks NZ is your trusted supplier of premium steel, industrial hardware, fabrication equipment, and construction materials across New Zealand.",

  keywords: [
    "Ironworks NZ",
    "Steel",
    "Industrial",
    "Construction",
    "Hardware",
    "New Zealand",
  ],
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StorefrontLayout>
      {children}
    </StorefrontLayout>
  );
}