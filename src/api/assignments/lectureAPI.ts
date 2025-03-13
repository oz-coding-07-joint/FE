// src/api/assignments/lectureApi.tsx

const API_BASE_URL = "http://211.188.59.23/api/v1";

// 강의 자료 조회 (GET /api/v1/lectures/{lecture_id}/)
export const fetchLectureMaterialsById = async (lectureId: number) => {
  const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}/`);
  
  if (!response.ok) {
    throw new Error("수업 자료를 불러오는 데 실패했습니다.");
  }
  
  return response.json(); // 수업 자료 반환
};

// 강의 세부 정보 조회 (GET /api/v1/lectures/{lecture_id}/details)
export const fetchLectureDetailsById = async (lectureId: number) => {
  const response = await fetch(`${API_BASE_URL}/lectures/${lectureId}/details`);
  
  if (!response.ok) {
    throw new Error("강의 세부 정보를 불러오는 데 실패했습니다.");
  }
  
  return response.json(); // 강의 세부 정보 반환
};
