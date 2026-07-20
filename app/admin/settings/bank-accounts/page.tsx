import { prisma } from "@/lib/prisma";

import Link from "next/link";
import {
  Landmark,
  Plus,
  Pencil,
} from "lucide-react";
import DeleteBankDialog from "@/components/admin/settings/DeleteBankDialog";

export default async function BankAccountsPage() {
  const bankAccounts =
    await prisma.bankAccount.findMany({
      orderBy: {
        bankName: "asc",
      },
    });

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">
            Bank Accounts
          </h1>

          <p className="mt-2 text-gray-500">
            Manage the bank accounts customers use for
            bank transfer payments.
          </p>
        </div>

        <Link
          href="/admin/settings/bank-accounts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={18} />

          Add Bank Account
        </Link>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Bank
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Account Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Account Number
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Swift Code
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bankAccounts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-20 text-center"
                  >
                    <Landmark
                      size={60}
                      className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-5 text-xl font-semibold">
                      No Bank Accounts
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Add your first bank account to
                      start accepting bank transfer
                      payments.
                    </p>

                    <Link
                      href="/admin/settings/bank-accounts/new"
                      className="mt-8 inline-flex items-center rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white hover:bg-red-700"
                    >
                      Add Bank Account
                    </Link>
                  </td>
                </tr>
              ) : (
                bankAccounts.map((bank) => (
                  <tr
                    key={bank.id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    {/* Bank */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold">
                          {bank.bankName}
                        </p>

                        {bank.branchName && (
                          <p className="text-sm text-gray-500">
                            {bank.branchName}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Account Name */}

                    <td className="px-6 py-5">
                      {bank.accountName}
                    </td>

                    {/* Account Number */}

                    <td className="px-6 py-5 font-mono">
                      {bank.accountNumber}
                    </td>

                    {/* Swift Code */}

                    <td className="px-6 py-5">
                      {bank.swiftCode ?? "-"}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">
                      {bank.isActive ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/settings/bank-accounts/${bank.id}/edit`}
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                        >
                          <Pencil size={18} />
                        </Link>

                       <DeleteBankDialog
                        id={bank.id}
                        bankName={bank.bankName}
                        />
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}