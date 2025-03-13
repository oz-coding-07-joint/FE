"use client";

import { useGetUserInfo } from "@/hooks/useAuth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  useGetUserInfo();

  return children;
}

export default AuthProvider;
