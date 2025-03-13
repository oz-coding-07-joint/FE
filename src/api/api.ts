import axios from "axios";

const api = axios.create({
  // baseURL: "http://211.188.59.23/api/v1",
  baseURL: "/api/v1",
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
  (response) => response
  // async (error) => {
  //   if (error.response?.status === 401) {
  //     console.warn("401 에러 발생 - 자동 로그아웃 처리");

  //     const requestUrl = String(error.config?.url || ""); // 문자열로 변환하여 처리

  //     // 로그인 요청(`/users/login/`)에서 발생한 401은 새로고침하지 않고 에러 처리만 실행
  //     if (requestUrl.includes("/users/login/")) {
  //       return Promise.reject(error);
  //     }

  //     useAuthStore.setState({ user: null });

  //     // window.location.reload();

  //     return Promise.reject(error);
  //   }
  //   return Promise.reject(error);
  // }
);

export default api;
