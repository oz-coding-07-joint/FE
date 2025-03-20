'use client';
import LoginModal from "@/app/(auth)/_components/LoginModal";
import UserMenu from '@/components/UserMenu';
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore(); // 로그인한 유저 정보 가져오기
  return (
    <header className='w-full h-20 bg-white border-b'>
      <div className='flex items-center justify-end gap-1 h-full pr-10'>
        {/* 로그인 상태 확인 */}
        {user ? (
          <UserMenu />
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="hover:text-gray-400">
            로그인
          </button>
        )}
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;