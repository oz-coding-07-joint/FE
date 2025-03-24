"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { postKakaoLogin } from "@/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = searchParams.get("code");
      if (!code) {
        console.error("인가 코드 없음.");
        router.push("/");
        return;
      }

      try {
        const response = await postKakaoLogin(code);

        if (response.require_additional_info) {
          login(response.user);
          router.push("/social-signup");
          return; // ❗ redirect 후 아래 코드 실행 방지
        }

        login(response.user);

        const redirectPath =
          localStorage.getItem("redirect_after_login") || "/";
        localStorage.removeItem("redirect_after_login");
        router.replace(redirectPath);
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        router.push("/");
      }
    };

    fetchKakaoToken();
  }, [searchParams, router, login]);

  return <p>카카오 로그인 중...</p>;
};

export default KakaoCallback;
