"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useChangePassword } from "@/hooks/useAuth";

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

    if (newPassword.length < 8) {
      newErrors.newPassword = "비밀번호는 8자 이상이어야 합니다.";
      valid = false;
    }

    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "비밀번호가 일치하지 않습니다.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await changePasswordMutation.mutateAsync({
        old_password: currentPassword,
        new_password: newPassword,
      });

      alert(response.data.detail);
      onCancel(); // 폼 닫기
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
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
          }}
        />
        {errors.confirmNewPassword && <p className="text-secondary-500 text-xs">{errors.confirmNewPassword}</p>}
      </div>

      <div className="flex gap-1.5 justify-center">
        <Button label="취소" size="medium" variant="outline" onClick={onCancel} />
        <Button label="비밀번호 변경" size="medium" variant="primary" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default PasswordChangeForm;
