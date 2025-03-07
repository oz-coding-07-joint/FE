import React from "react";
import { Assignment } from "@/types/assignment";

interface Props {
  assignment: Assignment;
}

const AssignmentCard: React.FC<Props> = ({ assignment }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold">{assignment.title}</h3>
      <p className="text-sm text-gray-600">{assignment.content}</p>
      <a href={assignment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        첨부파일 다운로드
      </a>
    </div>
  );
};

export default AssignmentCard;
