"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useEmailVerification, useVerifyEmailCode } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { isValidEmail } from "@/utils/validation";

type Props = {
  email: string;
  onEmailChange?: (value: string) => void;
  onVerified: () => void;
  disabled?: boolean;
  showCodeInput?: boolean;
  error?: string;
};

const EmailVerificationField = ({
  email,
  onEmailChange,
  onVerified,
  disabled = false,
  showCodeInput = true,
  error: externalError,
}: Props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const emailVerificationMutation = useEmailVerification();
  const verifyEmailCodeMutation = useVerifyEmailCode();

  const startCountdown = () => {
    if (timerActive) return;
    setCountdown(300);
    setTimerActive(true);
  };

  useEffect(() => {
    if (timerActive && countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (countdown === 0) setTimerActive(false);
  }, [countdown, timerActive]);

  // 🔧 이메일이 바뀔 때 상태 초기화
  useEffect(() => {
    setError("");
    setCode("");
    setIsVerified(false);
    setTimerActive(false);
    setCountdown(0);
  }, [email]);

  const handleSendCode = async () => {
    if (!email) return setError("이메일을 입력하세요.");
    if (!isValidEmail(email)) return setError("올바른 이메일 형식이 아닙니다.");
    if (timerActive) return alert("5분 후 재전송 가능합니다.");

    try {
      await emailVerificationMutation.mutateAsync(email);
      setError("");
      startCountdown();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string; error?: string; detail?: string; }>;
      const msg =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.response?.data?.detail ||
        "이메일 인증 요청에 실패했습니다.";

      if (msg.includes("이미") && msg.includes("인증")) {
        setIsVerified(true);
        setError("이미 인증이 완료된 이메일입니다.");
        onVerified();
      } else {
        setError(msg);
      }
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return setError("인증번호를 입력하세요.");
    try {
      await verifyEmailCodeMutation.mutateAsync({ email, code });
      setIsVerified(true);
      setTimerActive(false);
      setCountdown(0);
      setError("");
      onVerified();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      const msg =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "인증에 실패했습니다.";
      setError(msg);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm">이메일</label>

      {disabled ? (
        <Input
          type="text"
          value="소셜 로그인 유저는 이메일을 변경할 수 없습니다."
          disabled
        />
      ) : (
        <>
          <Input
            type="email"
            value={email}
            disabled={isVerified}
            onChange={(e) => onEmailChange?.(e.target.value)}
            placeholder="이메일을 입력하세요"
            button={
              !isVerified && (
                <Button
                  label="인증번호전송"
                  onClick={handleSendCode}
                  size="small"
                  variant="secondary"
                />
              )
            }
          />
          {isVerified && !error && (
            <p className="text-secondary-500 text-xs mt-1">
              이메일 인증이 완료되었습니다.
            </p>
          )}
        </>
      )}

      {showCodeInput && !disabled && !isVerified && (
        <div className="relative w-full flex items-center gap-2 h-12 px-2 border rounded-sm">
          <input
            type="text"
            placeholder="인증번호를 입력하세요"
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 text-sm rounded text-muted-400 placeholder-muted-300"
          />
          {countdown > 0 && (
            <span className="text-xs text-danger-500">
              {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, "0")}
            </span>
          )}
          <Button label="인증번호확인" onClick={handleVerifyCode} size="small" />
        </div>
      )}
      {(externalError || error) && (
        <p className="text-secondary-500 text-xs mt-1">
          {externalError || error}
        </p>
      )}
    </div>
  );
};

export default EmailVerificationField;
