"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string }>({});

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : "유효한 이메일을 입력하세요.";
  };

  // 비밀번호 유효성 검사 (최소 6자 이상)
  const validatePassword = (value: string) => {
    return value.length >= 6 ? undefined : "비밀번호는 최소 6자 이상 입력해야 합니다.";
  };

  // 로그인 버튼 클릭 시 유효성 검사 실행
  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
      return;
    }

    console.log("로그인 성공:", { email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-center mb-6">로그인</h2>

      {/* 이메일 입력 */}
      <label className="text-sm font-semibold">이메일</label>
      <Input
        type="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        validateInput={validateEmail}
      />
      {error.email && <p className="text-red-500 text-sm mb-3">{error.email}</p>}

      {/* 비밀번호 입력 */}
      <label className="text-sm font-semibold">비밀번호</label>
      <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        validateInput={validatePassword}
      />
      {error.password && <p className="text-red-500 text-sm mb-3">{error.password}</p>}

      {/* 로그인 버튼 */}
      <Button label="LOGIN" size="full" variant="primary" onClick={handleLogin} />

      {/* 회원가입 링크 */}
      <p className="text-center text-sm mt-3">
        <a href="/signup" className="text-muted-300 underline font-semibold">회원가입</a>
      </p>

      {/* SNS 로그인 구분선 */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">SNS LOGIN</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* 카카오 로그인 버튼 */}
      <button
        className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-full mx-auto"
        onClick={() => console.log("카카오 로그인 클릭")}
      >
        카카오로그인
      </button>
    </Modal>
  );
};

export default LoginModal;

