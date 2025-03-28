"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { postKakaoLogin } from "@/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, restoreUser } = useAuthStore();

  useEffect(() => {
    console.log("카카오로그인시도");
    const fetchKakaoToken = async () => {
      const code = searchParams.get("code");

      if (!code) {
        console.error("카카오 인가 코드가 없습니다.");
        router.push("/");
        return;
      }

      try {
        const { user, require_additional_info } = await postKakaoLogin(code);

        //console.log(user)
        // 로그인 처리 (Zustand 스토어에 저장)
        login(user);

        // 추가 정보가 필요한 경우
        if (require_additional_info) {
          router.push("/social-signup");
          return;
        }

        // 이전에 저장된 리다이렉트 경로로 이동
        const redirectPath = localStorage.getItem("redirect_after_login") || "/";
        localStorage.removeItem("redirect_after_login");
        router.replace(redirectPath);
        restoreUser();
      
      } catch (error) {
        console.error("카카오 로그인 중 오류 발생:", error);
        router.push("/");
      }
    };

    fetchKakaoToken();
  }, [searchParams, router, login]);

  return <p>카카오 로그인 중입니다...</p>;
};

export default KakaoCallback;
