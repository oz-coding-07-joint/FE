"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useAuth";
import { SignOut, User, UserCircle } from "phosphor-react";
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
        <>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-1 hover:text-gray-400"
          >
            <UserCircle size={28} />
            <span>{user?.name}님</span>
          </button>

          {menuOpen && (
            <div className="absolute text-left right-0 mt-2 w-32 bg-white text-black shadow-lg rounded-md py-2">
              <Link
                href="/mypage"
                className="flex gap-1 items-center px-4 py-2 text-sm hover:bg-gray-200"
                onClick={() => setMenuOpen(false)}
              >
                <User size={18}  className="text-muted-400" />
                내 정보 수정
              </Link>
              <button
                onClick={handleLogout}
                className="flex gap-1 items-center w-full text-left px-4 py-2 text-sm text-danger-500 hover:bg-gray-200"
                disabled={isLoading}
              >
                <SignOut size={18}  className="text-danger-500" />
                {isLoading ? "로그아웃 중..." : "로그아웃"}
              </button>
            </div>
          )}
        </>
    </div>
  );
};

export default UserMenu;
