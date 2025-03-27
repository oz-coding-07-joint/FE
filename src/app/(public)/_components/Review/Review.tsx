"use client";

import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "May***",
    description: "오프라인 수강생",
    content:
      "아이가 피아노치는걸 좋아해서 남자선생님을 찾아보다가 알게된곳이네요. 6살때 한번 1회 해보고 동네 피아노학원도 해봤는데 음악더하기 가고싶다고해서 고민하다가 7세때부터 다니기 시작했어요. 아직 2개원밖에 되지 안았는데 일단 피아노 구조,원리 줄의 길이등 다 알려주셔서 좋았어요. 어른들 다니는곳 같아서 좀 걱정했는데 선생님께서 궁금한것도 잘해결해주시고 동네 학원보다는 비싸지만 1:1이라는 점에서 맞춤으로 실력이 확느는게 장점이네요. 나비야부터 치는게 아니라 강.약 느낌을 알려주고 관심사에 맞게 알려주셔서 아이가 즐겁게 하고 이시간만 기다린다는점에서 아주만족합니다. 집에서 차로10분정도 가야해서 고민했는데 대만족♡ 어른들다니는데인데 저희가 질 떨어트리는거아닌가싶지만 질좋은 수업에 감사합니다.",
  },
  {
    name: "Cha**",
    description: "오프라인 수강생",
    content:
      "화성학 혼자 독학할 때는 너무 어려웠는데 여기서 배우니까 귀에 쏙쏙 들어오게 쉽게 설명해 주셔서 이해가 잘 돼용",
  },
  {
    name: "쭈인**",
    description: "오프라인 수강생",
    content:
      "작곡전공 선생님께 작곡을 배우고, 피아노전공 선생님께 피아노를 배워요",
  },
  {
    name: "미유****",
    description: "오프라인 수강생",
    content:
      "대학교 화성학 수업 따라가기 너무 벅차서 중간고사 기말고사 대비는 늘 음악더하기에 믿고 맡겨요 ^^",
  },
  {
    name: "gml****",
    description: "오프라인 수강생",
    content: "1:1개인레슨이라 맞춤형 커리큘럼으로 원하는 것을 배울 수 있어요!",
  },
];

const extendedReviews = [...reviews, ...reviews, ...reviews];

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(reviews.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // 2초마다 자동 슬라이드

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex >= extendedReviews.length - reviews.length) {
      setTimeout(() => {
        setCurrentIndex(reviews.length);
      }, 700);
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row text-white font-normal px-5 md:px-10 lg:px-20 my-32 gap-[100px] lg:gap-[180px]">
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
            transition:
              currentIndex === reviews.length
                ? "none"
                : "transform 0.7s ease-in-out ",
          }}
        >
          {extendedReviews.map((_, index) => (
            <ReviewCard key={index} {...reviews[index % reviews.length]} />
          ))}
        </div>
      </div>
    </div>
  );
}
