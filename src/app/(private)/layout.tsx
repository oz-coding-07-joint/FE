import React from 'react';
import Sidebar from './_components/layout/Sidebar';
import Header from './_components/layout/Header';

export default function ClassroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className='flex min-h-screen'>
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