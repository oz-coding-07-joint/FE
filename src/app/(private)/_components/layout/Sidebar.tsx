"use client";

import { Archive, ClipboardText } from "phosphor-react";
import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'assignment'>('lecture');

  const tabClassName = (tab: 'lecture' | 'assignment') =>
    clsx('flex items-center gap-3 hover:text-gray-300 transition-colors', activeTab === tab ? 'text-white' : 'text-white text-opacity-60')

  return (
    <aside className="w-60 min-w-[160px] bg-gray-800 text-white relative">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl h-16 flex justify-center items-center border-b border-[#3B4861]">
          소리상상 강의실
        </h2>
        <ul className="flex flex-col mt-10 ml-6 gap-4">
          <li>
            <Link href="/classroom/lecture" className={tabClassName('lecture')}
              onClick={() => setActiveTab('lecture')}>
              <Archive size={20} /> 수업자료
            </Link>
          </li>
          <li className={tabClassName('assignment')}
            onClick={() => setActiveTab('assignment')}>
            <Link href="/classroom/assignments" className={tabClassName('assignment')}
              onClick={() => setActiveTab('assignment')}>
              <ClipboardText size={20} /> 과제
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
