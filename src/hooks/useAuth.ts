"use client";

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  postLogin,
  postLogout,
  getUserInfo,
  updateUserInfo,
  changePassword,
  postSignup,
  postSocialProfileCreate,
  postEmailVerification,
  verifyEmailCode,
  getTerms,
} from "@/api/authApi";
import { Term, User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/store/useAuthStore';
import Cookies from "js-cookie"; // 쿠키 추가

// 로그인 상태 복원
export const useGetUserInfo = () => {
  const { user, login, logout } = useAuthStore();

  return useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      if (user) {
        return user;
      }
      return await getUserInfo(); // 없으면 서버에서 가져오기
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    onSuccess: (user: User | null) => {

      if (user) {
        login(user); // Zustand 상태 업데이트
        console.log("Zustand 상태 업데이트 완료:", user);
      } 
    },
    onError: () => {
      console.warn("유저 정보 가져오기 실패 (비로그인 상태)");
      logout();
    },
    retry: false,
  } as UseQueryOptions<User | null, Error>);
};


// 로그인
export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async (user) => {
      if (user) {
        console.log("로그인 성공:", user);
        login(user); // 로그인 성공 시 zustand 업데이트
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        console.error("로그인 실패: 사용자 정보가 없습니다.");
      }
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};

// 로그아웃 (쿠키 삭제 + 상태 초기화)
export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
      logout(); // zustand 상태 초기화
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.reload();
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

// 회원정보 수정
export const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: async () => {
      console.log("회원정보 수정 완료..");
      window.location.reload(); // 새로고침하여 유저 정보 자동으로 다시 불러오기
    },
    onError: (error) => {
      console.error("회원정보 수정 실패:", error);
    },
  });
};


// 비밀번호 변경
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// 이메일 인증 요청
export const useEmailVerification = () => {
  return useMutation({
    mutationFn: postEmailVerification,
    onError: (error) => {
      console.error("이메일 인증 요청 실패:", error);
    },
  });
};

// 이메일 인증 코드 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: verifyEmailCode,
    onError: (error) => {
      console.error("이메일 인증 실패:", error);
    },
  });
};

// 회원가입 후 자동 로그인 (토큰 쿠키 저장 추가)
export const useSignup = () => {
  const { login } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      name: string;
      nickname: string;
      phone_number: string;
      terms_agreements: { terms: number; is_agree: boolean }[];
    }) => {
      await postSignup(userData); // 회원가입 요청
      return await postLogin({ email: userData.email, password: userData.password }); // 회원가입 후 자동 로그인
    },
    onSuccess: async (user) => {
      if (user) {
        login(user); // Zustand 상태 업데이트
        await queryClient.invalidateQueries({ queryKey: ["user"] }); // 유저 정보 다시 불러오기
        router.push("/"); // 홈으로 이동
      } else {
        console.error("회원가입 후 로그인 실패: 사용자 정보가 없습니다.");
      }
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
};


// 소셜 로그인 후 프로필 생성
export const useSocialProfileCreate = () => {
  return useMutation({
    mutationFn: postSocialProfileCreate,
    onSuccess: () => {},
  });
};

// 약관 가져오기 (활성화된 약관만)
export const useGetTerms = () => {
  return useQuery<Term[]>({
    queryKey: ["terms"],
    queryFn: getTerms,
  });
};
