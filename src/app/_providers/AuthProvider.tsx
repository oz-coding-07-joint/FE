"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AuthProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { restoreUser } = useAuthStore();

  // 컴포넌트 마운트 시 유저 정보 복원 (자동 로그인)
  useEffect(() => {
    restoreUser();
  }, [restoreUser]);


  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default AuthProvider;
