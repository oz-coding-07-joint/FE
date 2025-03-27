"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "@/utils/validation";
import {
  useUpdateUserInfo,
  useDeleteUser,
} from "@/hooks/useAuth";
import UserInfoForm from "./_components/UserInfoForm";
import PasswordChangeForm from "./_components/PasswordChangeForm";
import { AxiosError } from "axios";

const MyPage = () => {
  const { user } = useAuthStore();

  const [activeForm, setActiveForm] = useState<"info" | "password">("info");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [formError, setFormError] = useState("");

  const updateUserInfoMutation = useUpdateUserInfo();
  const deleteUserMutation = useDeleteUser();
  const isSocialUser = user?.provider !== "LOCAL";

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setNickname(user.nickname || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));

    switch (field) {
      case "name":
        setName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailVerified(false); // 이메일 바뀌면 인증 다시 필요
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
    };

    if (!isValidName(name)) {
      newErrors.name = "이름을 입력하세요.";
      valid = false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "올바른 전화번호 형식이 아닙니다.";
      valid = false;
    }

    if (!isSocialUser && email !== user?.email) {
      if (!isValidEmail(email)) {
        newErrors.email = "올바른 이메일을 입력하세요.";
        valid = false;
      }
      if (!isEmailVerified) {
        newErrors.email = "이메일 인증이 필요합니다.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
  
    setFormError("");
    setErrors({
      name: "",
      email: "",
      phoneNumber: "",
    });
  
    try {
      await updateUserInfoMutation.mutateAsync({
        name,
        email,
        phone_number: phoneNumber,
      });
  
      alert("회원정보가 수정되었습니다.");
    } catch (error) {
      const axiosError = error as AxiosError<{ [key: string]: string }>;
      const errorData = axiosError.response?.data;
      const raw = errorData?.error || errorData?.message || errorData?.detail || [];
  
      const messages = Array.isArray(raw) ? raw : [raw];
      const newErrors = { name: "", email: "", phoneNumber: "" };
      const unassignedMessages: string[] = [];
  
      messages.forEach((msg: string) => {
        if (typeof msg !== "string") return;
  
        if (msg.includes("이메일")) newErrors.email = msg;
        else if (msg.includes("전화번호")) newErrors.phoneNumber = msg;
        else if (msg.includes("이름")) newErrors.name = msg;
        else unassignedMessages.push(msg);
      });
  
      setErrors(newErrors);
  
      if (unassignedMessages.length) {
        setFormError(unassignedMessages.join("\n"));
      }
    }
  };
  

  const handleDeleteUser = () => {
    const confirmed = confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmed) {
      deleteUserMutation.mutate();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-5">
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-muted-600">
          마이페이지
        </h2>

        {activeForm === "info" ? (
          <>
            {/* 회원정보 수정 폼 */}
            <UserInfoForm
              name={name}
              email={email}
              nickname={nickname}
              phoneNumber={phoneNumber}
              errors={errors}
              isEmailEditable={!isSocialUser}
              onChange={handleChange}
              onEmailChange={handleEmailChange}
              onVerified={() => setIsEmailVerified(true)}
            />

            {/* 전체 에러 메시지 출력 */}
            {formError && (
              <p className="text-sm text-secondary-500 text-center mt-2 whitespace-pre-line">
                {formError}
              </p>
            )}


            {/* 버튼 그룹 */}
            <div className="flex justify-center gap-2 mt-6">
              <Button
                label="회원정보 수정"
                size="medium"
                variant="primary"
                onClick={handleSubmit}
              />
              {!isSocialUser && (
                <Button
                  label="비밀번호 변경"
                  size="medium"
                  variant="outline"
                  onClick={() => setActiveForm("password")}
                />
              )}
            </div>

            {/* 회원탈퇴 */}
            <p
              className="text-sm text-red-500 underline text-center mt-4 cursor-pointer hover:opacity-80"
              onClick={handleDeleteUser}
            >
              회원탈퇴
            </p>
          </>
        ) : (
          <PasswordChangeForm onCancel={() => setActiveForm("info")} />
        )}
      </div>
    </div>
  );
};

export default MyPage;
