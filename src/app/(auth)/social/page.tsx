"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { isValidName, isValidPhoneNumber } from "@/utils/validation";
import { useSocialProfileCreate } from "@/hooks/useAuth";

const SignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const socialSignUpMutation = useSocialProfileCreate();

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
    if (Object.values(errors).some((error) => error !== "")) return;
  
    const socialProfileData = {
      name,
      nickname,
      phone_number: phoneNumber,
    };
  
    //console.log("회원가입 요청 데이터:", userData);
  
    socialSignUpMutation.mutate(socialProfileData, {
      onSuccess: () => {
        //console.log("회원가입 및 자동 로그인 완료:", data);
        alert("회원가입 성공! 자동으로 로그인됩니다.");
      },
      onError: (error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };
  
  



  const isFormValid =
    name &&
    nickname &&
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


          {/* 회원가입 버튼 */}
          <Button label="회원가입" size="full" variant="primary" onClick={handleSocialSignUp} disabled={!isFormValid} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
