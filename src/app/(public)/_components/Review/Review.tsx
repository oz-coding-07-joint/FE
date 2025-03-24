"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

const reviews = [
  { name: "박OO 수강생", description: "클래식 화성학 1기 수강생" },
  { name: "김OO 수강생", description: "클래식 화성학 3기 수강생" },
  { name: "강OO 수강생", description: "클래식 화성학 5기 수강생" },
  { name: "최OO 수강생", description: "클래식 화성학 4기 수강생" },
  { name: "이OO 수강생", description: "클래식 화성학 2기 수강생" },
];

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row text-white font-normal px-5 md:px-10 lg:px-20 my-32 gap-[180px]">
      {/* 타이틀 */}
      <div className="flex flex-col text-4xl mb-10">
        <span>
          상상<span className="text-accent-500">上上</span>해 낸
        </span>
        <span>당신이</span>
        <span>우리에게</span>
        <span>말했다</span>
        <span className="text-xl opacity-40 font-extralight pt-1">Reviews</span>
      </div>

      {/* 슬라이드 컨테이너 */}
      <div className="overflow-hidden w-[1370px] relative">
        <div
          className="flex gap-5 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (440 + 20)}px)`, // 카드 너비 + 간격 만큼 이동
          }}
        >
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
}
