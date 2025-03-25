"use client";

import { useEffect } from "react";
import { Assignment } from "@/types/assignment";
import { useChapters } from "@/api/lectureDetailApi";
import { useAssignmentStore } from "@/store/useAssignmentStore";

interface AssignmentListProps {
  selectedChapter: number | null;
  setSelectedChapter: (id: number) => void;
  setSelectedAssignment: (assignment: Assignment) => void;
  lectureId: number;
}

const AssignmentList = ({
  selectedChapter,
  setSelectedChapter,
  setSelectedAssignment,
  lectureId,
}: AssignmentListProps) => {
  const { data: chapters = [], isLoading: chaptersLoading } = useChapters(lectureId);
  const { assignments, isLoading: assignmentsLoading, fetchAssignments } = useAssignmentStore();

  // 챕터 목록이 로딩되고 첫 챕터가 있으면 자동 선택
  useEffect(() => {
    if (!selectedChapter && chapters.length > 0) {
      setSelectedChapter(chapters[0].id);
    }
  }, [chapters]);

  // 챕터 선택 시 과제 목록 불러오기
  useEffect(() => {
    if (selectedChapter) {
      fetchAssignments(selectedChapter);
    }
  }, [selectedChapter]);

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh]">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">과제 목록</h2>
      </div>
      <div className="mt-4 px-4">
        {chaptersLoading ? (
          <p className="text-gray-500">챕터를 불러오는 중...</p>
        ) : (
          <select
            value={selectedChapter || ""}
            onChange={(e) => setSelectedChapter(Number(e.target.value))}
            className="w-full border p-2 rounded-md"
          >
            <option value="">챕터를 선택하세요</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mt-4 px-4">
        {assignmentsLoading ? (
          <p className="text-gray-500 text-center mt-4">과제를 불러오는 중...</p>
        ) : assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className="p-2 cursor-pointer hover:bg-sky-100 border-b-[1px] border-gray-200"
              >
                {assignment.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-4">과제가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentList;
