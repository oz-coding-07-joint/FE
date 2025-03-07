'use client';

import { UserCircle } from 'phosphor-react';
import React from 'react';

const Header = () => {
  return (
    <header className='w-full h-16 bg-white shadow-md'>
      <div className='flex items-center justify-end gap-1 h-full'>
        <UserCircle size={30} weight="fill" />
        <h3 className='pr-5 text-lg'>홍길동 님</h3>
      </div>
    </header>
  );
};

export default Header;