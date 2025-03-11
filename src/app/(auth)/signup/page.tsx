"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { isValidEmail, isValidPassword, isValidName, isValidPhoneNumber } from "@/utils/validation";
import { useEmailVerification, useSignup, useVerifyEmailCode } from "@/hooks/useAuth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    verificationCode: "",
  });

  const signupMutation = useSignup();
  const emailVerificationMutation = useEmailVerification();
  const verifyEmailCodeMutation = useVerifyEmailCode();

  useEffect(() => {
    if (signupMutation.isError) {
      setErrors((prev) => ({ ...prev, error: "회원가입에 실패했습니다. 입력정보를 확인하세요."}));
    }
  }, [signupMutation.isError]);

  const handleCheckEmail = () => {
    if (!isValidEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력하세요." }));
      return;
    }

    emailVerificationMutation.mutate(email, {
      onSuccess: () => {
        console.log("이메일 인증 요청 성공");
      },
      onError: (error) => {
        console.error("이메일 인증 요청 실패:", error);
      },
    })
  };

  const handleCheckVerificationCode = () => {
    if (!verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증번호를 입력하세요." }));
      return;
    }

    verifyEmailCodeMutation.mutate({ email, code: verificationCode }, {
      onSuccess: () => {
        setIsEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      },
    });
  };

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" })); // 입력 시 오류 초기화

    switch (field) {
      case "name":
        setName(value);
        if (!isValidName(value)) setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
        break;
      case "email":
        setEmail(value);
        if (!isValidEmail(value)) setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력하세요." }));
        break;
      case "password":
        setPassword(value);
        if (!isValidPassword(value)) setErrors((prev) => ({ ...prev, password: "비밀번호는 8자 이상, 숫자와 문자를 포함해야 합니다." }));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        if (value !== password) setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        if (!isValidPhoneNumber(value)) setErrors((prev) => ({ ...prev, phoneNumber: "올바른 전화번호 형식이 아닙니다." }));
        break;
      default:
        break;
    }
  };

  const handleSignUp = () => {
    if (Object.values(errors).some((error) => error !== "")) return;

    signupMutation.mutate(
      {
        email,
        password,
        name,
        nickname,
        phone_number: phoneNumber,
        terms_agreements: [{ terms: 0, is_agree: isAgreed }],
      },
      {
        onSuccess: (data) => {
          console.log("회원가입 성공:", data);
          alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        },
        onError: (error) => {
          console.error("회원가입 실패:", error);
        },
      }
    );
  };

  const isFormValid =
    name &&
    email &&
    verificationCode &&
    nickname &&
    password &&
    confirmPassword &&
    phoneNumber &&
    isAgreed &&
    !Object.values(errors).some((error) => error !== "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-900">
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-muted-600">회원가입</h2>

        <form className="space-y-4">
          {/* 이름 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">이름</label>
            <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => handleChange("name", e.target.value)} />
            {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
          </div>

          {/* 이메일 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">이메일</label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              button={<Button label="인증번호 전송" onClick={handleCheckEmail} size="small" variant="secondary" />}
            />
            <Input
              type="text"
              placeholder="인증번호를 입력하세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              button={<Button label="인증번호 확인" onClick={handleCheckVerificationCode} size="small" variant="primary" />}
            />
            {errors.email && <p className="text-secondary-500 text-xs">{errors.email}</p>}
          </div>

          {/* 닉네임 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">닉네임</label>
            <Input type="text" placeholder="닉네임을 입력하세요." value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">비밀번호</label>
            <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => handleChange("password", e.target.value)} />
            {errors.password && <p className="text-secondary-500 text-xs">{errors.password}</p>}
          </div>

          {/* 비밀번호확인 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">비밀번호 확인</label>
            <Input type="password" placeholder="비밀번호를 다시 입력하세요." value={confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} />
            {errors.confirmPassword && <p className="text-secondary-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* 전화번호 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">전화번호</label>
            <Input type="text" placeholder="01012345678" value={phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
            {errors.phoneNumber && <p className="text-secondary-500 text-xs">{errors.phoneNumber}</p>}
          </div>

          {/* 개인정보처리방침 */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="w-4 h-4" />
              <span className="text-sm text-muted-400">개인정보처리방침 동의</span>
            </div>
            <a href="#" className="text-sm text-muted-300 underline">개인정보처리방침</a>
          </div>

          {/* 회원가입 버튼 */}
          <Button label="회원가입" size="full" variant="primary" onClick={handleSignUp} disabled={!isFormValid} />
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
