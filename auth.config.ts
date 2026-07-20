import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login-schema";

const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        // User registered with OAuth only
        if (!user.password) {
          return null;
        }

        // Block blocked users
        if (user.status === "BLOCKED") {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: "ADMIN" | "CUSTOMER" }).role;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
        session.user.role = token.role as "ADMIN" | "CUSTOMER";
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;