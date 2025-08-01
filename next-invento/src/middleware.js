import { NextResponse } from "next/server";

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

export function middleware(request) {
  const origin = request.headers.get("origin");
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const headers = new Headers(request.headers);
    headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    headers.set("Access-Control-Allow-Credentials", "true");
    if (isAllowedOrigin) {
      headers.set("Access-Control-Allow-Origin", origin);
    }
    return new NextResponse(null, { status: 204, headers });
  }

  // Handle actual requests
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path.startsWith("/api/auth/login") || path.startsWith("/api/auth/register");

  let response;

  if (isPublicPath) {
    response = NextResponse.next();
  } else {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      response = new NextResponse(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    } else {
      response = NextResponse.next();
    }
  }

  // Add CORS headers to the response
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
