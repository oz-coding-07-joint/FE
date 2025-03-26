import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAccessToken = cookieHeader.includes("access_token=");
  const hasRefreshToken = cookieHeader.includes("refresh_token=");

  const url = new URL(request.url);
  const isRedirected = url.searchParams.get("login_required") === "true";

  if (!hasAccessToken && !hasRefreshToken && !isRedirected) {
    url.pathname = "/";
    url.searchParams.set("login_required", "true");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/classroom/:path*", "/mypage/:path*"], // 보호된 경로 설정
};
