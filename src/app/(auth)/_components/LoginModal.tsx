"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import KakaoLogo from "@/assets/icons/kakao_icon.svg";
import Image from "next/image";
import { useLogin } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { isValidEmail } from "@/utils/validation"; // 이메일 유효성 검사 추가
import { useModalStore } from "@/store/useModalStore"; // Zustand 모달 상태 추가
import { useSocialAuth } from "@/hooks/useSocialAuth";

// 서버에서 반환하는 에러 응답 타입 정의
interface ErrorResponse {
  detail?: string; // 서버가 반환하는 오류 메시지
  error?: string;  // 서버가 반환하는 오류 메시지
}

const LoginModal = () => {
  const { closeModal } = useModalStore(); // Zustand 상태 사용

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 에러 상태 관리
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // 로그인 mutation
  const loginMutation = useLogin();
  const { loginWithKakao } = useSocialAuth();

  // 로그인 요청 핸들러
  const handleLogin = () => {
    // 기존 에러 초기화
    setEmailError(null);
    setPasswordError(null);
    setApiError(null);

    // 유효성 검사
    if (!email) {
      setEmailError("이메일을 입력하세요.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!password) {
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }

    // 서버로 로그인 요청
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("로그인 성공!");
          closeModal("login"); // 로그인 성공 시 모달 닫기
        },
        onError: (error) => {
          console.error("로그인 실패:", error);

          // AxiosError 타입으로 변환
          const axiosError = error as AxiosError<ErrorResponse>;

          if (axiosError.response) {
            const { data } = axiosError.response;

            // 서버에서 받은 에러 메시지를 그대로 표시
            setApiError(data.detail || data.error || "로그인에 실패했습니다. 다시 시도해주세요.");
          } else {
            setApiError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
          }
        },
      }
    );
  };

  // 입력값 변경 시 해당 필드의 에러 초기화
  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);
      setEmailError(null);
    } else {
      setPassword(value);
      setPasswordError(null);
    }
    setApiError(null); // 입력 시 서버 오류 초기화
  };

  return (
    <Modal modalKey="login">
      <h2 className="text-4xl font-bold text-center mt-10 mb-6 text-muted-600">로그인</h2>
      <div className="space-y-4">
        {/* 이메일 입력 */}
        <div className="space-y-1 text-left">
          <label className="block text-sm text-muted-600">이메일</label>
          <Input
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={!!emailError}
            onEnterPress={handleLogin}
          />
          {emailError && <p className="text-secondary-500 text-xs mt-1">{emailError}</p>}
        </div>

        {/* 비밀번호 입력 */}
        <div className="space-y-1 text-left">
          <label className="text-sm text-muted-600">비밀번호</label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={!!passwordError}
            onEnterPress={handleLogin}
          />
          {passwordError && <p className="text-secondary-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {/* 로그인 버튼 */}
        <Button 
          label="LOGIN" 
          size="full" 
          variant="primary" 
          onClick={handleLogin} 
        />

        {/* 서버에서 반환한 오류 메시지 출력 */}
        {apiError && <p className="text-center text-secondary-500 text-sm mt-2">{apiError}</p>}
      </div>

      {/* 회원가입 링크 */}
      <p className="text-center text-sm mt-5">
        <a href="/signup" className="text-muted-400 underline">회원가입</a>
      </p>

      {/* SNS 로그인 구분선 */}
      <div className="flex items-center mt-10 mb-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-muted-300 text-sm">SNS LOGIN</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* 카카오 로그인 버튼 */}
      <button
        className="w-12 h-12 flex items-center justify-center rounded-full mx-auto"
        onClick={loginWithKakao}
      >
        <Image src={KakaoLogo} alt="카카오 로그인" className="w-32" />
      </button>
    </Modal>
  );
};

export default LoginModal;
