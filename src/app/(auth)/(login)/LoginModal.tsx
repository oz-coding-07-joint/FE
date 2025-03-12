"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Input from "@/components/Input";
import KakaoLogo from "@/assets/icons/kakao_icon.svg";
import Image from "next/image";
import { useLogin } from "@/hooks/useAuth";
import { getUserinfo } from "@/api/authApi";
import { AxiosError } from "axios"; // ✅ AxiosError 타입 추가

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// 서버에서 반환하는 에러 응답 타입 정의
interface ErrorResponse {
  detail?: string; // 400 에러 메시지
  error?: string;  // 401 에러 메시지
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string; api?: string }>({});

  // 로그인 mutation
  const loginMutation = useLogin();

  // 로그인 버튼 클릭 시 요청
  const handleLogin = () => {
    setError({}); // 이전 에러 초기화

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: async () => {
          console.log("로그인 성공! 유저 정보 가져오기...");
          const userInfo = await getUserinfo();
          console.log("유저 정보 확인:", userInfo);
          onClose(); // 로그인 성공 시 모달 닫기
        },
        onError: (error) => {
          console.error("로그인 실패:", error);

          // AxiosError 타입으로 변환
          const axiosError = error as AxiosError<ErrorResponse>;

          if (axiosError.response) {
            const { status, data } = axiosError.response;
            if (status === 400) {
              setError({ email: data.detail || "존재하지 않는 이메일입니다." });
            } else if (status === 401) {
              setError({ password: data.error || "잘못된 비밀번호입니다." });
            } else {
              setError({ api: "로그인에 실패했습니다. 다시 시도해주세요." });
            }
          } else {
            setError({ api: "네트워크 오류가 발생했습니다. 다시 시도해주세요." });
          }
        },
      }
    );
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button 
          label="LOGIN" 
          size="full" 
          variant="primary" 
          onClick={handleLogin} 
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
