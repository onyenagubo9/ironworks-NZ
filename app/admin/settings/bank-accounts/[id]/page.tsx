import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Note: If you already have a separate edit form component, replace this import path accordingly
import BankAccountForm from "@/components/admin/settings/BankAccountForm";

interface EditBankAccountPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBankAccountPage({
  params,
}: EditBankAccountPageProps) {
  const { id } = await params;

  const bankAccount = await prisma.bankAccount.findUnique({
    where: { id },
  });

  if (!bankAccount) {
    notFound();
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings/bank-accounts"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-[#0F172A]">
            <Building2 className="text-[#DC2626]" /> Edit Bank Account
          </h1>
          <p className="text-sm text-gray-500">
            Update bank account details used for customer transfers.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <BankAccountForm initialData={bankAccount} />
      </div>
    </div>
  );
}