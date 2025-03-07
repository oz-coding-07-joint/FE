import { Lecture } from "@/types/class";

export async function fetchLectures(): Promise<Lecture[]> {
  // 백엔드 API 호출 (예시)
  try {
    const response = await fetch("/api/lectures");
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: Lecture[] = await response.json();
    return data;
  } catch (error) {
    console.error("강의 목록을 불러오는 중 오류 발생:", error);
    // 더미 데이터로 대체 (백엔드 오류 시)
    return [
      {
        id: 1,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 50,
        introduction: "이 강의는 초급자를 위한 기본 강의입니다.",
        learningObjectives: "기초 개념 이해 및 실습",
        instructor: { id: 1, experience: "5년" },
      },
      {
        id: 2,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 75,
        introduction: "중급자를 위한 심화 강의입니다.",
        learningObjectives: "고급 기술 습득",
        instructor: { id: 2, experience: "10년" },
      },
    ];
  }
}