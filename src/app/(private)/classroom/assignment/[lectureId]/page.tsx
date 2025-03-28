"use client";

import { useEffect, useState } from "react";
import AssignmentList from "../_components/AssignmentList";
import AssignmentDetail from "../_components/AssignmentDetail";
import AssignmentFeedback from "../_components/AssignmentFeedback";
import api from "@/api/api";
import { useAuthStore } from "@/store/useAuthStore";
import { Assignment } from "@/types/assignment";
import { useParams, useSearchParams } from "next/navigation";
import AssignmentFeedbackModal from "../_components/AssignmentFeedbackModal";


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
  const params = useParams();
  const lectureId = Number(params.lectureId); // 문자열 → 숫자 변환
  const searchParams = useSearchParams();
  const initialAssignmentId = Number(searchParams.get("chapterVideoId"));

  useEffect(() => {
    if (!initialAssignmentId || selectedAssignment) return;
  
    const fetchAssignment = async () => {
      try {
        const res = await api.get(`/assignments/${initialAssignmentId}/`);
        setSelectedAssignment(res.data);
      } catch (err) {
        console.error("❌ 과제 정보 불러오기 실패:", err);
      }
    };
  
    fetchAssignment();
  }, [initialAssignmentId]);


  // 📌 강의 정보 불러오기
  useEffect(() => {
    if (!lectureId) return;
    const fetchLecture = async () => {
      try {
        const response = await api.get(`/courses/lecture/${lectureId}/`);
        setLecture(response.data);
      } catch (error) {
        console.error("❌ 강의 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchLecture();
  }, [user, lectureId]);

  return (
    <div className="p-8">
      {/* 강의 제목 표시 */}
      <h1 className="text-3xl font-semibold mb-5">{lecture.title}</h1>

      <div className="flex gap-5 items-stretch">
        {/* 과제 목록 */}
        <AssignmentList
          selectedChapter={selectedChapter}
          selectedAssignment={selectedAssignment}
          setSelectedChapter={setSelectedChapter}
          setSelectedAssignment={setSelectedAssignment}
          lectureId={lectureId}
        />

        {/* 과제 상세 */}
        <AssignmentDetail selectedAssignment={selectedAssignment} />

        {/* 과제 피드백 */}
        <AssignmentFeedback selectedAssignment={selectedAssignment} />
      </div>
      <AssignmentFeedbackModal />
    </div>
  );
};

export default AssignmentPage;
