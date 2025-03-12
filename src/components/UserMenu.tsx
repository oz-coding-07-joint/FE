"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useAuth";
import { UserCircle } from "phosphor-react";

const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 드롭다운 상태
  const logoutMutation = useLogout(); // 로그아웃 훅

  const handleLogout = () => {
    logoutMutation.mutate(); // 로그아웃 실행
    setMenuOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="relative">
      {/* 사람 아이콘 + 닉네임 */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 hover:text-gray-400"
      >
        <UserCircle size={32} />
        <span>홍길동님</span>
      </button>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md py-2">
          <Link
            href="/mypage"
            className="block px-4 py-2 hover:bg-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            내 정보 수정
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
