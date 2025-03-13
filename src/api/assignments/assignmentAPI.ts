// src/api/assignments/assignmentsApi.tsx

const API_BASE_URL = "http://211.188.59.23/api/v1";

// 강의 챕터별 과제 목록 조회 (GET /api/v1/assignments/{lecture_chapter_id}/)
export const fetchAssignmentsByChapterId = async (lectureChapterId: number) => {
  const response = await fetch(`${API_BASE_URL}/assignments/${lectureChapterId}/`);
  
  if (!response.ok) {
    throw new Error("강의 챕터별 과제 목록을 불러오는 데 실패했습니다.");
  }
  
  return response.json(); // 과제 목록 반환
};

// 수강생 과제 및 피드백 목록 조회 (GET /api/v1/assignments/assignment-comment/{assignment_id}/)
export const fetchCommentsByAssignmentId = async (assignmentId: number) => {
  const response = await fetch(`${API_BASE_URL}/assignments/assignment-comment/${assignmentId}/`);
  
  if (!response.ok) {
    throw new Error("수강생 과제 및 피드백 목록을 불러오는 데 실패했습니다.");
  }
  
  return response.json(); // 과제 댓글 및 피드백 목록 반환
};

// 강의 과제 제출 (POST /api/v1/assignments/assignment-comment/{assignment_id}/)
export const submitAssignmentComment = async (assignmentId: number, content: string) => {
  const response = await fetch(`${API_BASE_URL}/assignments/assignment-comment/${assignmentId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }), // 댓글 내용 전송
  });

  if (!response.ok) {
    throw new Error("과제를 제출하는 데 실패했습니다.");
  }

  return response.json(); // 제출한 댓글 데이터 반환
};
