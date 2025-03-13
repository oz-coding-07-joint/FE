// src/api/lectureApi.ts
import { Lecture } from "@/types/class";
import { LectureDetail } from "@/types/lectureDetail";
import { ReviewRequest, ReviewResponse } from "@/types/review";

interface RawLecture {
  id: number;
  title: string;
  thumbnail: string;
  progress_rate: string;
}

export async function fetchLectures(): Promise<Lecture[]> {
  try {
    const response = await fetch("/api/v1/courses/lecture/");
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: RawLecture[] = await response.json();
    console.log("API 응답 데이터:", data);
    return data.map((raw) => {
      console.log("Thumbnail 값:", raw.thumbnail);
      return {
        id: raw.id,
        title: raw.title,
        thumbnailUrl: raw.thumbnail,
        progressRate: parseInt(raw.progress_rate, 10) || 0,
        introduction: "",
        learningObjectives: "",
        instructor: { id: 0, experience: "" },
      };
    });
  } catch (error) {
    console.error("강의 목록을 불러오는 중 오류 발생:", error);
    return [
      {
        id: 1,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 50,
        introduction: "",
        learningObjectives: "",
        instructor: { id: 1, experience: "" },
      },
      {
        id: 2,
        title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
        thumbnailUrl: "/placeholder.jpg",
        progressRate: 75,
        introduction: "",
        learningObjectives: "",
        instructor: { id: 2, experience: "" },
      },
    ];
  }
}

export async function fetchLectureDetail(lectureId: number): Promise<LectureDetail> {
  try {
    const response = await fetch(`/api/v1/courses/lecture/${lectureId}/`);
    if (!response.ok) throw new Error("네트워크 응답이 올바르지 않음");
    const data: LectureDetail = await response.json();
    return data;
  } catch (error) {
    console.error("강의 상세 정보를 불러오는 중 오류 발생:", error);
    return {
      id: lectureId,
      title: "IT스타트업 사원개발캠프 - GA와 데이터러닝시",
      introduction: lectureId === 1 ? "이 강의는 초급자를 위한 기본 강의입니다." : "중급자를 위한 심화 강의입니다.",
      learning_objective: lectureId === 1 ? "기초 개념 이해 및 실습" : "고급 기술 습득",
      instructor: { id: lectureId, experience: lectureId === 1 ? "5년" : "10년" },
    };
  }
}

export async function submitReview(lectureId: number, reviewData: ReviewRequest): Promise<ReviewResponse> {
  try {
    const response = await fetch(`/api/v1/reviews/${lectureId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("후기 제출에 실패했습니다.");
    const data: ReviewResponse = await response.json();
    return data;
  } catch (error) {
    console.error("후기 제출 중 오류 발생:", error);
    throw error;
  }
}