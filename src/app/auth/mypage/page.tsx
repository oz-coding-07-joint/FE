"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

const MyPage = () => {
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false); // 비밀번호 변경 모드 상태

  // 기존 회원정보 수정 상태
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 비밀번호 변경 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b2b4b]">
      <div className="bg-white w-[600px] py-8 px-20 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isPasswordChangeMode ? "비밀번호 변경" : "회원정보 수정"}
        </h2>

        {isPasswordChangeMode ? (
          // 비밀번호 변경 폼
          <form className="space-y-4">
            <label className="block text-sm font-semibold">현재 비밀번호</label>
            <Input type="password" placeholder="현재 비밀번호 입력하세요." value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

            <label className="block text-sm font-semibold">새 비밀번호</label>
            <Input type="password" placeholder="새 비밀번호 입력하세요." value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <label className="block text-sm font-semibold">새 비밀번호 확인</label>
            <Input type="password" placeholder="새 비밀번호를 한번 더 입력하세요." value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

            <div className="flex justify-between">
              <Button label="취소" size="medium" variant="outline" onClick={togglePasswordChangeMode} />
              <Button label="비밀번호 변경" size="medium" variant="primary" onClick={handleChangePassword} />
            </div>
          </form>
        ) : (
          // 기존 회원정보 수정 폼
          <form className="space-y-4">
            <label className="block text-sm font-semibold">이름</label>
            <Input type="text" placeholder="이름을 입력하세요." value={name} onChange={(e) => setName(e.target.value)} />

            <label className="block text-sm font-semibold">이메일</label>
            <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} 
                button={<Button label="인증번호확인" onClick={handleCheckEmail} size="small" variant="secondary" />}
          />
            <Input type="text" placeholder="인증번호를 입력하세요." value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} 
                button={<Button label="인증번호확인" onClick={handleCheckVerificationCode} size="small" variant="primary" />}    
            />

            <label className="block text-sm font-semibold">닉네임</label>
            <Input type="text" placeholder="닉네임을 입력하세요." value={nickname} disabled={true} onChange={(e) => setNickname(e.target.value)} />

            <label className="block text-sm font-semibold">전화번호</label>
            <Input type="text" placeholder="010-1234-5678" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <div className="flex justify-between">
              <Button label="비밀번호 변경하기" size="medium" variant="secondary" onClick={togglePasswordChangeMode} />
              <Button label="회원정보 변경하기" size="medium" variant="primary" onClick={handleChangeUserInfo} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyPage;
