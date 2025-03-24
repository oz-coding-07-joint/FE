"use client";
import { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useEmailVerification, useVerifyEmailCode } from "@/hooks/useAuth";
import { AxiosError } from "axios";

type Props = {
  email: string;
  onEmailChange: (value: string) => void;
  onVerified: () => void;
  error: string;
  setError: (msg: string) => void;
};

const EmailVerification = ({ email, onEmailChange, onVerified, error, setError }: Props) => {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const emailVerificationMutation = useEmailVerification();
  const verifyEmailCodeMutation = useVerifyEmailCode();

  const startCountdown = () => {
    if (timerActive) return;
    setCountdown(300);
    setTimerActive(true);
  };

  useEffect(() => {
    if (timerActive && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (countdown === 0) {
      setTimerActive(false);
    }
  }, [countdown, timerActive]);

  const handleSendCode = async () => {
    if (!email) return setError("이메일을 입력하세요.");
    if (timerActive) return alert("5분 후 재전송 가능");

    try {
      await emailVerificationMutation.mutateAsync(email);
      setError("");
      startCountdown();
    } catch {
      setError("이메일 인증 요청 실패");
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return setError("인증번호를 입력하세요.");
    try {
      await verifyEmailCodeMutation.mutateAsync({ email, code });
      setIsVerified(true);
      setTimerActive(false);
      setCountdown(0);
      onVerified();
      setError("");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const msg = axiosError.response?.data?.message || "인증 실패";
      setError(msg);
    }
  };

  return (
    <div className="space-y-1">
      <Input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="이메일 입력"
        button={<Button label="인증번호 전송" onClick={handleSendCode} size="small" disabled={isVerified} />}
      />
      <div className="relative w-full flex ">
        <input type="text" placeholder="인증번호 입력" onChange={(e) => setCode(e.target.value)} />
        {countdown > 0 && (
        <p className="text-xs text-muted-400">{Math.floor(countdown / 60)}분 {countdown % 60}초</p>
      )}
        <Button label="인증번호 확인" onClick={handleVerifyCode} size="small" disabled={isVerified} />
      </div>
      {error && <p className="text-secondary-500 text-xs">{error}</p>}
    </div>
  );
};

export default EmailVerification;
