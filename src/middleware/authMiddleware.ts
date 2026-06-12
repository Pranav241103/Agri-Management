import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")?.value;

  const { pathname } =
    request.nextUrl;

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/crops") ||
    pathname.startsWith("/inventory")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/crops/:path*",
    "/inventory/:path*",
  ],
};