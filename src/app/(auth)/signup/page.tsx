"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { isValidEmail, isValidPassword, isValidName, isValidPhoneNumber } from "@/utils/validation";
import { useEmailVerification, useGetTerms, useSignup, useVerifyEmailCode } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import TermsModal from "./TermModal";
import { Term } from "@/types/auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { data: terms, isLoading: isTermsLoading } = useGetTerms();
  const [agreedTerms, setAgreedTerms] = useState<{ [key: number]: boolean }>({});
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  


  const handleToggleAgreement = (termId: number) => {
    setAgreedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const signupMutation = useSignup();
  const emailVerificationMutation = useEmailVerification();
  const verifyEmailCodeMutation = useVerifyEmailCode();

  useEffect(() => {
    if (signupMutation.isError) {
      setErrors((prev) => ({ ...prev, error: "회원가입에 실패했습니다. 입력정보를 확인하세요." }));
    }
  }, [signupMutation.isError]);

  /* 이메일 인증 요청 */
  const handleCheckEmail = async () => {
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "이메일을 입력하세요." }));
      return;
    }

    try {
      const response = await emailVerificationMutation.mutateAsync(email);
      alert(response?.message);

      setErrors((prev) => ({ ...prev, email: "" }));
    } catch {
      setErrors((prev) => ({ ...prev, email: "이메일 인증 요청에 실패했습니다." }));
    }
  };

  /* 이메일 인증 코드 확인 */
  const handleCheckVerificationCode = async () => {
    if (!verificationCode) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증번호를 입력하세요." }));
      return;
    }

    try {
      const response = await verifyEmailCodeMutation.mutateAsync({ email, code: verificationCode });
      alert(response?.message);

      setIsEmailVerified(true);

      setErrors((prev) => ({ ...prev, verificationCode: "" }));
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>; // `AxiosError`로 타입 캐스팅

      console.error("인증 실패:", axiosError.response?.data || axiosError.message);

      // 서버 응답에서 오류 메시지를 가져오기
      const errorMessage =
        axiosError.response?.data?.message || "인증번호가 올바르지 않습니다.";

      if (errorMessage.includes("expired")) {
        alert("인증 코드가 만료되었습니다. 다시 요청해주세요.");
      }

      setErrors((prev) => ({
        ...prev,
        verificationCode: errorMessage,
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" })); // 입력 시 오류 초기화

    switch (field) {
      case "name":
        setName(value);
        if (!isValidName(value)) setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
        break;
      case "nickname":
        setName(value);
        if (!isValidName(value)) setErrors((prev) => ({ ...prev, nickname: "닉네임을 입력해주세요." }));
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
  
    // 필수 약관 동의 확인
    const requiredTerms = terms?.filter((term) => term.isRequired) || [];
    const allRequiredAgreed = requiredTerms.every((term) => agreedTerms[term.id]);

    if (!allRequiredAgreed) {
      alert("모든 필수 약관에 동의해야 회원가입이 가능합니다.");
      return;
    }

    const termsAgreements = terms
    ? terms.map((term) => ({
        terms: term.id,
        is_agree: !!agreedTerms[term.id],
      }))
    : [];
  
    const userData = {
      email,
      password,
      name,
      nickname,
      phone_number: phoneNumber,
      terms_agreements: termsAgreements,
    };
  
    //console.log("회원가입 요청 데이터:", userData);
  
    signupMutation.mutate(userData, {
      onSuccess: () => {
        //console.log("회원가입 및 자동 로그인 완료:", data);
        alert("회원가입 성공! 자동으로 로그인됩니다.");
      },
      onError: (error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        setErrors({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        });
      },
    });
  };
  
  



  const isFormValid =
    name &&
    email &&
    verificationCode &&
    nickname &&
    password &&
    confirmPassword &&
    phoneNumber &&
    !Object.values(errors).some((error) => error !== "");

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-900">
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-muted-600">회원가입</h2>

        <div className="space-y-4">
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
              button={<Button label="인증번호 전송" onClick={handleCheckEmail} size="small" variant="secondary" disabled={isEmailVerified} />}
            />
            <Input
              type="text"
              placeholder="인증번호를 입력하세요."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isEmailVerified}
              button={<Button label="인증번호 확인" onClick={handleCheckVerificationCode} size="small" variant="primary" disabled={isEmailVerified} />}
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
          <div className="mt-2">
            {isTermsLoading ? (
              <p className="text-sm text-muted-400">약관을 불러오는 중...</p>
            ) : (
              terms?.map((term) => (
                <div key={term.id} className="flex items-center justify-between mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!agreedTerms[term.id]}
                      onChange={() => handleToggleAgreement(term.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-muted-400">
                      {term.name} {term.isRequired && "(필수)"}
                    </span>
                  </label>
                  <span
                    onClick={() => {
                      setSelectedTerm(term);
                      setIsTermsModalOpen(true);
                    }}
                    className="text-sm text-muted-300 underline cursor-pointer"
                  >
                    {term.name}보기
                  </span>
                </div>
              ))
            )}
          </div>

          {/* 회원가입 버튼 */}
          <Button label="회원가입" size="full" variant="primary" onClick={handleSignUp} disabled={!isFormValid} />
        </div>
      </div>
       {/* 약관 모달 (분리된 컴포넌트 사용) */}
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} term={selectedTerm} />
    </div>
  );
};

export default SignupPage;
