import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required."),

  slug: z
    .string()
    .min(2, "Slug is required."),

  description: z.string().optional(),

  parentId: z.string().optional(),

  featured: z.boolean().default(false),

  isActive: z.boolean().default(true),

  seoTitle: z.string().optional(),

  seoDescription: z.string().optional(),

  imageUrl: z.string().optional(),

  imagePublicId: z.string().optional(),
});

// Input type for React Hook Form
export type CategoryInput = z.input<typeof CategorySchema>;

// Output type after validation (optional, useful for server actions)
export type CategoryOutput = z.output<typeof CategorySchema>;