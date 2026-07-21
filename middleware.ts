import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// Initialize NextAuth with the edge-compatible config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const pathname = nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAccountRoute = pathname.startsWith("/account");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  // Prevent logged-in users from visiting login/register
  if (isLoggedIn && isAuthRoute) {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Protect admin
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  // Protect customer pages
  if (isAccountRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/login",
    "/register",
  ],
};