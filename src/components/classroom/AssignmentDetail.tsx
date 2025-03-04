// src/components/classroom/AssignmentDetail.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Assignment } from "@/types/assignment"; // 타입 정의를 임포트

interface AssignmentDetailProps {
  lectureId: number; // lectureId를 prop으로 받음
}

const AssignmentDetail = ({ lectureId }: AssignmentDetailProps) => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`/api/assignments/${lectureId}`);
        setAssignment(response.data);
      } catch (error) {
        console.error("과제 정보 로드 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [lectureId]);

  if (loading) return <div>로딩 중...</div>;

  if (!assignment) return <div>과제 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold">{assignment.title}</h1>
      <p>{assignment.content}</p>
      {/* 다른 과제 세부 정보 추가 */}
    </div>
  );
};

export default AssignmentDetail;
