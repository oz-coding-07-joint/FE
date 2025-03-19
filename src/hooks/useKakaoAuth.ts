"use client";

const KAKAO_LOGIN_URL = process.env.NEXT_PUBLIC_KAKAO_URL;

export const useKakaoAuth = () => {
  const loginWithKakao = () => {
    if (!KAKAO_LOGIN_URL) {
      console.error("KAKAO_LOGIN_URL이 설정되지 않았습니다.");
      return;
    }

    const currentPage = window.location.pathname;
    localStorage.setItem("redirect_after_login", currentPage); // 로그인 후 돌아올 페이지 저장

    window.location.href = KAKAO_LOGIN_URL;
  };

  return { loginWithKakao };
};
