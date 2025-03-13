"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useAuth";
import { UserCircle } from "phosphor-react";
import { useAuthStore } from "@/store/useAuthStore";

const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false); // 드롭다운 상태
  const logoutMutation = useLogout(); // 로그아웃 훅
  const { user } = useAuthStore();
  const isLoading = logoutMutation.status === "pending";

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => setMenuOpen(false), // 성공 후 닫기
    });
  };

  return (
    <div className="relative">
      {user ? ( // 로그인 상태일 때만 표시
        <>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-1 hover:text-gray-400"
          >
            <UserCircle size={28} />
            <span>{user.name}님</span>
          </button>

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
                disabled={isLoading}
              >
                {isLoading ? "로그아웃 중..." : "로그아웃"}
              </button>
            </div>
          )}
        </>
      ) : (
        // 로그인 안 됐을 때 로그인 버튼 표시
        <Link href="/login" className="hover:text-gray-400">
          로그인
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
