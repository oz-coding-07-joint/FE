"use client";

import { Potta_One } from "next/font/google";

// Potta One 폰트 설정
const pottaOne = Potta_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function WishlistTitle() {
  return (
    <div className="flex flex-col w-96 px-6">
      <div className="text-accent-300 flex items-start">
        <p className={`${pottaOne.className} text-6xl leading-3`}>“</p>
      </div>
      <div className="flex justify-center text-accent-300 gap-8">
        <p className="text-accent-300 font-normal text-[50px] text-center whitespace-pre-line leading-tight">
          {`상상하는
          당신이 
          우리에게
          말했다.`}
        </p>
      </div>
      <div className="text-accent-300 flex justify-end">
        <p
          className={`${pottaOne.className} rotate-180 text-6xl leading-3 mb-20`}
        >
          “
        </p>
      </div>
    </div>
  );
}
