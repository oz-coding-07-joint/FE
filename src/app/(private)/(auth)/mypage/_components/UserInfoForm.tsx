"use client";

import Input from "@/components/Input";
import EmailVerificationField from "@/app/(auth)/_components/EmailVerificationField";

type Props = {
  name: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  errors: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  isEmailEditable: boolean;
  onChange: (field: string, value: string) => void;
  onEmailChange: (value: string) => void;
  onVerified: () => void;
};

const UserInfoForm = ({
  name,
  email,
  nickname,
  phoneNumber,
  errors,
  isEmailEditable,
  onChange,
  onEmailChange,
  onVerified,
}: Props) => {
  return (
    <div className="space-y-4">
      {/* 이름 */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold">이름</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          maxLength={20}
        />
        {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
      </div>

      {/* 이메일 (컴포넌트로 분리) */}
      <EmailVerificationField
        email={email}
        onEmailChange={onEmailChange}
        onVerified={onVerified}
        disabled={!isEmailEditable}
      />

      {/* 닉네임 */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold">닉네임</label>
        <Input type="text" value={nickname} disabled />
      </div>

      {/* 전화번호 */}
      <div className="space-y-1">
        <label className="block text-sm font-semibold">전화번호</label>
        <Input
          type="text"
          value={phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          maxLength={17}
        />
        {errors.phoneNumber && (
          <p className="text-secondary-500 text-xs">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default UserInfoForm;
