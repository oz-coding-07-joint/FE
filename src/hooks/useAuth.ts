"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postKakaoLogin,
  postLogin,
  postLogout,
  getUserInfo,
  updateUserInfo,
  changePassword,
  postSignup,
  postSocialProfileCreate,
  postUserDelete,
  postEmailVerification,
  verifyEmailCode,
  getTerms,
} from "@/api/authApi";
import { STerm, Term, transformTerm, transformUser, User } from "@/types/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// 유저 정보 조회
export const useGetUserInfo = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await getUserInfo();
        return response ? transformUser(response) : null;
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        return null;
      }
    },
    enabled: false,
  });
};

// 로그인
export const useLogin = () => {
  const { login } = useAuthStore(); 

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await postLogin(credentials); // 로그인 요청 후 유저 정보 반환
    },
    onSuccess: (user) => {
      console.log("로그인 성공:", user);
      login(user); // 로그인 성공 시 전역 상태 업데이트
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });
};

// 새로고침 시 자동 로그인 유지
export const useAuthInit = () => {
  const { restoreUser } = useAuthStore();

  useEffect(() => {
    restoreUser(); // 유저 정보 복원
  }, [restoreUser]);
};

// 로그아웃 (HttpOnly 쿠키 삭제 및 전역 상태 초기화)
export const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await postLogout(); // 서버에서 쿠키 삭제
    },
    onSuccess: () => {
      logout(); // 유저 정보 초기화
      window.location.reload();
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};

// 카카오 로그인
export const useKakaoLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const user = await postKakaoLogin();
      return user;
    },
    onSuccess: (user) => {
      login(user); // 로그인 성공 시 전역 상태 업데이트
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
    mutationFn: async (email: string) => {
      return await postEmailVerification(email);
    },
    onError: (error) => {
      console.error("이메일 인증 요청 실패:", error);
    },
  });
};

// 이메일 인증 코드 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: async (emailCodeData: { email: string; code: string }) => {
      return await verifyEmailCode(emailCodeData);
    },
    onError: (error) => {
      console.error("이메일 인증 실패:", error);
    },
  });
};

// 회원가입 후 자동 로그인 (추가 API 요청 없이 상태 업데이트)
export const useSignup = () => {
  const { login } = useAuthStore();
  const router = useRouter();

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
      return await postLogin({ email: userData.email, password: userData.password }); // 자동 로그인
    },
    onSuccess: (user) => {
      login(user);
      router.push("/");
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

// 회원 탈퇴
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserDelete,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null); // 유저 정보 초기화
    },
  });
};

// 약관 가져오기 (활성화된 약관만)
export const useGetTerms = () => {
  return useQuery<Term[]>({
    queryKey: ["terms"],
    queryFn: async () => {
      const data: STerm[] = await getTerms();
      return data.filter((term) => term.is_active).map(transformTerm);
    },
  });
};
