import axios from "axios";
import { Lecture } from "@/types/class";

export async function fetchLectures(): Promise<Lecture[]> {
  const response = await axios.get("/api/lectures"); // 백엔드 엔드포인트 가정
  return response.data; // 백엔드에서 바로 Lecture 타입 데이터 반환 가정
}