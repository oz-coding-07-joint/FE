import { STerm, SUser, Term, User, transformTerm, transformUser } from "@/types/auth";
import api from "./api";
import Cookies from "js-cookie"; 

// 카카오 로그인
export const postKakaoLogin = async (code: string): Promise<User> => {
    const response = await api.post<{ access: string; user: SUser }>("/users/kakao-login/", code);
    // 액세스 토큰을 쿠키에 저장
    Cookies.set("access_token", response.data.access, {
        expires: 1, // 1일 후 만료
        secure: true, // HTTPS 환경에서만 전송
        sameSite: "Strict", // CSRF 보호
    });

    return transformUser(response.data.user); // 유저 데이터 변환 후 반환
};

//로그인
export const postLogin = async (credentials: { email: string; password: string }): Promise<User> => {
    const response = await api.post<{ access: string; user: SUser }>("/users/login/", credentials);
  
    // 액세스 토큰을 쿠키에 저장
    Cookies.set("access_token", response.data.access, {
        expires: 0.01, // 15분 (1일 = 24시간, 0.01일 ≈ 15분)
        secure: true, // HTTPS 환경에서만 전송
        sameSite: "Strict", // CSRF 보호
    });
  
    return transformUser(response.data.user); // 유저 데이터 변환 후 반환
  };
  

// 로그아웃
export const postLogout = async (): Promise<void> => {
    try {
        await api.post("/users/logout/", {}, { withCredentials: true });

        // 쿠키에서 토큰 삭제
        Cookies.remove("access_token");

    } catch (error) {
        console.error("로그아웃 실패:", error);
    }
};


// 회원 정보 조회
export const getUserInfo = async (): Promise<User | null> => {
    try {
        const response = await api.get<SUser>("/users/myinfo/");
        return transformUser(response.data);
    } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        return null; // 비로그인 상태 또는 서버 오류 시 null 반환
    }
};


// 회원 정보 수정
export const updateUserInfo = async (userData: { name: string; email: string; phone_number: string }) => {
    const response = await api.patch("/users/myinfo/", userData);
    return response.data;
};

// 비밀번호 변경
export const changePassword = async (passwordData: { old_password: string; new_password: string }) => {
    const response = await api.patch("/users/password-change/", passwordData);
    return response.data;
};

// 이메일 인증 요청
export const postEmailVerification = async (email: string) => {
    const response = await api.post("/users/send-email-verification/", { email });
    return response.data;
};

// 이메일 인증번호 확인
export const verifyEmailCode = async (emailCodeData: { email: string, code: string }) => {
    const response = await api.post("/users/verify-email-code/", emailCodeData);
    return response.data;
};

// 회원가입
export const postSignup = async (userData: { 
    email: string;
    password: string;
    name: string;
    nickname: string;
    phone_number: string;
    terms_agreements: { terms: number; is_agree: boolean }[];
}): Promise<void> => {
    await api.post("/users/signup/", userData); // 회원가입 요청 후 응답 데이터 불필요
};

// 소셜 로그인 시 프로필 생성
export const postSocialProfileCreate = async (socialProfileData: {
    name: string;
    nickname: string;
    phone_number: string;
}) => {
    const response = await api.post("/users/social-profile-create/", socialProfileData);
    return response.data;
};

// 회원 탈퇴
export const postUserDelete = async () => {
    const response = await api.post("/users/withdrawal/");
    return response.data;
};

// 약관 조회 (is_active 필터링 적용)
export const getTerms = async (): Promise<Term[]> => {
    const response = await api.get<STerm[]>("/terms/");
    return response.data
        .filter(term => term.is_active) // 활성화된 약관만 필터링
        .map(transformTerm);
};
