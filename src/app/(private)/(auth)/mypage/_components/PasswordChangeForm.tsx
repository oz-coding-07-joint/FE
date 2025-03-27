"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useChangePassword } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { isValidPassword } from "@/utils/validation";

type Props = {
  onCancel: () => void;
};

const PasswordChangeForm = ({ onCancel }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [formError, setFormError] = useState(""); // ✅ 공통 에러 메시지

  const changePasswordMutation = useChangePassword();

  const validate = () => {
    let valid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };

    if (!currentPassword) {
      newErrors.currentPassword = "현재 비밀번호를 입력하세요.";
      valid = false;
    }

    if (!isValidPassword(newPassword)) {
      newErrors.newPassword = "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
      valid = false;
    }


    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "비밀번호가 일치하지 않습니다.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
  
    setFormError("");
    setErrors({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  
    changePasswordMutation.mutate(
      {
        old_password: currentPassword,
        new_password: newPassword,
      },
      {
        onSuccess: (response) => {
          alert(response.data?.detail || "비밀번호 변경 성공");
          setTimeout(() => {
            onCancel(); // 알림 후 처리
          }, 100); // 약간의 지연을 줘서 alert가 보이도록
        },        
        onError: (error) => {
          const axiosError = error as AxiosError<{ error?: string }>;
          const errorData = axiosError.response?.data;
          const raw = errorData?.error || [];
  
          const messages = Array.isArray(raw) ? raw : [raw];
          const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          };
          const unassignedMessages: string[] = [];
  
          messages.forEach((msg: string) => {
            if (typeof msg !== "string") return;
  
            if (msg.includes("현재 비밀번호")) newErrors.currentPassword = msg;
            else if (msg.includes("새 비밀번호")) newErrors.newPassword = msg;
            else unassignedMessages.push(msg);
          });
  
          setErrors(newErrors);
          if (unassignedMessages.length) {
            setFormError(unassignedMessages.join("\n"));
          }
        },
      }
    );
  };
  

  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-semibold">현재 비밀번호</label>
        <Input
          type="password"
          placeholder="현재 비밀번호 입력하세요."
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setErrors((prev) => ({ ...prev, currentPassword: "" }));
            setFormError("");
          }}
        />
        {errors.currentPassword && <p className="text-secondary-500 text-xs">{errors.currentPassword}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold">새 비밀번호</label>
        <Input
          type="password"
          placeholder="새 비밀번호 입력하세요."
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors((prev) => ({ ...prev, newPassword: "" }));
            setFormError("");
          }}
        />
        {errors.newPassword && <p className="text-secondary-500 text-xs">{errors.newPassword}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold">새 비밀번호 확인</label>
        <Input
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요."
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirmNewPassword: "" }));
            setFormError("");
          }}
        />
        {errors.confirmNewPassword && <p className="text-secondary-500 text-xs">{errors.confirmNewPassword}</p>}
      </div>

      {formError && (
        <p className="text-secondary-500 text-sm text-center whitespace-pre-line">{formError}</p>
      )}

      <div className="flex gap-1.5 justify-center">
        <Button label="취소" size="medium" variant="outline" onClick={onCancel} />
        <Button label="비밀번호 변경" size="medium" variant="primary" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default PasswordChangeForm;
