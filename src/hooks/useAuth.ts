"use client"; // Next.js 클라이언트 컴포넌트에서 사용

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
import { STerm, SUser, Term, transformTerm, transformUser, User } from "@/types/auth";

// 유저 정보 조회 (전역 캐싱)
export const useGetUserInfo = () => {
    return useQuery<User | null>({
      queryKey: ["user"],
      queryFn: async () => {
        try {
          const response = await getUserInfo();
          return transformUser(response);
        } catch (error) {
          console.error("유저 정보 가져오기 실패:", error);
          return null; // 에러 발생 시 null 반환하여 로그아웃 상태로 인식
        }
      },
      staleTime: 1000 * 60 * 5,
    });
  };
  
  // 로그인 (액세스 토큰 전역 상태 관리)
  export const useLogin = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (credentials: { email: string; password: string }) => {
        const response: SUser = await postLogin(credentials);
        console.log("로그인 성공, 응답 데이터:", response);
  
        // SUser → User 타입 변환 후 저장
        const transformedUser = transformUser(response);
  
        // 전역 상태 (react-query 캐시) 업데이트
        queryClient.setQueryData(["user"], transformedUser);
  
        return transformedUser;
      },
      onSuccess: () => {
        console.log("유저 정보 갱신 완료.");
      },
      onError: (error) => {
        console.error("로그인 실패:", error);
      },
    });
  };
  
  // 로그아웃
  export const useLogout = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async () => {
        await postLogout();
      },
      onSuccess: () => {
        queryClient.setQueryData(["user"], null); // 유저 정보 초기화
      },
      onError: (error) => {
        console.error("로그아웃 실패:", error);
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

// 이메일 인증 요청
export const useEmailVerification = () => {
    return useMutation({
      mutationFn: async (email: string) => {
        const response = await postEmailVerification(email);
        console.log("이메일 인증 요청 성공:", response);
        return response;
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
        console.log("📢 이메일 인증 요청 데이터:", emailCodeData);
        const response = await verifyEmailCode(emailCodeData);
        console.log("이메일 인증 성공:", response);
        return response;
      },
      onError: (error) => {
        console.error("이메일 인증 실패:", error);
      },
    });
  };

// 회원가입
export const useSignup = () => {
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
      // 회원가입 요청
      const signupResponse = await postSignup(userData);
      console.log("회원가입 성공:", signupResponse);

      // 회원가입 후 바로 로그인 요청
      const loginResponse: SUser = await postLogin({
        email: userData.email,
        password: userData.password,
      });
      console.log("자동 로그인 성공:", loginResponse);

      // 로그인 정보 전역 상태 업데이트 (react-query 캐싱)
      const transformedUser = transformUser(loginResponse);
      queryClient.setQueryData(["user"], transformedUser);

      return transformedUser;
    },
    onSuccess: (data) => {
      console.log("회원가입 및 자동 로그인 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
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
        queryClient.setQueryData(["user"], null); // 유저 정보 초기화
      },
    });
  };

//약관가져오기
export const useGetTerms = () => {
  return useQuery<Term[]>({
    queryKey: ["terms"],
    queryFn: async () => {
      const data: STerm[] = await getTerms();
      return data
        .filter((term) => term.is_active) 
        .map(transformTerm);
    },
  });
};  
