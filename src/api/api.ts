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

// 응답 인터셉터 - 토큰 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await api.post("/users/token-refresh/"); // 자동 토큰 갱신
        return api(error.config); // 원래 요청 재시도
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
