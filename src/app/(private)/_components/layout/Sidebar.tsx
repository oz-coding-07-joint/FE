"use client";

import { Archive, ClipboardText } from "phosphor-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Logoimg from "@/assets/images/sangsangLogo.png";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const getActiveTab = (): 'lecture' | 'assignment' | null => {
    if (pathname.startsWith("/classroom/lecture")) return 'lecture';
    if (pathname.startsWith("/classroom/assignment")) return 'assignment';
    return null;
  };

  const activeTab = getActiveTab();

  const tabClassName = (tab: 'lecture' | 'assignment') =>
    clsx(
      'flex items-center gap-3 hover:text-gray-300 transition-colors',
      activeTab === tab ? 'text-white' : 'text-white text-opacity-60'
    );

  const isInstructor = Boolean(user?.instructorId);

  return (
    <aside className="w-60 min-w-[140px] bg-gray-800 text-white relative">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl h-16 flex justify-center items-center border-b border-[#3B4861]">
          <Link href="/" className="cursor-pointer">
            <Image src={Logoimg} alt="Logo" className="w-24" />
          </Link>
        </h2>
        <ul className="flex flex-col mt-10 ml-6 gap-4">
          {!isInstructor && (
            <li>
              <Link href="/classroom/lecture" className={tabClassName('lecture')}>
                <Archive size={20} /> 수업자료
              </Link>
            </li>
          )}
          <li>
            <Link href="/classroom/assignment" className={tabClassName('assignment')}>
              <ClipboardText size={20} /> 과제
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
