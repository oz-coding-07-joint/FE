"use client";
import Mainpage from "./_components/Mainpage";
import { Suspense } from "react";

export default function MainPage() {
  
  return (
    <Suspense fallback={<div>로딩 중입니다...</div>}>
      <Mainpage />
    </Suspense>
  );
}
