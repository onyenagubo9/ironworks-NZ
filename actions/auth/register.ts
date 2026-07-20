"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/register-schema";

export async function register(values: unknown) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields.",
    };
  }

  const {
    firstName,
    lastName,
    email,
    password,
  } = validatedFields.data;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already exists.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Check if this is the first user
  const userCount = await prisma.user.count();

  const role = userCount === 0 ? "ADMIN" : "CUSTOMER";

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      isVerified: false,
    },
  });

  return {
    success: "Registration successful.",
    user,
  };
}