"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { isValidName, isValidPhoneNumber } from "@/utils/validation";
import { useGetTerms, useSocialSignup } from "@/hooks/useAuth";
import { Term } from "@/types/auth";
import TermsModal from "../_components/TermModal";
import Logoimg from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useModalStore } from "@/store/useModalStore";

const SocialSignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data: terms, isLoading: isTermsLoading } = useGetTerms();
  const [agreedTerms, setAgreedTerms] = useState<{ [key: number]: boolean }>({});
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const { openModal } = useModalStore();
  
  
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

  const socialSignUpMutation = useSocialSignup();

  useEffect(() => {
    if (socialSignUpMutation.isError) {
      setErrors((prev) => ({ ...prev, error: "회원가입에 실패했습니다. 입력정보를 확인하세요." }));
    }
  }, [socialSignUpMutation.isError]);


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
      case "phoneNumber":
        setPhoneNumber(value);
        if (!isValidPhoneNumber(value)) setErrors((prev) => ({ ...prev, phoneNumber: "올바른 전화번호 형식이 아닙니다." }));
        break;
      default:
        break;
    }
  };

  const handleSocialSignUp = () => {
    socialSignUpMutation.reset();

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
  
    const socialProfileData = {
      name,
      nickname,
      phone_number: phoneNumber,
      terms_agreements: termsAgreements,
    };
  
    console.log("회원가입 요청 데이터:", socialProfileData);
  
    socialSignUpMutation.mutate(socialProfileData, {
      onSuccess: () => {
        alert("소셜 로그인 회원가입 성공!");
      },
      onError: (error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-900 space-y-4">
      <Link href="/" className="cursor-pointer">
        <Image src={Logoimg} alt="Logo" className="w-32" />
      </Link>
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-muted-600">회원가입</h2>

        <div className="space-y-4">
          {/* 이름 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">이름</label>
            <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => handleChange("name", e.target.value)} />
            {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
          </div>

          {/* 닉네임 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">닉네임<span className="text-xs text-muted-400">*닉네임은 가입 후 수정이 불가하오니 신중하게 지어주세요.</span></label>
            <Input type="text" placeholder="닉네임을 입력하세요." value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          {/* 전화번호 */}
          <div className="space-y-1">
            <label className="block text-sm text-muted-600">전화번호</label>
            <Input type="text" placeholder="01012345678" value={phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
            {errors.phoneNumber && <p className="text-secondary-500 text-xs">{errors.phoneNumber}</p>}
          </div>

          {/* 약관동의 */}
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
                      openModal("termsModal");
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
          <Button label="회원가입" size="full" variant="primary" onClick={handleSocialSignUp} />
        </div>
      </div>
      {/* 약관 모달 (분리된 컴포넌트 사용) */}
      <TermsModal term={selectedTerm} />
    </div>
  );
};

export default SocialSignupPage;
