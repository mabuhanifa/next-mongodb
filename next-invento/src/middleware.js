import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const isPublicPath =
    path.startsWith("/api/auth/login") || path.startsWith("/api/auth/register");

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { status: 401 }
    );
  }

  // In a real app, you'd verify the token here.
  // For now, we just check for its presence.

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
