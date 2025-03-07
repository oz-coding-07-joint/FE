import React from "react";
import { Lecture } from "@/types/class";

interface Props {
  lecture: Lecture;
}

const LectureCard: React.FC<Props> = ({ lecture }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={lecture.thumbnailUrl} alt={lecture.title} className="w-full h-32 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{lecture.title}</h3>
      <p className="text-sm text-gray-600">진행률: {lecture.progressRate}%</p>
    </div>
  );
};

export default LectureCard;
