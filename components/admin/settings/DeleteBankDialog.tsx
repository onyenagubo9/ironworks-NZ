"use client";

import { useTransition } from "react";

import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

import { deleteBankAccount } from "@/actions/settings/delete-bank-account";

interface DeleteBankDialogProps {
  id: string;
  bankName: string;
}

export default function DeleteBankDialog({
  id,
  bankName,
}: DeleteBankDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${bankName}"?`
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result =
        await deleteBankAccount(id);

      if (!result.success) {
        alert(result.error);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
      title="Delete Bank Account"
    >
      {isPending ? (
        <AlertTriangle size={18} />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}