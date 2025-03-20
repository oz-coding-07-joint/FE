"use client"
import Mainpage from "./_components/Mainpage";
import Features from "./_components/Features";
import Teacher from "./_components/Teacher";
import Class from "./_components/Class";
import Review from "./_components/Review";
import Footer from "./_components/Footer";
import Explanation from "./_components/Explanation";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MainPage() {

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("login_required") === "true") {
      alert("로그인해야 이용할 수 있습니다.");

      // URL에서 login_required 제거 (페이지 새로고침 없이)
      const newUrl = `${pathname}`; // 기존 pathname 유지 (쿼리스트링 제거)
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, pathname]);
  
  return (
    <div className="bg-primary-900 flex flex-col text-xl font-bold">
      <Mainpage />
      <Explanation />
      <Features />
      <Teacher />
      <Class />
      <Review />
      <Footer />
    </div>
  );
}
