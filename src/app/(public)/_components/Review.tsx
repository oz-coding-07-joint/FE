"use client";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

// 리뷰 데이터 타입 정의
interface ReviewData {
  name: string;
  rating: string;
  category: string;
  content: string;
}

export default function Review() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // 클릭 시 해당 리뷰의 확장 여부를 토글
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // 리뷰 데이터 배열
  const reviews: ReviewData[] = [
    {
      name: "수강생 이름",
      rating: "⭐︎⭐︎⭐︎⭐︎⭐︎",
      category: "10대, 예중/예고 진학생",
      content: "(오프라인 레슨을 들었던 분들의 후기 1)",
    },
    {
      name: "수강생 이름",
      rating: "⭐︎⭐︎⭐︎⭐︎⭐︎",
      category: "20대, 작곡 새내기",
      content: "(오프라인 레슨을 들었던 분들의 후기 2)",
    },
  ];

  return (
    <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-5">
      <div className="text-white text-4xl mb-10 flex flex-col text-center">
        <span>상상上上해 낸</span>
        <span>당신이</span>
        <span>우리에게</span>
        <span>말했다</span>
      </div>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-[500px] md:w-3/4 sm:w-1/2 h-auto bg-white rounded-xl p-6 flex flex-row cursor-pointer"
          onClick={() => toggleExpand(index)}
        >
          {/* 프로필 이미지 (더미 박스) */}
          <div className="bg-gray-300 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0 flex justify-center items-center">
            {/* 수강생 프로필사진  */}
            <UserIcon className={`w-36 h-36`} />
          </div>

          {/* 리뷰 내용 */}
          <div className="flex flex-col font-normal ml-5 w-full">
            <div className="flex justify-between pt-3">
              <span className="font-bold mb-2">{review.name}</span>
              <span className="text-2xl">{review.rating}</span>
            </div>
            <span className="text-base text-gray-400 pb-1">
              {review.category}
            </span>
            <hr />
            <span
              className={`px-2 pt-3 lg:text-xl text-lg ${
                expandedIndex === index ? "" : "line-clamp-2 overflow-hidden"
              }`}
            >
              {review.content}
            </span>
            <button
              className="text-muted-400 text-sm mt-2 self-end"
              onClick={(e) => {
                e.stopPropagation(); // 부모 div의 onClick 이벤트 방지
                toggleExpand(index);
              }}
            >
              {expandedIndex === index ? "접기 ▲" : "더보기 ▼"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
