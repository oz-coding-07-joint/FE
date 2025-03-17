import axios from "axios";
import Cookies from "js-cookie"; 

const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 쿠키에서 토큰을 가져와 헤더에 추가
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token"); // 쿠키에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 로그인 시 토큰을 쿠키에 저장
api.interceptors.response.use(
  (response) => {
    if (response.data?.access) {
      Cookies.set("access_token", response.data.access, {
        expires: 1, // 1일 후 만료 (원하는 기간 설정 가능)
        secure: true, // HTTPS 환경에서만 전송 (배포 시 필수)
        sameSite: "Strict", // CSRF 보호 강화
      });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // console.warn("401 에러 발생 - 자동 로그아웃 처리");

      // // 로그인 요청(`/users/login/`)에서 발생한 401은 새로고침하지 않고 에러 처리만 실행
      // const requestUrl = String(error.config?.url || "");
      // if (requestUrl.includes("/users/login/")) {
      //   return Promise.reject(error);
      // }

      // Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
      // // window.location.reload(); // 필요 시 자동 새로고침
    }

    return Promise.reject(error);
  }
);

export default api;
