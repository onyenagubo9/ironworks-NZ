import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import BankAccountForm from "@/components/admin/settings/BankAccountForm";

export default function NewBankAccountPage() {
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
          Add Bank Account
        </h1>

        <p className="mt-2 text-gray-500">
          Add a bank account that customers can use to
          make bank transfer payments.
        </p>

      </div>

      {/* Form */}

      <BankAccountForm />

    </div>
  );
}