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
        router.push("/"); // 실패 시 메인 페이지로 이동
        return;
      }

      try {
        const user = await postKakaoLogin(code);
        login(user); // Zustand 상태 업데이트
        router.replace("/"); // 로그인 성공 후 메인 페이지로 이동
      } catch (error) {
        console.error("카카오 로그인 실패:", error);
        router.push("/"); // 실패 시 메인 페이지로 이동
      }
    };

    fetchKakaoToken();
  }, [searchParams, router, login]);

  return <p>카카오 로그인 중...</p>;
};

export default KakaoCallback;
