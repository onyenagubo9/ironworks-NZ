import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CUSTOMER";
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "ADMIN" | "CUSTOMER";
    firstName: string;
    lastName: string;
    email: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "ADMIN" | "CUSTOMER";
    firstName: string;
    lastName: string;
  }
}