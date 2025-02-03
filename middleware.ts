import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "better-auth/next-js";

function corsMiddleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return corsMiddleware(request);
  }

  return authMiddleware({
    redirectTo: "/login",
  })(request);
}

export const config = {
  matcher: ["/:path*"],
};
