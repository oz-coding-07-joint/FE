import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAccessToken = cookieHeader.includes("access_token=");
  const hasRefreshToken = cookieHeader.includes("refresh_token="); // 리프레시 토큰 존재 확인

  if (!hasAccessToken && !hasRefreshToken) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("login_required", "true");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
