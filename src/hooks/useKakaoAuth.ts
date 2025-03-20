"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const useKakaoAuth = () => {
  const router = useRouter();

  // 카카오 로그인 페이지로 이동
  const loginWithKakao = () => {
    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error("KAKAO_CLIENT_ID 또는 KAKAO_REDIRECT_URI가 설정되지 않았습니다.");
      return;
    }

    // 로그인 후 돌아올 페이지 저장
    localStorage.setItem("redirect_after_login", window.location.pathname);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  // 로그인 후 돌아올 페이지로 이동
  const handleRedirect = () => {
    useEffect(() => {
      const redirectPath = localStorage.getItem("redirect_after_login");
      if (redirectPath) {
        router.replace(redirectPath);
        localStorage.removeItem("redirect_after_login");
      }
    }, []);
  };

  return { loginWithKakao, handleRedirect };
};
