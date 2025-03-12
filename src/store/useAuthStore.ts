import { create } from "zustand";
import { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  fetchUserInfo: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => {
    console.log("로그인 상태 업데이트", user);
    set(() => ({ user }));
  },
  logout: () => set(() => ({ user: null })),
  fetchUserInfo: (user) => {
    console.log("유저 정보 갱신", user);
    set(() => ({ user }));
  },

}));
