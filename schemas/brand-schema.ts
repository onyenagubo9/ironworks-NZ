import { z } from "zod";

export const BrandSchema = z.object({
  name: z
    .string()
    .min(2, "Brand name is required."),

  slug: z
    .string()
    .min(2, "Slug is required."),

  description: z.string().optional(),

  website: z.string().optional(),

  featured: z.boolean().default(false),

  isActive: z.boolean().default(true),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  logoUrl: z.string().optional(),

  logoPublicId: z.string().optional(),
});

export type BrandInput = z.infer<typeof BrandSchema>;