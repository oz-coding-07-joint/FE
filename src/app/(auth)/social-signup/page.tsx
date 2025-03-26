"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { isValidName, isValidNickname, isValidPhoneNumber } from "@/utils/validation";
import { useGetTerms, useSocialSignup } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import TermsModal from "../_components/TermModal";
import { Term } from "@/types/auth";
import Logoimg from "@/assets/images/sangsangLogo.png";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "../_components/SignupForm";
import TermsAgreement from "../_components/TermsAgreement";

const SocialSignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data: terms, isLoading: isTermsLoading } = useGetTerms();
  const [agreedTerms, setAgreedTerms] = useState<{ [key: number]: boolean }>({});
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const socialSignUpMutation = useSocialSignup();

  const [errors, setErrors] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (socialSignUpMutation.isError) {
      setErrors((prev) => ({ ...prev, error: "회원가입에 실패했습니다. 입력정보를 확인하세요." }));
    }
  }, [socialSignUpMutation.isError]);

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));

    switch (field) {
      case "name":
        setName(value);
        if (!isValidName(value)) setErrors((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
        break;
      case "nickname":
        setNickname(value);
        if (!isValidNickname(value)) setErrors((prev) => ({ ...prev, nickname: "닉네임을 입력해주세요." }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        if (!isValidPhoneNumber(value)) setErrors((prev) => ({ ...prev, phoneNumber: "올바른 전화번호 형식이 아닙니다." }));
        break;
      default:
        break;
    }
  };

  const handleToggleAgreement = (termId: number) => {
    setAgreedTerms((prev) => ({
      ...prev,
      [termId]: !prev[termId],
    }));
  };

  const handleSocialSignUp = () => {
    socialSignUpMutation.reset();

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

    // 에러 메시지 한국어 변환
    const translateErrorMessage = (message: string): string => {
      if (message.includes("phone number") && message.includes("already exists")) {
        return "이미 등록된 휴대폰 번호입니다.";
      }
      if (message.includes("nickname") && message.includes("already exists")) {
        return "이미 사용 중인 닉네임입니다.";
      }
      if (message.includes("email") && message.includes("already exists")) {
        return "이미 가입된 이메일입니다.";
      }
      return message; // 기본 메시지는 그대로 반환
    };

    const socialProfileData = {
      name,
      nickname,
      phone_number: phoneNumber,
      terms_agreements: termsAgreements,
    };

    socialSignUpMutation.mutate(socialProfileData, {
      onSuccess: () => {
        alert("소셜 로그인 회원가입 성공!");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ [key: string]: string[] }>;
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;
      
          setErrors((prev) => ({
            ...prev,
            email: errorData.email ? translateErrorMessage(errorData.email[0]) : "",
            name: errorData.name ? translateErrorMessage(errorData.name[0]) : "",
            nickname: errorData.nickname ? translateErrorMessage(errorData.nickname[0]) : "",
            password: errorData.password ? translateErrorMessage(errorData.password[0]) : "",
            confirmPassword: errorData.confirmPassword ? translateErrorMessage(errorData.confirmPassword[0]) : "",
            phoneNumber: errorData.phone_number ? translateErrorMessage(errorData.phone_number[0]) : "",
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
        <Image src={Logoimg} alt="Logo" className="w-32" />
      </Link>
      <div className="bg-white w-[600px] py-8 px-14 rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-muted-600">회원가입</h2>

        <div className="space-y-4">
          <SignupForm
            name={name}
            nickname={nickname}
            password=""
            confirmPassword=""
            phoneNumber={phoneNumber}
            errors={errors}
            onChange={handleChange}
            showPassword={false}
          />

          <TermsAgreement
            terms={terms || []}
            agreedTerms={agreedTerms}
            onToggle={handleToggleAgreement}
            onSelectTerm={setSelectedTerm}
            isLoading={isTermsLoading}
          />

          <Button label="회원가입" size="full" variant="primary" onClick={handleSocialSignUp} />
        </div>
      </div>
      <TermsModal term={selectedTerm} />
    </div>
  );
};

export default SocialSignupPage;