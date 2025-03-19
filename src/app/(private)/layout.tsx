"use client";

import React from "react";
import Sidebar from "./_components/layout/Sidebar";
import Header from "./_components/layout/Header";
import { useAuthStore } from "@/store/useAuthStore";
import LoginModal from "../(auth)/_components/LoginModal";

export default function ClassroomLayout({ children }: { children: React.ReactNode }) {
  const { showLoginModal, setShowLoginModal } = useAuthStore();
  return (
    <div className="flex min-h-screen bg-muted-100">
      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <LoginModal isOpen={true} onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
