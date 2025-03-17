"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { isValidEmail, isValidName, isValidPhoneNumber } from "@/utils/validation";

const MyPage = () => {
  const { user } = useAuthStore();
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false); // 비밀번호 변경 모드 상태

  // 기존 회원정보 수정 상태
  const [email, setEmail] = useState(user?.email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    verificationCode: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  // 비밀번호 변경 모드 토글
  const togglePasswordChangeMode = () => {
    setIsPasswordChangeMode((prev) => !prev);
  };

  // 이메일 인증번호 전송
  const handleCheckEmail = () => {
    console.log("인증번호 전송");
  };

  // 이메일 인증번호 확인
  const handleCheckVerificationCode = () => {
    console.log("인증번호 확인");
  };

  // 회원정보 변경
  const handleChangeUserInfo = () => {
    console.log("회원정보 수정");
  };

  // 비밀번호 변경
  const handleChangePassword = () => {
    console.log("비밀번호 변경 진행");
  };

  // 입력값 변경 핸들러
  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    switch (field) {
      case "name":
        setName(value);
        if (!isValidName(value)) setErrors((prev) => ({ ...prev, name: "이름을 입력하세요." }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        if (!isValidPhoneNumber(value)) setErrors((prev) => ({ ...prev, phoneNumber: "올바른 전화번호 형식이 아닙니다." }));
        break;
      case "email":
        setEmail(value);
        if (!isValidEmail(value)) setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력하세요." }));
        break;
      case "verificationCode":
        setVerificationCode(value);
        break;
      case "currentPassword":
        setCurrentPassword(value);
        if (!value) setErrors((prev) => ({ ...prev, currentPassword: "현재 비밀번호를 입력하세요." }));
        break;
      case "newPassword":
        setNewPassword(value);
        if (value.length < 8) setErrors((prev) => ({ ...prev, newPassword: "비밀번호는 8자 이상이어야 합니다." }));
        break;
      case "confirmNewPassword":
        setConfirmNewPassword(value);
        if (value !== newPassword) setErrors((prev) => ({ ...prev, confirmNewPassword: "비밀번호가 일치하지 않습니다." }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
      <h2 className="text-4xl font-bold text-center mb-6 text-muted-600">
          {isPasswordChangeMode ? "비밀번호 변경" : "회원정보 수정"}
        </h2>

        {isPasswordChangeMode ? (
          // 비밀번호 변경 폼
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold">현재 비밀번호</label>
              <Input type="password" placeholder="현재 비밀번호 입력하세요." value={currentPassword} onChange={(e) => handleChange("currentPassword", e.target.value)} />
              {errors.currentPassword && <p className="text-secondary-500 text-xs">{errors.currentPassword}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold">새 비밀번호</label>
              <Input type="password" placeholder="새 비밀번호 입력하세요." value={newPassword} onChange={(e) => handleChange("newPassword", e.target.value)} />
              {errors.newPassword && <p className="text-secondary-500 text-xs">{errors.newPassword}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold">새 비밀번호 확인</label>
              <Input type="password" placeholder="새 비밀번호를 한번 더 입력하세요." value={confirmNewPassword} onChange={(e) => handleChange("confirmNewPassword", e.target.value)} />
              {errors.confirmNewPassword && <p className="text-secondary-500 text-xs">{errors.confirmNewPassword}</p>}
            </div>

            <div className="flex gap-1.5 justify-center">
              <Button label="취소" size="medium" variant="outline" onClick={togglePasswordChangeMode} />
              <Button label="비밀번호 변경" size="medium" variant="primary" onClick={handleChangePassword} />
            </div>
          </form>
        ) : (
          // 기존 회원정보 수정 폼
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold">이름</label>
              <Input type="text" placeholder={user?.name} value={name} onChange={(e) => handleChange("name", e.target.value)} />
              {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold">이메일</label>
              <Input type="email" placeholder={user?.email} value={email} onChange={(e) => handleChange("email", e.target.value)} 
                  button={<Button label="인증번호확인" onClick={handleCheckEmail} size="small" variant="secondary" />}
            />
              <Input type="text" placeholder="인증번호를 입력하세요." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} 
                  button={<Button label="인증번호확인" onClick={handleCheckVerificationCode} size="small" variant="primary" />}    
              />
              {errors.email && <p className="text-secondary-500 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold">닉네임</label>
              <Input type="text" placeholder={user?.nickname} value={nickname} disabled={true} onChange={(e) => setNickname(e.target.value)} />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold">전화번호</label>
              <Input type="text" placeholder={user?.phoneNumber} value={phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} />
              {errors.phoneNumber && <p className="text-secondary-500 text-xs">{errors.phoneNumber}</p>}
            </div>

            <div className="flex gap-1.5 justify-center">
              <Button label="비밀번호 변경하기" size="medium" variant="secondary" onClick={togglePasswordChangeMode} />
              <Button label="변경하기" size="medium" variant="primary" onClick={handleChangeUserInfo} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyPage;
