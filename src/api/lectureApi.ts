// src/api/lectureApi.ts
import { Lecture, Instructor } from "@/types/class";
import { LectureDetail } from "@/types/lectureDetail";

interface RawLecture {
  id: number;
  title: string;
  thumbnail: string;
  progress_rate: string;
}

export async function fetchLectures(): Promise<Lecture[]> {
  try {
    const response = await fetch("/api/lectures");
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: RawLecture[] = await response.json();
    // RawLecture를 Lecture로 변환
    return data.map((raw) => ({
      id: raw.id,
      title: raw.title,
      thumbnailUrl: raw.thumbnail,
      progressRate: parseInt(raw.progress_rate, 10), // 문자열을 숫자로 변환
      introduction: "", // API에 없으므로 기본값
      learningObjectives: "", // API에 없으므로 기본값
      instructor: { id: 0, experience: "" }, // API에 없으므로 기본값
    }));
  } catch (error) {
    console.error("강의 목록을 불러오는 중 오류 발생:", error);
    return [
      {
        id: 1,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 50,
        introduction: "", // 기본값
        learningObjectives: "", // 기본값
        instructor: { id: 1, experience: "" }, // 기본값
      },
      {
        id: 2,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 75,
        introduction: "", // 기본값
        learningObjectives: "", // 기본값
        instructor: { id: 2, experience: "" }, // 기본값
      },
    ];
  }
}

export async function fetchLectureDetail(lectureId: number): Promise<LectureDetail> {
  try {
    const response = await fetch(`/api/lectures/${lectureId}`);
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: LectureDetail = await response.json();
    return data;
  } catch (error) {
    console.error("강의 상세 정보를 불러오는 중 오류 발생:", error);
    // 더미 데이터로 대체
    return {
      id: lectureId,
      title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
      introduction: lectureId === 1 ? "이 강의는 초급자를 위한 기본 강의입니다." : "중급자를 위한 심화 강의입니다.",
      learning_objective: lectureId === 1 ? "기초 개념 이해 및 실습" : "고급 기술 습득",
      instructor: { id: lectureId, experience: lectureId === 1 ? "5년" : "10년" },
    };
  }
}