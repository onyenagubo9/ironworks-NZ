-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "helpful" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "verifiedPurchase" BOOLEAN NOT NULL DEFAULT false;
