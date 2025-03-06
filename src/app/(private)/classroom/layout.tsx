import React from 'react';
import Sidebar from '../_components/ui/Sidebar';
import Header from '../_components/Header';

export default function ClassroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <main >
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
};