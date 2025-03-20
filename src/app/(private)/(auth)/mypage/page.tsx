"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { isValidEmail, isValidName, isValidPhoneNumber } from "@/utils/validation";
import { useChangePassword, useEmailVerification, useUpdateUserInfo, useVerifyEmailCode } from "@/hooks/useAuth";
import { AxiosError } from "axios";

const MyPage = () => {
  const { user } = useAuthStore();
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false); // 비밀번호 변경 모드 상태

  // 기존 회원정보 수정 상태
  const [email, setEmail] = useState(user?.email || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setNickname(user.nickname || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);
  

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

  const emailVerificationMutation = useEmailVerification();
  const verifyEmailCodeMutation = useVerifyEmailCode();
  const changePasswordMutation = useChangePassword();
  const changeUserInfo = useUpdateUserInfo();

  // 비밀번호 변경 모드 토글
  const togglePasswordChangeMode = () => {
    setIsPasswordChangeMode((prev) => !prev);
  };

  // 이메일 인증번호 전송
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

  // 이메일 인증번호 확인
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

  // 회원정보 변경
  const handleChangeUserInfo = async () => {
    console.log("보낼 데이터:", { name, email, phoneNumber });
  
    // 유효성 검사
    if (!isValidName(name)) {
      setErrors((prev) => ({ ...prev, name: "이름을 입력하세요." }));
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      setErrors((prev) => ({ ...prev, phoneNumber: "올바른 전화번호 형식이 아닙니다." }));
      return;
    }
  
    if (email !== user?.email) {
      // 이메일을 변경한 경우에만 인증 필요
      if (!isValidEmail(email)) {
        setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력하세요." }));
        return;
      }
      if (!isEmailVerified) {
        setErrors((prev) => ({ ...prev, email: "이메일 인증이 필요합니다." }));
        return;
      }
    }
  
    try {
      const response = await changeUserInfo.mutateAsync({
        name: name,
        email: email,
        phone_number: phoneNumber
      });
  
      console.log("서버 응답:", response);
  
      alert("회원정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };
  



  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setErrors((prev) => ({ ...prev, confirmNewPassword: "비밀번호가 일치하지 않습니다." }));
      return;
    }

    try {
      const response = await changePasswordMutation.mutateAsync({
        old_password: currentPassword,
        new_password: newPassword
      });
      alert(response);
      setIsPasswordChangeMode(false);
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
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
            <Input type="text" value={name} onChange={(e) => handleChange("name", e.target.value)} />
            {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold">이메일</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => handleChange("email", e.target.value)}
              button={<Button label="인증번호 요청" onClick={handleCheckEmail} size="small" variant="secondary" />}
            />
            <Input 
              type="text" 
              value={verificationCode} 
              placeholder="인증번호를 입력해 주세요"
              onChange={(e) => setVerificationCode(e.target.value)}
              button={<Button label="인증번호 확인" onClick={handleCheckVerificationCode} size="small" variant="primary" />}
            />
            {errors.email && <p className="text-secondary-500 text-xs">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold">닉네임</label>
            <Input type="text" value={nickname} disabled onChange={(e) => handleChange("nickname", e.target.value)}  />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold">전화번호</label>
            <Input 
              type="text" 
              value={phoneNumber} 
              onChange={(e) => handleChange("phoneNumber", e.target.value)} 
            />
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
