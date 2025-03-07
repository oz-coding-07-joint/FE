import axios from "axios";

// 기본 API URL
const API_BASE_URL = "http://223.130.136.197"; 

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (예: 토큰 자동 추가)
apiClient.interceptors.request.use(
  (config) => {
    // 필요하다면 인증 토큰 추가 가능
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 핸들링)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 실패:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
