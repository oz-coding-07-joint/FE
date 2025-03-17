"use client"
import React, { useEffect } from 'react';
import Sidebar from './_components/layout/Sidebar';
import Header from './_components/layout/Header';
import { useAuthStore } from '@/store/useAuthStore';
import LoginModal from '../(auth)/(login)/LoginModal';

export default function ClassroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다.');
      useAuthStore.setState({ showLoginModal: true });
    }
  }, [user]);
  return (
      <div className='flex min-h-screen bg-muted-100'>
        {useAuthStore.getState().showLoginModal && (
          <LoginModal isOpen={true} onClose={() => useAuthStore.setState({ showLoginModal: false})} />)}
        <Sidebar />
        <div className='flex-1'>
          <Header />
          <main >
            {children}
          </main>
        </div>
      </div>
  );
};