import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  ...authConfig,

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