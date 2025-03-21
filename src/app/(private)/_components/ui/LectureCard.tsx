"use client";

import { Lecture } from "@/types/class";
import Link from "next/link";
import Image from "next/image";

interface LectureCardProps {
  type: string;
  lecture: Lecture;
}

const LectureCard = ({ type, lecture }: LectureCardProps) => {
  return (
    <>
      {/* 썸네일 및 제목 클릭 시 상세 페이지 이동 */}
      <Link href={`/classroom/${type}/${lecture.id}`}>
        <div className="cursor-pointer">
          <Image
            src={lecture.thumbnailUrl || "/assets/images/no-img.png"}
            alt={lecture.title}
            width={300}
            height={192}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{lecture.title}</h3>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: `${lecture.progressRate}%` }}
              ></div>
            </div>
            <p className="text-gray-500 text-sm mt-1">{lecture.progressRate}% 강좌 완료</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default LectureCard;