import { create } from "zustand";
import { User } from "@/types/auth";
import { getUserInfo } from "@/api/authApi";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  showLoginModal: boolean;
  login: (user: User) => void;
  logout: () => void;
  restoreUser: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
  setShowLoginModal: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  showLoginModal: false,

  login: (user) => {
    console.log("로그인 성공:", user);
    set(() => ({ user, showLoginModal: false })); // 로그인 성공 시 모달 닫기
  },

  logout: () => {
    console.log("로그아웃 완료");
    Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
    set(() => ({ user: null, showLoginModal: true })); // 로그아웃 후 로그인 모달 열기
  },

  restoreUser: async () => {
    try {
      const token = Cookies.get("access_token"); // 쿠키에서 토큰 확인
      if (!token) {
        set(() => ({ user: null, showLoginModal: true })); // 토큰이 없으면 모달 열기
        return;
      }

      const user = await getUserInfo();
      console.log("새로고침 후 유저 정보 복원:", user);
      set(() => ({ user }));
    } catch (error) {
      console.error("유저 정보 복원 실패:", error);
      set(() => ({ user: null, showLoginModal: true })); // 로그인 실패 시 모달 열기
    }
  },

  updateUser: (updatedUser) => {
    console.log("유저 정보 업데이트:", updatedUser);
    set(() => ({ user: updatedUser })); // 상태 업데이트
  },

  setShowLoginModal: (state) => {
    set(() => ({ showLoginModal: state }));
  },
}));
