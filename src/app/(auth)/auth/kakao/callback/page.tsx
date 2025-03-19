"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { postKakaoLogin } from "@/api/authApi";

const KakaoCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();

    const kakaoLoginMutation = useMutation({
        mutationFn: (code: string) => postKakaoLogin(code),
        onSuccess: (user) => {
            login(user);

            // 로그인 후 localStorage에서 원래 페이지로 이동
            const redirectUrl = localStorage.getItem("redirect_after_login") || "/";
            localStorage.removeItem("redirect_after_login"); // 사용 후 삭제
            router.replace(redirectUrl);
        },
        onError: () => {
            // 로그인 실패 시 원래 페이지로 이동 후 alert 표시
            const redirectUrl = localStorage.getItem("redirect_after_login") || "/";
            localStorage.removeItem("redirect_after_login"); // 사용 후 삭제
            alert("로그인 실패했습니다."); // 로그인 실패 메시지
            router.replace(redirectUrl);
        },
    });

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            kakaoLoginMutation.mutate(code);
        }
    }, [searchParams]);

    return <div className="flex items-center justify-center h-screen text-lg">카카오 로그인 중...</div>;
};

export default KakaoCallback;
