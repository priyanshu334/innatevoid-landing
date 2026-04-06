import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("sessionId")?.value;
  const { pathname } = request.nextUrl;

  // Define route types
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedRoute = pathname.startsWith("/home") || pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  // 1. If user is logged in and tries to access auth pages, redirect to /home
  if (isAuthPage && sessionId) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 2. If user is NOT logged in and tries to access protected routes, redirect to /login
  if (isProtectedRoute && !sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. For the root path "/", if logged in, redirect to /home (optional, but common for landing pages)
  if (pathname === "/" && sessionId) {
     return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*", "/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};