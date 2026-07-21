import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login-schema";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  ...authConfig,

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
        const validatedFields =
          LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } =
          validatedFields.data;

        const user =
          await prisma.user.findUnique({
            where: {
              email,
            },
          });

        if (
          !user ||
          !user.password ||
          user.status === "BLOCKED"
        ) {
          return null;
        }

        const passwordMatch =
          await bcrypt.compare(
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

          firstName: user.firstName,

          lastName: user.lastName,

          role: user.role,
        } as {
          id: string;
          email: string;
          name: string;
          firstName: string;
          lastName: string;
          role: "ADMIN" | "CUSTOMER";
        };
      },
    }),
  ],

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  trustHost: true,
});