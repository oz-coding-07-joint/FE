"use client";

import { Assignment } from "@/types/assignment";
import { getFileNameFromUrl } from "@/utils/fileurl";
import { Paperclip } from "phosphor-react";
import { forceDownload } from "@/utils/forceDownload"; // ✅ 다운로드 유틸 import

interface AssignmentDetailProps {
  selectedAssignment: Assignment | null;
}

const AssignmentDetail = ({ selectedAssignment }: AssignmentDetailProps) => {
  const fileUrl = selectedAssignment?.fileUrl || "";
  const fileName = fileUrl ? getFileNameFromUrl(fileUrl) : "";

  const handleDownload = () => {
    if (fileUrl) {
      forceDownload(fileUrl, fileName);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden flex-1 h-[75vh] flex flex-col">
      {/* 헤더 */}
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">
          {selectedAssignment ? selectedAssignment.title : "과제 내용"}
        </h2>
      </div>

      {/* 내용 */}
      <div className="p-4 overflow-y-auto flex-1">
        {selectedAssignment ? (
          <p className="text-gray-700">{selectedAssignment.content}</p>
        ) : (
          <p className="text-gray-500 text-center">과제를 선택해주세요.</p>
        )}
      </div>

      {/* 첨부파일 */}
      <div className="p-4 border-t bg-white">
        {fileUrl ? (
          <button
            onClick={handleDownload}
            className="flex items-center text-sm text-blue-600 underline gap-1"
          >
            <Paperclip size={14} />
            {fileName}
          </button>
        ) : (
          <p className="text-gray-700">첨부 파일 없음</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentDetail;
