"use client"; // Next.js 클라이언트 컴포넌트에서 사용

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postKakaoLogin,
  postLogin,
  postLogout,
  getUserinfo,
  updateUserInfo,
  changePassword,
  postSignup,
  postSocialProfileCreate,
  postUserDelete,
} from "@/api/authApi";
import { transformUser, User } from "@/types/auth";

// 유저 정보 조회 (전역 캐싱)
export const useUserInfo = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUserinfo();
      return transformUser(response); // SUser → User 타입 변환
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

// 로그인 (토큰은 쿠키에서 관리)
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await postLogin(credentials);
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 갱신
      return response;
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await postKakaoLogin();
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 갱신
      return response;
    },
    onError: (error) => {
      console.error("카카오 로그인 실패:", error);
    },
  });
};

// 로그아웃 (쿠키 기반 로그아웃)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await postLogout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 초기화
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

// 회원정보 수정
export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 갱신
    },
  });
};

// 비밀번호 변경
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// 회원가입
export const useSignup = () => {
  return useMutation({
    mutationFn: postSignup,
  });
};

// 소셜 로그인 후 프로필 생성
export const useSocialProfileCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSocialProfileCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 갱신
    },
  });
};

// 회원 탈퇴
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 초기화
    },
  });
};
