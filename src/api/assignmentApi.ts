import { Assignment } from "@/types/assignment";

export async function fetchAssignments(): Promise<Assignment[]> {
  // 백엔드 API 호출 (예시)
  try {
    const response = await fetch("/api/assignments");
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: Assignment[] = await response.json();
    return data;
  } catch (error) {
    console.error("과제 목록을 불러오는 중 오류 발생:", error);
    // 더미 데이터로 대체 (백엔드 오류 시)
    return [
      {
        id: 1,
        videoId: 1,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        content: "첫 번째 과제 설명",
        fileUrl: "/placeholder.jpg",
      },
      {
        id: 2,
        videoId: 2,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        content: "두 번째 과제 설명",
        fileUrl: "/placeholder.jpg",
      },
    ];
  }
}