/*
  Warnings:

  - Added the required column `shippingAddress1` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCountry` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingFirstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingState` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bankAccountId" TEXT,
ADD COLUMN     "billingAddress1" TEXT,
ADD COLUMN     "billingAddress2" TEXT,
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingCompany" TEXT,
ADD COLUMN     "billingCountry" TEXT,
ADD COLUMN     "billingFirstName" TEXT,
ADD COLUMN     "billingLastName" TEXT,
ADD COLUMN     "billingPhone" TEXT,
ADD COLUMN     "billingPostalCode" TEXT,
ADD COLUMN     "billingState" TEXT,
ADD COLUMN     "billingSuburb" TEXT,
ADD COLUMN     "couponId" TEXT,
ADD COLUMN     "deliveryMethod" TEXT,
ADD COLUMN     "shippingAddress1" TEXT NOT NULL,
ADD COLUMN     "shippingAddress2" TEXT,
ADD COLUMN     "shippingCity" TEXT NOT NULL,
ADD COLUMN     "shippingCompany" TEXT,
ADD COLUMN     "shippingCountry" TEXT NOT NULL,
ADD COLUMN     "shippingFirstName" TEXT NOT NULL,
ADD COLUMN     "shippingLastName" TEXT NOT NULL,
ADD COLUMN     "shippingPhone" TEXT NOT NULL,
ADD COLUMN     "shippingPostalCode" TEXT NOT NULL,
ADD COLUMN     "shippingState" TEXT NOT NULL,
ADD COLUMN     "shippingSuburb" TEXT;

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "type" "CouponType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "minimumOrder" DOUBLE PRECISION,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Order_couponId_idx" ON "Order"("couponId");

-- CreateIndex
CREATE INDEX "Order_bankAccountId_idx" ON "Order"("bankAccountId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
