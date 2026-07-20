import { z } from "zod";

export const ProductSchema = z.object({
  /* ---------------------------------- */
  /* Basic Information                  */
  /* ---------------------------------- */

  name: z
    .string()
    .min(2, "Product name is required."),

  slug: z
    .string()
    .min(2, "Slug is required."),

  sku: z
    .string()
    .min(2, "SKU is required."),

  barcode: z.string().optional(),

  shortDescription: z.string().optional(),

  description: z
    .string()
    .min(10, "Description is required."),

  /* ---------------------------------- */
  /* Organization                       */
  /* ---------------------------------- */

  categoryId: z
    .string()
    .min(1, "Category is required."),

  brandId: z.string().optional(),

  tags: z
    .array(z.string())
    .default([]),

  /* ---------------------------------- */
  /* Pricing                            */
  /* ---------------------------------- */

  price: z.coerce
    .number()
    .min(0, "Price is required."),

  comparePrice: z.coerce
    .number()
    .optional(),

  costPrice: z.coerce
    .number()
    .optional(),

  /* ---------------------------------- */
  /* Shipping                           */
  /* ---------------------------------- */

  weight: z.coerce
    .number()
    .optional(),

  length: z.coerce
    .number()
    .optional(),

  width: z.coerce
    .number()
    .optional(),

  height: z.coerce
    .number()
    .optional(),

  /* ---------------------------------- */
  /* Inventory                          */
  /* ---------------------------------- */

  quantity: z.coerce
    .number()
    .min(0)
    .default(0),

  lowStockThreshold: z.coerce
    .number()
    .min(0)
    .default(5),

  trackQuantity: z
    .boolean()
    .default(true),

  allowBackorder: z
    .boolean()
    .default(false),

  /* ---------------------------------- */
  /* Publishing                         */
  /* ---------------------------------- */

  featured: z
    .boolean()
    .default(false),

  status: z.enum([
    "DRAFT",
    "ACTIVE",
    "ARCHIVED",
  ]),

  /* ---------------------------------- */
  /* SEO                                */
  /* ---------------------------------- */

  metaTitle: z.string().optional(),

  metaDescription: z.string().optional(),

  metaKeywords: z.string().optional(),

  /* ---------------------------------- */
  /* Images                             */
  /* ---------------------------------- */

  images: z
    .array(
      z.object({
        imageUrl: z.string(),

        publicId: z.string(),

        altText: z
          .string()
          .optional(),

        isCover: z
          .boolean()
          .default(false),

        sortOrder: z
          .number()
          .default(0),
      })
    )
    .default([]),
});

/**
 * Type used by React Hook Form
 */
export type ProductInput = z.input<
  typeof ProductSchema
>;

/**
 * Type used after validation
 * (Server Actions / Prisma)
 */
export type ProductOutput = z.output<
  typeof ProductSchema
>;