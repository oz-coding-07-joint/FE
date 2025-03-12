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
      console.warn("401 에러 발생 - 현재 리프레시 토큰 API가 없음. 로그아웃 처리 필요");

      // ❌ 기존 자동 토큰 갱신 코드 제거
      // try {
      //   await api.post("/users/token-refresh/");
      //   return api(error.config);
      // } catch (refreshError) {
      //   console.error("토큰 갱신 실패:", refreshError);
      //   return Promise.reject(refreshError);
      // }

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
