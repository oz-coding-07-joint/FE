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

  if (isLoading) return <div className="text-center text-foreground">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">강의 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={lecture.thumbnailUrl}
              alt={lecture.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2 text-foreground">
              {lecture.title}
            </h3>
            <div className="w-full bg-muted-200 h-2 rounded-full mt-2">
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: `${lecture.progressRate}%` }}
              ></div>
            </div>
            <p className="text-muted-400 text-sm mt-1">
              {lecture.progressRate}% 완료
            </p>
            <div className="flex justify-between mt-4">
              <button className="bg-primary-500 text-white px-4 py-2 rounded">
                수업 정보
              </button>
              <button className="bg-secondary-500 text-white px-4 py-2 rounded">
                수업 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}