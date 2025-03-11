import api from "./api";

//카카오로그인
export const postKakaoLogin = async () => {
    const response = await api.post("/users/kakao-login/");
    return response.data;
};

//로그인
export const postLogin = async (credentials: { email: string; password: string }) => {
    const response = await api.post("/users/login/", credentials);
    return response.data;
};

//로그아웃
export const postLogout = async () => {
    const response = await api.post("/users/logout/");
    return response.data;
};

//회원정보조회
export const getUserinfo = async () => {
    const response = await api.get("/users/myinfo/");
    return response.data;
};

//회원정보수정
export const updateUserInfo = async (userData: { name: string; email: string; phone_number: string }) => {
    const response = await api.post("/users/myinfo/", userData);
    return response.data;
};

//비밀번호변경
export const changePassword = async (passwordData: { old_password: string; new_password: string }) => {
    const response = await api.post("/users/change-password/", passwordData);
    return response.data;
};

//이메일 인증 요청
export const postEmailVerification = async (email: string) => {
    const response = await api.post("/users/send-email-verification/", { email });
    return response.data;
};

//이메일 인증번호 확인
export const verifyEmailCode = async (emailCodeData: { email: string, code: string }) => {
    const response = await api.post("/users/verify-email-code/", { emailCodeData });
    return response.data;
};

//회원가입
export const postSignup = async (userData: { 
    email: string;
    password: string;
    name: string;
    nickname: string;
    phone_number: string;
    terms_agreements: { terms: number; is_agree: boolean }[];
  }) => {
    const response = await api.post("/users/register/", userData);
    return response.data;
};

//소셜 로그인시 프로필생성
export const postSocialProfileCreate = async (socialProfileData: {
    name: string;
    nickname: string;
    phone_number: string;
  }) => {
    const response = await api.post("/users/social-profile-create/", socialProfileData);
    return response.data;
};

//회원탈퇴
export const postUserDelete = async () => {
    const response = await api.post("/users/withdrawal/");
    return response.data;
};

// 약관조회
export const getTerms = async () => {
    const response = await api.get("/terms/");
    return response.data;
};

// 비��번호 ��기


