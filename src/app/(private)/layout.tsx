"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from './_components/layout/Sidebar';
import Header from './_components/layout/Header';
import { useAuthStore } from '@/store/useAuthStore';
import LoginModal from '../(auth)/(login)/LoginModal';

export default function ClassroomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, restoreUser } = useAuthStore();
  const [hasAttemptedClick, setHasAttemptedClick] = useState(false);

  useEffect(() => {
    restoreUser(); // 페이지 로드 시 사용자 정보 복원
  }, [restoreUser]);

  useEffect(() => {
    if (!user || hasAttemptedClick) {
      alert('로그인이 필요합니다.');
      useAuthStore.setState({ showLoginModal: true });
    }
  }, [user, hasAttemptedClick]);

  const handleProtectedClick = (event: React.MouseEvent) => {
    // 모달 내부 클릭이면 무시
    const modal = document.getElementById('login-modal');
    if (modal && modal.contains(event.target as Node)) return;
    
    if (!user) {
      event.preventDefault(); // 기본 동작 방지
      setHasAttemptedClick(true);
    }
  };

  return (
    <div className='flex min-h-screen bg-muted-100' onClick={handleProtectedClick}>
      {useAuthStore.getState().showLoginModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div id='login-modal' className='bg-white p-6 rounded-lg shadow-lg'>
            <LoginModal isOpen={true} onClose={() => {
              useAuthStore.setState({ showLoginModal: false });
              setHasAttemptedClick(false); // 모달 닫을 때 알림 다시 뜨지 않도록 리셋
            }} />
          </div>
        </div>
      )}
      <Sidebar />
      <div className='flex-1'>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};
