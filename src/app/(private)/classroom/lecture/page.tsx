"use client";

import { useEffect, useState } from "react";
import { fetchLectures } from "@/api/lectureApi";
import { Lecture } from "@/types/class";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="bg-white rounded-lg shadow-md">
            <img
              src={lecture.thumbnailUrl}
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
              <div className="flex justify-between mt-4">
                <button className="bg-muted-400 text-white px-4 py-2 rounded hover:bg-muted-500">
                  수업 정보 보기
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
                  수업 보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}