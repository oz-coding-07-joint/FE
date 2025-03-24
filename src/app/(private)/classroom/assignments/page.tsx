/* eslint-disable @next/next/no-img-element */
"use client";
import { useLectureListStore } from "@/store/useLectureListStore";
import { Lecture } from "@/types/class";
import LectureCard from "../../_components/ui/LectureCard";

export default function AssignmentsPage() {

  const { lectures } = useLectureListStore();

  return (
    <div className="bg-muted-100 h-screen px-5 pt-5">
      <h1 className="text-3xl font-bold pb-3">과제</h1>
      {lectures.length === 0 ? (
        <div className="text-center text-gray-600">수강중인 강의가 없습니다</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
          {lectures.map((lecture: Lecture) => (
            <div
              key={lecture.id}
              className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px] hover:shadow-lg transition-shadow"
            >
              <LectureCard lecture={lecture} type="assignments" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}