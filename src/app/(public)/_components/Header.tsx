
"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logoimg from "@/assets/images/logo.png";
import LoginModal from "@/app/(auth)/(login)/LoginModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="bg-[#131723] w-dvw h-24 text-center fixed shadow-white shadow-sm flex items-center justify-between bg-opacity-90 text-white pl-10 z-10">
      <Image src={Logoimg} alt="Logo" className="w-32" />
      
      <nav className="flex gap-3 pr-10">
        <Link href="/classinfo/harmonics" className="hover:text-gray-400">강의소개</Link>
        <Link href="/classroom/lecture" className="hover:text-gray-400">강의실</Link>
        <button onClick={() => setIsModalOpen(true)} className="hover:text-gray-400">로그인</button>
      </nav>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
