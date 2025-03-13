import { create } from "zustand";
import { User } from "@/types/auth";
import { getUserInfo } from "@/api/authApi";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  restoreUser: () => Promise<void>;
  updateUser: (updatedUser: User) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,

  login: (user) => {
    console.log("로그인 성공:", user);
    set(() => ({ user }));
  },

  logout: () => {
    console.log("🚪 로그아웃 완료");
    set(() => ({ user: null }));
  },

  restoreUser: async () => {
    try {
      const user = await getUserInfo();
      console.log("새로고침 후 유저 정보 복원:", user);
      set(() => ({ user }));
    } catch (error) {
      console.error("유저 정보 복원 실패:", error);
      set(() => ({ user: null }));
    }
  },

  updateUser: (updatedUser) => {
    console.log("유저 정보 업데이트:", updatedUser);
    set(() => ({ user: updatedUser })); // 상태 업데이트
  },
}));
