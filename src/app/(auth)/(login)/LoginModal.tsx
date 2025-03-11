"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import KakaoLogo from "@/assets/icons/kakao_icon.svg";
import Image from "next/image";
import { useLogin } from "@/hooks/useAuth";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string; api?: string }>({});

  // 로그인 mutation
  const loginMutation = useLogin();

  // 로그인 요청 후 처리
  useEffect(() => {
    if (loginMutation.isError) {
      setError((prev) => ({...prev, api: "로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요." }));
    }
  }, [loginMutation.isError]);

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : "유효한 이메일을 입력하세요.";
  };

  // 비밀번호 유효성 검사 (최소 6자 이상)
  const validatePassword = (value: string) => {
    return value.length >= 6 ? undefined : "비밀번호는 최소 6자 이상 입력해야 합니다.";
  };

  // 입력값 변경 시 즉시 유효성 검사
  const handleChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);
      setError((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (field === "password") {
      setPassword(value);
      setError((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  // 로그인 버튼 클릭 시 최종 유효성 검사
  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
      return;
    }

    loginMutation.mutate({ email, password })
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
            validateInput={validateEmail}
            error={error.email}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="space-y-1 text-left">
          <label className="text-sm text-muted-600">비밀번호</label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            validateInput={validatePassword}
            error={error.password}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button 
          label="LOGIN" 
          size="full" 
          variant="primary" 
          onClick={handleLogin} 
          disabled={!!error.email || !!error.password} 
        />
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
        onClick={() => console.log("카카오 로그인 클릭")}
      >
        <Image src={KakaoLogo} alt="카카오 로그인" className="w-32" />
      </button>
    </Modal>
  );
};

export default LoginModal;
