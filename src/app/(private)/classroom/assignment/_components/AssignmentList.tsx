"use client";

import { useState, useEffect } from "react";
import api from "@/api/api";
import { transformAssignment, SAssignment, Assignment } from "@/types/assignment";

interface AssignmentListProps {
  selectedChapter: number | null;
  setSelectedChapter: (id: number) => void;
  setSelectedAssignment: (assignment: Assignment) => void;
}

const AssignmentList = ({ selectedChapter, setSelectedChapter, setSelectedAssignment }: AssignmentListProps) => {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await api.get(`/courses/lecture_chapter/1/`);
        setChapters(response.data);
        if (response.data.length > 0) {
          setSelectedChapter(response.data[0].id);
        }
      } catch (error) {
        console.error("❌ 강의 챕터 목록을 불러오는 데 실패했습니다:", error);
      }
    };
    fetchChapters();
  }, []);

  useEffect(() => {
    if (selectedChapter !== null) {
      const fetchAssignments = async () => {
        try {
          const response = await api.get(`/assignments/${selectedChapter}/`);
          const assignmentList = response.data.assignments || [];

          if (Array.isArray(assignmentList)) {
            setAssignments(assignmentList.map((assignment: SAssignment) => transformAssignment(assignment)));
          } else {
            console.error("⚠️ 예상과 다른 응답 형식입니다.");
            setAssignments([]);
          }
        } catch (error) {
          console.error("❌ 과제 목록을 불러오는 데 실패했습니다:", error);
        }
      };
      fetchAssignments();
    }
  }, [selectedChapter]);

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh]">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">과제 목록</h2>
      </div>
      <div className="mt-4 px-4">
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
      </div>
      <div className="mt-4 px-4">
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment) => (
              <li
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className="p-2 cursor-pointer hover:bg-sky-100 border-b-2 border-gray-200"
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
