// import axios from "axios";
// import { Lecture } from "@/types/class";

// export async function fetchLectures(): Promise<Lecture[]> {
//   const response = await axios.get("/api/lectures"); // 백엔드 엔드포인트 가정
//   return response.data; // 백엔드에서 바로 Lecture 타입 데이터 반환 가정
// }

import { Lecture } from "@/types/class";

export async function fetchLectures(): Promise<Lecture[]> {
  return [
    {
      id: 1,
      title: "강의 1",
      thumbnailUrl: "/placeholder.jpg",
      progressRate: 50,
      introduction: "이 강의는 초급자를 위한 기본 강의입니다.",
      learningObjectives: "기초 개념 이해 및 실습",
      instructor: { id: 1, experience: "5년" },
    },
    {
      id: 2,
      title: "강의 2",
      thumbnailUrl: "/placeholder.jpg",
      progressRate: 75,
      introduction: "중급자를 위한 심화 강의입니다.",
      learningObjectives: "고급 기술 습득",
      instructor: { id: 2, experience: "10년" },
    },
  ];
}