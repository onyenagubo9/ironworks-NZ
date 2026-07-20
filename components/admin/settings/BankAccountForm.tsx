"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { createBankAccount } from "@/actions/settings/create-bank-account";
import { updateBankAccount } from "@/actions/settings/update-bank-account";

interface BankAccountFormValues {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName?: string;
  swiftCode?: string;
  instructions?: string;
  isActive: boolean;
}

interface BankAccountFormProps {
  initialData?: {
    id: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    branchName: string | null;
    swiftCode: string | null;
    instructions: string | null;
    isActive: boolean;
  };
}

export default function BankAccountForm({
  initialData,
}: BankAccountFormProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
  } = useForm<BankAccountFormValues>({
    defaultValues: {
      bankName:
        initialData?.bankName ?? "",

      accountName:
        initialData?.accountName ?? "",

      accountNumber:
        initialData?.accountNumber ?? "",

      branchName:
        initialData?.branchName ?? "",

      swiftCode:
        initialData?.swiftCode ?? "",

      instructions:
        initialData?.instructions ?? "",

      isActive:
        initialData?.isActive ?? true,
    },
  });

  function onSubmit(
    values: BankAccountFormValues
  ) {
    startTransition(async () => {
      const result = initialData
        ? await updateBankAccount(
            initialData.id,
            values
          )
        : await createBankAccount(values);

      if (result.success) {
        alert(
          initialData
            ? "Bank account updated successfully."
            : "Bank account created successfully."
        );

        router.push(
          "/admin/settings/bank-accounts"
        );

        router.refresh();
      } else {
        alert(result.error);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-semibold text-[#0F172A]">
          Bank Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Bank Name */}

          <div>
            <label className="mb-2 block font-medium">
              Bank Name
            </label>

            <input
              {...register("bankName", {
                required: true,
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
              placeholder="GTBank"
            />
          </div>

          {/* Account Name */}

          <div>
            <label className="mb-2 block font-medium">
              Account Name
            </label>

            <input
              {...register("accountName", {
                required: true,
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
              placeholder="Global Trust Ltd"
            />
          </div>

          {/* Account Number */}

          <div>
            <label className="mb-2 block font-medium">
              Account Number
            </label>

            <input
              {...register(
                "accountNumber",
                {
                  required: true,
                }
              )}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
              placeholder="0123456789"
            />
          </div>

          {/* Branch */}

          <div>
            <label className="mb-2 block font-medium">
              Branch Name
            </label>

            <input
              {...register("branchName")}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
              placeholder="Victoria Island"
            />
          </div>

          {/* Swift */}

          <div>
            <label className="mb-2 block font-medium">
              Swift Code
            </label>

            <input
              {...register("swiftCode")}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
              placeholder="GTBINGLA"
            />
          </div>

          {/* Status */}

          <div className="flex items-center gap-3 pt-9">
            <input
              type="checkbox"
              {...register("isActive")}
              className="h-5 w-5"
            />

            <span className="font-medium">
              Active Bank Account
            </span>
          </div>

        </div>

        {/* Instructions */}

        <div className="mt-8">
          <label className="mb-2 block font-medium">
            Payment Instructions
          </label>

          <textarea
            {...register(
              "instructions"
            )}
            rows={5}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#DC2626]"
            placeholder="Please upload your payment receipt after completing the transfer."
          />
        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="rounded-xl border px-6 py-3 transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[#DC2626] px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {isPending
            ? initialData
              ? "Updating..."
              : "Saving..."
            : initialData
            ? "Update Bank Account"
            : "Save Bank Account"}
        </button>

      </div>

    </form>
  );
}