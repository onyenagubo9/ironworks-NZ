import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name is required"),

    lastName: z
      .string()
      .min(2, "Last name is required"),

    email: z
      .string()
      .email("Invalid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;