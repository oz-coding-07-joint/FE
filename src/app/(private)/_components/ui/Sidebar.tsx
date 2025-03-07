'use client';

import { Archive, ClipboardText } from 'phosphor-react';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-60 min-w-[160px] bg-gray-800 text-white relative">
      <div className='flex flex-col justify-center'>
        <h2 className='text-2xl h-16 flex justify-center items-center border-b border-[#3B4861]'>소리상상 강의실</h2>
        <ul className='flex flex-col mt-10 ml-6 gap-6'>
          <li className='flex items-center gap-4'>
            <Archive size={16} />
            수업자료
          </li>
          <li className='flex items-center gap-4'>
            <ClipboardText size={16} />
            과제
          </li>
        </ul>
      </div>
    </aside >
  );
};

export default Sidebar;