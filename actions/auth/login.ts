"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login-schema";

export async function login(values: unknown) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid email or password.",
    };
  }

  const { email, password } = validatedFields.data;

  // Get the user's role
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    return {
      error: "Invalid email or password.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      redirectTo:
        user.role === "ADMIN"
          ? "/admin"
          : "/dashboard",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid email or password.",
          };

        default:
          return {
            error: "Authentication failed.",
          };
      }
    }

    throw error;
  }
}