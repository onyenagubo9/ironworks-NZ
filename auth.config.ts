import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        token.role = (
          user as {
            role: "ADMIN" | "CUSTOMER";
          }
        ).role;

        token.name = user.name ?? "";

        token.email = user.email ?? "";

        token.firstName = (
          user as {
            firstName: string;
          }
        ).firstName;

        token.lastName = (
          user as {
            lastName: string;
          }
        ).lastName;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.name = token.name as string;

        session.user.email = token.email as string;

        session.user.role =
          token.role as "ADMIN" | "CUSTOMER";

        session.user.firstName =
          token.firstName as string;

        session.user.lastName =
          token.lastName as string;
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