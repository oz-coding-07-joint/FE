/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { fetchLectures } from "@/api/lectureApi";
import { Lecture } from "@/types/class";
import Link from "next/link";

export default function LecturePage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLectures() {
      try {
        const data = await fetchLectures();
        setLectures(data);
      } catch (error) {
        console.error("강의 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLectures();
  }, []);

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">강의 목록</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
        {lectures.map((lecture) => (
          <Link key={lecture.id} href={`/classroom/lecture/${lecture.id}`}>
            <div className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px]">
              <img
                src={lecture.thumbnailUrl || "@/assets/images/no-img.png"}
                alt={lecture.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {lecture.title}
                </h3>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${lecture.progressRate}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {lecture.progressRate}% 강좌 완료
                </p>
                <div className="flex mt-4">
                  <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded flex-1">
                    수업 정보 보기
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 flex-1 ml-3">
                    수업 후기 작성
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}