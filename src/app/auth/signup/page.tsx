"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckEmail = () => {
    console.log("인증번호 전송");
  };

  const handleCheckVerificationCode = () => {
    console.log("인증번호 확인");
  };

  const handleSignUp = () => {
    console.log("회원가입 진행");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b2b4b]">
      <div className="bg-white w-[600px] py-10 px-14 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

        <form className="space-y-4">
          {/* 이름 */}
          <label className="block text-sm font-semibold">이름</label>
          <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => setName(e.target.value)} />

          {/* 이메일 + 인증번호 전송 */}
          <label className="block text-sm font-semibold">이메일</label>
          <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} 
                button={<Button label="인증번호확인" onClick={handleCheckEmail} size="small" variant="secondary" />}
          />

          {/* 인증번호 입력 + 확인 */}
            <Input type="text" placeholder="인증번호를 입력하세요." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} 
                button={<Button label="인증번호확인" onClick={handleCheckVerificationCode} size="small" variant="primary" />}    
            />

          {/* 닉네임 */}
          <label className="block text-sm font-semibold">
            닉네임 <span className="text-xs text-gray-500">*가입 후 수정이 불가하오니 신중하게 지어주세요.</span>
          </label>
          <Input type="text" placeholder="닉네임을 입력하세요." value={nickname} onChange={(e) => setNickname(e.target.value)} />

          {/* 비밀번호 */}
          <label className="block text-sm font-semibold">비밀번호</label>
          <Input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* 비밀번호 확인 */}
          <label className="block text-sm font-semibold">비밀번호 확인</label>
          <Input type="password" placeholder="비밀번호를 다시 입력하세요." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          {/* 전화번호 */}
          <label className="block text-sm font-semibold">전화번호</label>
          <Input type="text" placeholder="010-1234-5678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

          {/* 개인정보 동의 */}
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="w-4 h-4" />
            <span className="text-sm">개인정보처리방침 동의</span>
            <a href="#" className="text-sm text-blue-500">개인정보처리방침</a>
          </div>

          {/* 회원가입 버튼 */}
          <Button label="회원가입" size="full" variant="primary" onClick={handleSignUp} />
        </form>

      </div>
    </div>
  );
};

export default SignupPage;
