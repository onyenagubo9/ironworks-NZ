import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import UploadReceipt from "@/components/frontend/orders/UploadReceipt";

interface UploadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UploadPage({
  params,
}: UploadPageProps) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },

      payment: true,

      bankAccount: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#0F172A]">
          Upload Payment Receipt
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Once you've completed your bank
          transfer, upload your payment
          receipt below. Our finance team
          will verify your payment and begin
          processing your order.
        </p>

      </div>

      {/* Main Grid */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Column */}

        {/* Left Column */}

        <div className="space-y-8 lg:col-span-2">

                  {/* Order Information */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Order Information
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div>

                <p className="text-sm text-gray-500">
                  Order Number
                </p>

                <p className="mt-1 font-semibold text-[#0F172A]">
                  {order.orderNumber}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Customer
                </p>

                <p className="mt-1 font-semibold text-[#0F172A]">
                  {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-semibold text-[#0F172A]">
                  {order.customer.email}
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Payment Status
                </p>

                <span className="mt-1 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  {order.paymentStatus}
                </span>

              </div>

            </div>

          </section>

          {/* Bank Details */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Bank Transfer Details
            </h2>

            {order.bankAccount ? (

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div>

                  <p className="text-sm text-gray-500">
                    Bank Name
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.bankAccount.bankName}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Account Name
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.bankAccount.accountName}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Account Number
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.bankAccount.accountNumber}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Currency
                  </p>

                  <p className="mt-1 font-semibold">
                    {order.bankAccount.currency}
                  </p>

                </div>

                {order.bankAccount.country && (

                  <div>

                    <p className="text-sm text-gray-500">
                      Country
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.country}
                    </p>

                  </div>

                )}

                {order.bankAccount.branchName && (

                  <div>

                    <p className="text-sm text-gray-500">
                      Branch
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.branchName}
                    </p>

                  </div>

                )}

                {order.bankAccount.swiftCode && (

                  <div>

                    <p className="text-sm text-gray-500">
                      SWIFT Code
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.swiftCode}
                    </p>

                  </div>

                )}

                {order.bankAccount.iban && (

                  <div>

                    <p className="text-sm text-gray-500">
                      IBAN
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.bankAccount.iban}
                    </p>

                  </div>

                )}

              </div>

            ) : (

              <div className="mt-6 rounded-xl bg-yellow-50 p-4">

                <p className="text-yellow-700">
                  No bank account has been linked
                  to this order.
                </p>

              </div>

            )}

            {order.bankAccount?.instructions && (

              <div className="mt-8 rounded-xl bg-blue-50 p-5">

                <h3 className="font-semibold text-[#0F172A]">
                  Payment Instructions
                </h3>

                <p className="mt-3 text-gray-600">
                  {order.bankAccount.instructions}
                </p>

              </div>

            )}

          </section>

          {/* Payment Summary */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Payment Summary
            </h2>

            <div className="mt-8 space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Order Total
                </span>

                <span className="font-bold text-xl text-[#DC2626]">
                  NZ${Number(order.total).toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">
                  Payment Method
                </span>

                <span className="font-semibold">
                  Bank Transfer
                </span>

              </div>

            </div>

          </section>

                  </div>

        {/* Right Sidebar */}

        <div className="space-y-8">

          {/* Upload Card */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#0F172A]">
              Upload Receipt
            </h2>

            <p className="mt-3 text-gray-600">
              Upload your bank transfer receipt
              to complete your payment.
            </p>

            <div className="mt-8">

              <UploadReceipt
                orderId={order.id}
              />

            </div>

          </section>

          {/* Order Status */}

          <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-xl font-bold text-[#0F172A]">
              Current Status
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Order
                </span>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  {order.status}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-600">
                  Payment
                </span>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                  {order.paymentStatus}
                </span>

              </div>

            </div>

          </section>

          {/* Tips */}

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-8">

            <h2 className="text-lg font-bold text-[#0F172A]">
              Before Uploading
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm text-gray-700">

              <li>
                Make sure the receipt is
                clear and readable.
              </li>

              <li>
                The transferred amount
                should exactly match your
                order total.
              </li>

              <li>
                Accepted formats are JPG,
                PNG, WEBP and PDF.
              </li>

              <li>
                Maximum file size is
                10 MB.
              </li>

              <li>
                Your payment will be
                verified by our finance
                team before the order is
                processed.
              </li>

            </ul>

          </section>

        </div>

      </div>

    </div>
  );
}