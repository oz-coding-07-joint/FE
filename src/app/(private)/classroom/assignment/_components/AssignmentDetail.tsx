"use client";

import { Assignment } from "@/types/assignment";

interface AssignmentDetailProps {
  selectedAssignment: Assignment | null;
}

const AssignmentDetail = ({ selectedAssignment }: AssignmentDetailProps) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden flex-1 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">
          {selectedAssignment ? selectedAssignment.title : "과제 내용"}
        </h2>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        {selectedAssignment ? (
          <p className="text-gray-700">{selectedAssignment.content}</p>
        ) : (
          <p className="text-gray-500 text-center">과제를 선택해주세요.</p>
        )}
      </div>
      <div className="p-4 border-t bg-white">
        {selectedAssignment?.fileUrl ? (
          <a href={selectedAssignment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            첨부 파일 보기
          </a>
        ) : (
          <p className="text-gray-700">첨부 파일 없음</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetail;
