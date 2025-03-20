"use client";

import Link from "next/link";
import Image from "next/image";
import Logoimg from "@/assets/images/logo.png";
import UserMenu from "@/components/UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";

const Header = () => {
  const { openModal } = useModalStore();
  const { user } = useAuthStore(); // 로그인한 유저 정보 가져오기

  return (
    <header className="bg-[#131723] w-full h-24 text-center fixed flex items-center justify-between bg-opacity-90 text-white z-10 px-10 box-border">
      <Link href="/" className="cursor-pointer">
        <Image src={Logoimg} alt="Logo" className="w-32" />
      </Link>

      <nav className="flex gap-3 items-center">
        <Link href="/classinfo/harmonics" className="hover:text-gray-400">
          강의소개
        </Link>
        <Link href="/classroom/lecture" className="hover:text-gray-400">
          강의실
        </Link>
        {/* 로그인 상태 확인 */}
        {user ? (
          <UserMenu />
        ) : (
          <button onClick={() => openModal("login")} className="hover:text-gray-400">
            로그인
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
