import Link from "next/link";

import {
  Building2,
  Landmark,
  Truck,
  Mail,
  Globe,
  Shield,
  ChevronRight,
} from "lucide-react";

const settings = [
  {
    title: "Bank Accounts",
    description:
      "Manage bank accounts customers use for bank transfers.",
    icon: Landmark,
    href: "/admin/settings/bank-accounts",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Company Information",
    description:
      "Store name, logo, address, email and phone.",
    icon: Building2,
    href: "/admin/settings/company",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Shipping",
    description:
      "Configure shipping methods and delivery charges.",
    icon: Truck,
    href: "/admin/settings/shipping",
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Email",
    description:
      "Manage email notifications and SMTP settings.",
    icon: Mail,
    href: "/admin/settings/email",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "SEO",
    description:
      "Configure default SEO metadata for your store.",
    icon: Globe,
    href: "/admin/settings/seo",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    title: "Security",
    description:
      "Manage administrator security preferences.",
    icon: Shield,
    href: "/admin/settings/security",
    color: "bg-red-100 text-red-700",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your store configuration and business preferences.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <ChevronRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1"
                />

              </div>

              <h2 className="mt-6 text-xl font-semibold text-[#0F172A]">
                {item.title}
              </h2>

              <p className="mt-3 leading-7 text-gray-500">
                {item.description}
              </p>

            </Link>
          );
        })}

      </div>

    </div>
  );
}