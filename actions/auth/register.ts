"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schemas/register-schema";
import { sendWelcomeEmail } from "@/lib/mail";

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

  // First user becomes ADMIN
  const userCount = await prisma.user.count();

  const role =
    userCount === 0
      ? "ADMIN"
      : "CUSTOMER";

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      emailVerified: null,
    },
  });

  // Send welcome email
  try {
    await sendWelcomeEmail({
      email: user.email,
      firstName: user.firstName,
    });

    console.log(
      `Welcome email sent to ${user.email}`
    );
  } catch (error) {
    console.error(
      "Failed to send welcome email:",
      error
    );

    // Don't stop registration if email fails
  }

  return {
    success: "Registration successful.",
    user,
  };
}