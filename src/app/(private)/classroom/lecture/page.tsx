import React from "react";
import { fetchLectures } from "@/api/lectureApi";
import LectureCard from "./lectureCard";

const LecturePage = async () => {
  const lectures = await fetchLectures();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
};

export default LecturePage;
