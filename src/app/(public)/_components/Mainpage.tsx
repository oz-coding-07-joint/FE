"use client";

import Image from "next/image";
import Logoimg from "../../../assets/images/sangsangLogo.png";
import Explanation from "./Explanation";
import Wishlist from "./Wishlist/Wishlist";
import Features from "./Features/Features";
import Learn from "./Learn/Learn";
import Review from "./Review/Review";
import Bottom from "./Bottom";
import { usePathname, useSearchParams } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { useEffect } from "react";

export default function Mainpage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { openModal } = useModalStore();

  useEffect(() => {
    if (searchParams.get("login_required") === "true") {
      alert("로그인해야 이용할 수 있습니다.");
      openModal("login");

      // 쿼리스트링 제거
      const newUrl = `${pathname}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams, pathname]);

  return (
    <div className="bg-primary-900 flex flex-col text-xl font-bold overflow-hidden">
      <div className="relative h-screen flex justify-center items-center ">
        {/* 배경 이미지 + 투명도 적용 */}
        <div className="absolute inset-0 bg-mainImage bg-cover bg-no-repeat bg-center opacity-40"></div>

        <div className="relative flex flex-col gap-6 items-center">
          <span className="text-white text-6xl font-normal tracking-tighter">
            음악의 상<span className="text-[#3eceff]">上</span>상
            <span className="text-[#3eceff]">上</span>을 현실로,
          </span>
          {/* <span className="text-accent-200 text-7xl"> */}
          <Image src={Logoimg} alt="logoimg" className="w-[280px]" />
          {/* </span> */}
        </div>
      </div>
      <Explanation />
      <Wishlist />
      <Features />
      <Learn />
      <Review />
      <Bottom />
    </div>
  );
}
