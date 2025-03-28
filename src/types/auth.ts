export interface SUser {
    id: number;
    name: string;
    email: string;
    nickname: string;
    phone_number?: string;
    provider?: string; //소셜로그인
    access?: string;
    refresh?: string;
    is_active?: boolean;
    instructor_id?: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    nickname: string;
    phoneNumber?: string;
    provider?: string; //소셜로그인
    accessToken?: string;
    refreshToken?: string;
    isActive?: boolean;
    instructorId?: number;

}

export function transformUser(user: SUser): User {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        phoneNumber: user.phone_number,
        provider: user.provider,
        accessToken: user.access,
        refreshToken: user.refresh,
        isActive: user.is_active,
        instructorId: user.instructor_id,
    };
}

export interface STerm {
    id: number;
    name: string;
    detail: string;
    is_active: boolean;
    is_required: boolean; //필수
}

export interface Term {
    id: number;
    name: string;
    detail: string;
    isActive: boolean;
    isRequired: boolean;
}

export function transformTerm(term: STerm): Term {
    return {
        id: term.id,
        name: term.name,
        detail: term.detail,
        isActive: term.is_active,
        isRequired: term.is_required,
    };
}
