export interface User {
    id: number;
    name: string;
    email: string;
    nickname: string;
    phoneNumber: string;
    profileUrl: string;
    provider?: string; //소셜로그인
    is_superuser: boolean; //관리자여부
}