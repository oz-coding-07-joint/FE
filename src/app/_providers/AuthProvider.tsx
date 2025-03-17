"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { restoreUser } = useAuthStore();

  // 컴포넌트 마운트 시 유저 정보 복원 (자동 로그인)
  useEffect(() => {
    restoreUser();
  }, []);


  return <>{children}</>;
}

export default AuthProvider;
