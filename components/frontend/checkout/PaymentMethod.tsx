"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Building2,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  QrCode,
} from "lucide-react";

import { useCheckout } from "@/context/CheckoutProvider";

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName: string | null;
  swiftCode: string | null;
  iban: string | null;
  country: string | null;
  currency: string;
  instructions: string | null;
  qrCodeUrl: string | null;
  isDefault: boolean;
}

export default function PaymentMethod() {
  const {
    checkout,
    setSelectedBank,
  } = useCheckout();

  const [banks, setBanks] =
    useState<BankAccount[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  const selectedBank =
    checkout.selectedBankId;

  useEffect(() => {
    loadBanks();
  }, []);

  async function loadBanks() {
    try {
      const response = await fetch(
        "/api/payment-methods",
        {
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {
        setBanks(data.paymentMethods);

        const defaultBank =
          data.paymentMethods.find(
            (
              bank: BankAccount
            ) => bank.isDefault
          );

        const bankId =
          defaultBank?.id ??
          data.paymentMethods[0]?.id ??
          "";

        if (
          bankId &&
          !checkout.selectedBankId
        ) {
          setSelectedBank(bankId);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load payment methods:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const bank = banks.find(
    (b) => b.id === selectedBank
  );

  async function copyAccountNumber() {
    if (!bank) return;

    try {
      await navigator.clipboard.writeText(
        bank.accountNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2
          size={34}
          className="animate-spin text-[#DC2626]"
        />
      </div>
    );
  }

  if (banks.length === 0) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-center">

        <Building2
          size={40}
          className="mx-auto text-yellow-600"
        />

        <h3 className="mt-4 text-lg font-bold">
          No Payment Method
        </h3>

        <p className="mt-2 text-gray-600">
          No active bank account has been
          configured by the administrator.
        </p>

      </div>
    );
  }

  return (
        <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-blue-50 p-5">

        <div className="flex items-center gap-3">

          <CreditCard className="text-blue-600" />

          <div>

            <h3 className="font-bold text-[#0F172A]">
              Bank Transfer
            </h3>

            <p className="text-sm text-gray-600">
              Complete your payment using one
              of the bank accounts below.
            </p>

          </div>

        </div>

      </div>

      {/* Bank Accounts */}

      <div className="space-y-4">

        {banks.map((bank) => (
          <label
            key={bank.id}
            className={`
              block
              cursor-pointer
              rounded-2xl
              border-2
              p-5
              transition-all
              ${
                selectedBank === bank.id
                  ? "border-[#DC2626] bg-red-50"
                  : "border-gray-200 hover:border-red-200"
              }
            `}
          >

            <div className="flex items-start gap-4">

              <input
                type="radio"
                checked={
                  selectedBank === bank.id
                }
                onChange={() =>
                  setSelectedBank(bank.id)
                }
                className="mt-1 accent-[#DC2626]"
              />

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-lg font-bold text-[#0F172A]">
                      {bank.bankName}
                    </h3>

                    {bank.isDefault && (
                      <span className="mt-1 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Default Bank
                      </span>
                    )}

                  </div>

                  {selectedBank === bank.id && (
                    <CheckCircle2 className="text-green-600" />
                  )}

                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  <Info
                    title="Account Name"
                    value={bank.accountName}
                  />

                  <Info
                    title="Account Number"
                    value={bank.accountNumber}
                  />

                  <Info
                    title="Currency"
                    value={bank.currency}
                  />

                  <Info
                    title="Country"
                    value={
                      bank.country ?? "-"
                    }
                  />

                  {bank.branchName && (
                    <Info
                      title="Branch"
                      value={bank.branchName}
                    />
                  )}

                  {bank.swiftCode && (
                    <Info
                      title="SWIFT Code"
                      value={bank.swiftCode}
                    />
                  )}

                  {bank.iban && (
                    <Info
                      title="IBAN"
                      value={bank.iban}
                    />
                  )}

                </div>

                {bank.instructions && (
                  <div className="mt-5 rounded-xl bg-gray-50 p-4">

                    <h4 className="font-semibold">
                      Payment Instructions
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      {bank.instructions}
                    </p>

                  </div>
                )}

                {bank.qrCodeUrl && (
                  <div className="mt-5">

                    <div className="mb-3 flex items-center gap-2">

                      <QrCode size={18} />

                      <span className="font-medium">
                        QR Code
                      </span>

                    </div>

                    <div className="relative h-44 w-44 overflow-hidden rounded-xl border">

                      <Image
                        src={bank.qrCodeUrl}
                        alt="QR Code"
                        fill
                        className="object-contain"
                      />

                    </div>

                  </div>
                )}

              </div>

            </div>

          </label>
        ))}

      </div>

      {bank && (
        <button
          type="button"
          onClick={copyAccountNumber}
          className="flex items-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >

          <Copy size={18} />

          {copied
            ? "Copied!"
            : "Copy Account Number"}

        </button>
      )}

    </div>
  );
}
interface InfoProps {
  title: string;
  value: string;
}

function Info({
  title,
  value,
}: InfoProps) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-1 font-semibold text-[#0F172A] break-all">
        {value}
      </p>

    </div>
  );
}