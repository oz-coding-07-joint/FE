"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { postKakaoLogin } from "@/api/authApi";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const useKakaoAuth = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuthStore();
    const queryClient = useQueryClient();

    // 로그인 버튼 클릭 시 현재 페이지 저장 후 카카오 로그인 이동
    const loginWithKakao = () => {
        const currentPage = window.location.pathname; // 현재 페이지 가져오기
        localStorage.setItem("redirect_after_login", currentPage); // 원래 페이지 저장

        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    };

    // 카카오 로그인 API 요청
    const kakaoLoginMutation = useMutation({
        mutationFn: postKakaoLogin,
        onSuccess: async (user) => {
            if (user) {
                if (!user.isActive) {
                    router.push(`/social-signup?user_id=${user.id}`);
                } else {
                    login(user);
                    await queryClient.invalidateQueries({ queryKey: ["user"] });

                    // 로그인 후 원래 페이지로 이동
                    const redirectUrl = localStorage.getItem("redirect_after_login") || "/";
                    localStorage.removeItem("redirect_after_login"); // 사용 후 삭제
                    router.replace(redirectUrl);
                }
            }
        },
        onError: () => {
            // 로그인 실패 시 원래 페이지로 이동 후 alert 표시
            const redirectUrl = localStorage.getItem("redirect_after_login") || "/";
            localStorage.removeItem("redirect_after_login"); // 사용 후 삭제
            alert("로그인 실패했습니다."); // 로그인 실패 메시지
            router.replace(redirectUrl);
        },
    });

    // 카카오에서 리다이렉트된 후 인가 코드 처리
    useEffect(() => {
        const code = searchParams.get("code");
        if (code && !kakaoLoginMutation.isPending) {
            kakaoLoginMutation.mutate(code);
        }
    }, [searchParams]);

    return { loginWithKakao, isLoading: kakaoLoginMutation.isPending };
};
