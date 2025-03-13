"use client";

import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import {
  postKakaoLogin,
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
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

// 로그인 상태 복원
export const useGetUserInfo = () => {
  const { user, login, logout } = useAuthStore(); // zustand 상태 가져오기

  return useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      if (user) return user; // 전역 상태에 유저 정보가 있으면 API 요청 생략
      return await getUserInfo(); // 없으면 서버에서 가져오기
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    onSuccess: (user: User | null) => {
      if (user) {
        login(user); // zustand 상태 업데이트
      } else {
        logout();
      }
    },
    onError: () => {
      console.warn("로그인 정보 없음 (비로그인 상태)");
      logout();
    },
    retry: false, // 불필요한 재시도 방지
  } as UseQueryOptions<User | null, Error>);
};


// 로그인
export const useLogin = () => {
  const { login } = useAuthStore(); 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async(user) => {
      if (user) {
        console.log("로그인 성공:", user);
        login(user); // 로그인 성공 시 전역 상태 업데이트
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        await queryClient.refetchQueries({ queryKey: ["user"] });
      } else {
        console.error("로그인 실패: 사용자 정보가 없습니다.");
      }
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};


// 로그아웃 (HttpOnly 쿠키 삭제 및 전역 상태 초기화)
export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout, // 불필요한 async 제거
    onSuccess: async() => {
      logout(); // 유저 정보 초기화
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.removeQueries({ queryKey: ["user"] });
      window.location.href = "/"; // 새로고침 대신 홈으로 리디렉션
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: async (user) => {
      if (user) {
        login(user);
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (error) => {
      console.error("카카오 로그인 실패:", error);
    },
  });
};


// 회원정보 수정
export const useUpdateUserInfo = () => {
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (updatedUser) => {
      updateUser(updatedUser); // 상태 업데이트
      console.log("회원정보 수정 완료");
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

// 회원가입 후 자동 로그인 (추가 API 요청 없이 상태 업데이트)
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
      return postLogin({ email: userData.email, password: userData.password }); // 자동 로그인
    },
    onSuccess: async (user) => {
      if (user) {
        login(user);
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/");
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
    onSuccess: () => {
    },
  });
};


// 약관 가져오기 (활성화된 약관만)
export const useGetTerms = () => {
  return useQuery<Term[]>({
    queryKey: ["terms"],
    queryFn: getTerms, // 중복된 필터링 및 변환 제거
  });
};
