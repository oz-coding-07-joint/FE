"use client";

import { useState, useEffect } from "react";
import AssignmentList from "@/app/(private)/_components/ui/AssignmentList";
import AssignmentDetail from "@/app/(private)/_components/ui/AssignmentDetail";
import AssignmentFeedback from "@/app/(private)/_components/ui/AssignmentFeedback";
import api from "@/api/api";
import { useAuthStore } from "@/store/useAuthStore";
import { Assignment } from "@/types/assignment";

interface LectureDetail {
  id: number;
  title: string;
  introduction: string;
  learning_objective: string;
  instructor: {
    id: number;
    experience: string;
  };
}

const AssignmentPage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [lecture, setLecture] = useState<LectureDetail>({
    id: 0,
    title: "",
    introduction: "",
    learning_objective: "",
    instructor: {
      id: 0,
      experience: "",
    },
  });

  const { user } = useAuthStore();

  // 📌 강의 상세 정보 가져오기

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await api.get(`/courses/lecture/1/`);
        setLecture(response.data);
      } catch (error) {
        console.error("❌ 강의 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchLecture();
  }, [user]);

  return (
    <div className="p-8">
      {/* 📌 강의 제목을 동적으로 표시 */}
      <h1 className="text-3xl font-bold mb-8">{lecture.title}</h1>

      <div className="flex gap-6">
        {/* 📌 과제 목록 */}
        <AssignmentList
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
          setSelectedAssignment={setSelectedAssignment}
        />

        {/* 📌 과제 내용 */}
        <AssignmentDetail selectedAssignment={selectedAssignment} />

        {/* 📌 과제 피드백 */}
        <AssignmentFeedback selectedAssignment={selectedAssignment} />
      </div>
    </div>
  );
};

export default AssignmentPage;
