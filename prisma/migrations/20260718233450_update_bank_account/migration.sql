-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "country" TEXT DEFAULT 'Nigeria',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'NGN',
ADD COLUMN     "iban" TEXT,
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qrCodeUrl" TEXT;

-- CreateIndex
CREATE INDEX "BankAccount_isDefault_idx" ON "BankAccount"("isDefault");
