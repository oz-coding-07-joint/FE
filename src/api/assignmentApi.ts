import axios from "axios";
import { Assignment } from "@/types/assignment";

export async function fetchAssignments(): Promise<Assignment[]> {
  const response = await axios.get("/api/assignments"); // 백엔드 엔드포인트 가정
  return response.data; // 백엔드에서 바로 Assignment 타입 데이터 반환 가정
}