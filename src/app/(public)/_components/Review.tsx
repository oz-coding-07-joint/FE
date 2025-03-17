"use client";
import { useState } from "react";

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
      content:
        "저는 예중·예고의 작곡과에 가고 싶은 학생인데, 주변에 화성학을 배울 곳이 마땅치 않아서 고민이에요. 화성학 성적이 제대로 나와요 수업을 따라가든 대학교에 진학하든 할 수 있을 텐데 학원을 다니기엔 시간이 맞지 않고, 독학하려니 채점도 안 되고, 맞게 하고 있는지도 모르겠어요... 저처럼 입시를 준비하는 학생들에게 꼭 필요한 과정이었으면 좋겠어요.",
    },
    {
      name: "수강생 이름",
      rating: "⭐︎⭐︎⭐︎⭐︎⭐︎",
      category: "20대, 작곡 새내기",
      content:
        "작곡을 하면서 음이라든가, 화성학이 중요하다는 게 많이 와닿았어요. 하지만 기존의 화성학 강의들은 직접 찾아가야 하고, 온라인으로 찾을 수 있는 강의는 단방향이라 문제에 대한 피드백을 받는 게 어려워서 계속 미루고 있어요.",
    },
  ];

  return (
    <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-5">
      <span className="text-white text-4xl mb-10">
        상상하는 당신이 우리에게 말했다
      </span>

      {reviews.map((review, index) => (
        <div
          key={index}
          className="w-[1200px] md:w-3/4 sm:w-1/2 h-auto bg-white rounded-xl p-6 flex flex-row cursor-pointer"
          onClick={() => toggleExpand(index)}
        >
          {/* 프로필 이미지 (더미 박스) */}
          <div className="bg-gray-400 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0"></div>

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
