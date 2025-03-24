"use client";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const useSocialAuth = () => {
  const loginWithKakao = () => {
    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error("KAKAO_CLIENT_ID 또는 KAKAO_REDIRECT_URI가 설정되지 않았습니다.");
      return;
    }

    localStorage.setItem("redirect_after_login", window.location.href); // 전체 URL 저장

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return { loginWithKakao };
};
