import { STerm, SUser, User, transformUser } from "@/types/auth";
import api from "./api";

// 카카오 로그인
export const postKakaoLogin = async () => {
    const response = await api.post("/users/kakao-login/");
    return response.data;
};

// 로그인 (HttpOnly 쿠키 사용)
export const postLogin = async (credentials: { email: string; password: string }): Promise<User> => {
    const response = await api.post<{ user: SUser }>("/users/login/", credentials);
    return transformUser(response.data.user); // 유저 데이터 변환 후 반환
};

// 로그아웃 (HttpOnly 쿠키 삭제)
export const postLogout = async () => {
    const response = await api.post("/users/logout/");
    return response.data;
};

// 회원 정보 조회 (HttpOnly 쿠키 기반)
export const getUserInfo = async (): Promise<User | null> => {
    try {
        const response = await api.get<{ user: SUser }>("/users/myinfo/");
        return transformUser(response.data.user);
    } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
        return null;
    }
};

// 회원 정보 수정
export const updateUserInfo = async (userData: { name: string; email: string; phone_number: string }) => {
    const response = await api.post("/users/myinfo/", userData);
    return response.data;
};

// 비밀번호 변경
export const changePassword = async (passwordData: { old_password: string; new_password: string }) => {
    const response = await api.post("/users/change-password/", passwordData);
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
}) => {
    const response = await api.post("/users/signup/", userData);
    return response.data;
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
export const getTerms = async (): Promise<STerm[]> => {
    const response = await api.get<STerm[]>("/terms/");
    return response.data.filter(term => term.is_active); // 활성화된 약관만 반환
};
