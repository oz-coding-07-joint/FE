"use client";

import Input from "@/components/Input";

type Props = {
  name: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  errors: {
    name?: string;
    nickname?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
  };
  onChange: (field: string, value: string) => void;
  showPassword: boolean;
};

const SignupForm = ({
  name,
  nickname,
  password,
  confirmPassword,
  phoneNumber,
  errors,
  onChange,
  showPassword,
}: Props) => {
  return (
    <>
      {/* 이름 */}
      <div className="space-y-1">
        <label className="block text-sm text-muted-600">이름</label>
        <Input
          type="text"
          placeholder="이름을 입력하세요."
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          maxLength={20}
        />
        {errors.name && <p className="text-secondary-500 text-xs">{errors.name}</p>}
      </div>

      {/* 닉네임 */}
      <div className="space-y-1">
        <label className="block text-sm text-muted-600">
          닉네임
          <span className="text-xs text-muted-400"> *가입 후 수정 불가</span>
        </label>
        <Input
          type="text"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={(e) => onChange("nickname", e.target.value)}
          maxLength={17}
        />
        {errors.nickname && <p className="text-secondary-500 text-xs">{errors.nickname}</p>}
      </div>
      {showPassword && (
        <>

      {/* 비밀번호 */}
      <div className="space-y-1">
        <label className="block text-sm text-muted-600">비밀번호</label>
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        {errors.password && <p className="text-secondary-500 text-xs">{errors.password}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div className="space-y-1">
        <label className="block text-sm text-muted-600">비밀번호 확인</label>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력하세요."
          value={confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-secondary-500 text-xs">{errors.confirmPassword}</p>
        )}
      </div>
      </>
        )}

      {/* 전화번호 */}
      <div className="space-y-1">
        <label className="block text-sm text-muted-600">전화번호</label>
        <Input
          type="text"
          placeholder="01012345678"
          value={phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
        />
        {errors.phoneNumber && <p className="text-secondary-500 text-xs">{errors.phoneNumber}</p>}
      </div>
    </>
  );
};

export default SignupForm;
