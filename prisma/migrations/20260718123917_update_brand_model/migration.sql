-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT;

-- CreateIndex
CREATE INDEX "Brand_slug_idx" ON "Brand"("slug");
