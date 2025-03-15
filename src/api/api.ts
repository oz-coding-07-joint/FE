import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: "http://211.188.59.23/api/v1",
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (필요하면 추가)
api.interceptors.request.use((config) => {
  return config;
});

// 응답 인터셉터 (401 처리 수정)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("401 에러 발생 - 자동 로그아웃 처리");

      const { logout } = useAuthStore.getState();
      logout();
      window.location.reload();

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
