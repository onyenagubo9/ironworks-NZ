import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

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

  const bankAccount =
    await prisma.bankAccount.findUnique({
      where: {
        id,
      },
    });

  if (!bankAccount) {
    notFound();
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <Link
          href="/admin/settings/bank-accounts"
          className="mb-4 inline-flex items-center gap-2 text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={18} />

          Back to Bank Accounts
        </Link>

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Edit Bank Account
        </h1>

        <p className="mt-2 text-gray-500">
          Update your bank account information.
        </p>

      </div>

      <BankAccountForm
        initialData={{
          id: bankAccount.id,

          bankName: bankAccount.bankName,

          accountName:
            bankAccount.accountName,

          accountNumber:
            bankAccount.accountNumber,

          branchName:
            bankAccount.branchName,

          swiftCode:
            bankAccount.swiftCode,

          instructions:
            bankAccount.instructions,

          isActive:
            bankAccount.isActive,
        }}
      />

    </div>
  );
}