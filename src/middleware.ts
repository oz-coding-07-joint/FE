import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAccessToken = cookieHeader.includes("access_token=");

  if (!hasAccessToken) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("login_required", "true"); // 첫 리디렉트 감지용 쿼리 추가
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/classroom/:path*", "/mypage/:path*"], // 보호된 경로 설정
};
