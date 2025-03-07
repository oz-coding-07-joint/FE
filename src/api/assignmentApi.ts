// import axios from "axios";
// import { Assignment } from "@/types/assignment";

// export async function fetchAssignments(): Promise<Assignment[]> {
//   const response = await axios.get("/api/assignments"); // 백엔드 엔드포인트 가정
//   return response.data; // 백엔드에서 바로 Assignment 타입 데이터 반환 가정
// }

import { Assignment } from "@/types/assignment";

export async function fetchAssignments(): Promise<Assignment[]> {
  return [
    {
      id: 1,
      videoId: 1,
      title: "과제 1",
      content: "첫 번째 과제 설명",
      fileUrl: "/placeholder.jpg",
    },
    {
      id: 2,
      videoId: 2,
      title: "과제 2",
      content: "두 번째 과제 설명",
      fileUrl: "/placeholder.jpg",
    },
  ];
}