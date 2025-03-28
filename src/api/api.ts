import axios from "axios";
import Cookies from "js-cookie"; 

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // 쿠키 자동 전송 (리프레시 토큰 포함)
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 쿠키에서 액세스 토큰을 가져와 헤더에 추가
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 자동 토큰 갱신 추가
api.interceptors.response.use(
  (response) => {
    if (response.data?.access) {
      Cookies.set("access_token", response.data.access, {
        expires: 0.01, // 15분 (1일 = 24시간, 0.01일 ≈ 15분)
        secure: true, // HTTPS 환경에서만 전송
        sameSite: "Strict", // CSRF 보호
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 에러 처리: 리프레시 토큰을 사용해 재시도
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/token-refresh/`,
          {},
          { withCredentials: true } // 리프레시 토큰을 쿠키에서 자동 전송
        );

        console.log(refreshResponse);
        if (refreshResponse.data?.access) {
          Cookies.set("access_token", refreshResponse.data.access, {
            expires: 0.01, // 15분
            secure: true,
            sameSite: "Strict",
          });

          // 새로운 액세스 토큰으로 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.warn("리프레시 토큰 만료됨, 로그아웃 처리");
        Cookies.remove("access_token"); // 액세스 토큰 삭제
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
