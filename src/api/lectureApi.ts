// 강의 관련 API 요청 함수

import axios from "axios";
import { Lecture, transformLecture } from "@/types/class";

export async function fetchLectures(): Promise<Lecture[]> {
  const response = await axios.get("/api/lectures");
  return response.data.map(transformLecture);
}
