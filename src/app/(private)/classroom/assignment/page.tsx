/* eslint-disable @next/next/no-img-element */
"use client";
import { useLectureListStore } from "@/store/useLectureListStore";
import { Lecture } from "@/types/class";
import LectureCard from "../../_components/ui/LectureCard";
import { useEffect } from "react";

export default function AssignmentsPage() {
  const { lectures, fetchLectures } = useLectureListStore();

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-5">과제</h1>
      {lectures.length === 0 ? (
        <div className="text-center text-gray-600">수강중인 강의가 없습니다</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] gap-4 justify-items-center">
          {lectures.map((lecture: Lecture) => (
            <div
              key={lecture.id}
              className="bg-white rounded-lg shadow-md w-full min-w-[260px] max-w-[300px] hover:shadow-lg transition-shadow"
            >
              <LectureCard lecture={lecture} type="assignment" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}