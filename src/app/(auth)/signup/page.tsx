"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { isValidEmail, isValidPassword, isValidPhoneNumber, isValidNickname } from "@/utils/validation";
import { useGetTerms, useSignup } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import TermsModal from "../_components/TermModal";
import { Term } from "@/types/auth";
import Logoimg from "@/assets/images/sangsangLogo.png";
import Link from "next/link";
import Image from "next/image";
import EmailVerificationField from "../_components/EmailVerificationField";
import SignupForm from "../_components/SignupForm";
import TermsAgreement from "../_components/TermsAgreement";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data: terms, isLoading: isTermsLoading } = useGetTerms();
  const [agreedTerms, setAgreedTerms] = useState<{ [key: number]: boolean }>({});
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const signupMutation = useSignup();

  useEffect(() => {
    if (signupMutation.isError) {
      setErrors((prev) => ({ ...prev, error: "회원가입에 실패했습니다. 입력정보를 확인하세요." }));
    }
  }, [signupMutation.isError]);

  const handleToggleAgreement = (termId: number) => {
    setAgreedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));

    switch (field) {
      case "name":
        setName(value);
        if (!isValidNickname(value)) setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
        break;
      case "nickname":
        setNickname(value);
        if (!isValidNickname(value)) setErrors((prev) => ({ ...prev, nickname: "닉네임을 입력해주세요." }));
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
    signupMutation.reset();
    setErrors({
      email: "",
      name: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });

    const requiredTerms = terms?.filter((term) => term.isRequired) || [];
    const allRequiredAgreed = requiredTerms.every((term) => !!agreedTerms[term.id]);

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


    signupMutation.mutate(userData, {
      onSuccess: () => {
        alert("회원가입 성공! 자동으로 로그인됩니다.");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ [key: string]: string[] }>;
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;
      
          setErrors((prev) => ({
            ...prev,
            email: errorData.email ? (errorData.email[0]) : "",
            name: errorData.name ? (errorData.name[0]) : "",
            nickname: errorData.nickname ? (errorData.nickname[0]) : "",
            password: errorData.password ? (errorData.password[0]) : "",
            confirmPassword: errorData.confirmPassword ? (errorData.confirmPassword[0]) : "",
            phoneNumber: errorData.phone_number ? (errorData.phone_number[0]) : "",
          }));
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-900 space-y-4">
      <Link href="/" className="cursor-pointer">
        <Image src={Logoimg} alt="Logo" className="w-24" />
      </Link>
      <div className="bg-white w-[600px] py-8 px-14 rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-muted-600">회원가입</h2>

        <div className="space-y-4">
          <EmailVerificationField
            email={email}
            onEmailChange={(value) => handleChange("email", value)}
            onVerified={() => {}}
            error={errors.email}
          />

          <SignupForm
            name={name}
            nickname={nickname}
            password={password}
            confirmPassword={confirmPassword}
            phoneNumber={phoneNumber}
            errors={errors}
            onChange={handleChange}
            showPassword={true}
          />

          <TermsAgreement
            terms={terms || []}
            agreedTerms={agreedTerms}
            onToggle={handleToggleAgreement}
            onSelectTerm={setSelectedTerm}
            isLoading={isTermsLoading}
          />

          <Button label="회원가입" size="full" variant="primary" onClick={handleSignUp} />
        </div>
      </div>
      <TermsModal term={selectedTerm} />
    </div>
  );
};

export default SignupPage;
