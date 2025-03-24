"use client";

import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "박OO 수강생",
    description: "클래식 화성학 1기 수강생",
  },
  {
    name: "김OO 수강생",
    description: "클래식 화성학 3기 수강생",
  },
  {
    name: "강OO 수강생",
    description: "클래식 화성학 5기 수강생",
  },
];

export default function Review() {
  return (
    <div
      className="text-white font-normal px-5 md:px-10 lg:px-20 my-32
      flex flex-row mb-40 gap-[180px]"
    >
      {/* 타이틀 */}
      <div className="flex flex-col text-4xl">
        <span>
          상상<span className="text-accent-500">上上</span>해 낸
        </span>
        <span>당신이</span>
        <span>우리에게</span>
        <span>말했다</span>
        <span className="text-xl opacity-40 font-extralight pt-1">Reviews</span>
      </div>

      {/* 리뷰 카드 목록 */}
      <div className="flex flex-row gap-5">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
}
