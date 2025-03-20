'use client';
import { useState } from "react";
import UserMenu from '@/components/UserMenu';
import React from 'react';

const Header = () => {
  return (
    <header className='w-full h-16 bg-white shadow-md'>
      <div className='flex items-center justify-end gap-1 h-full pr-10'>
          <UserMenu />
      </div>
</header>
  );
};

export default Header;