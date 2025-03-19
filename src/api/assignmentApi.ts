import { AxiosError } from "axios";
import api from "./api";
import { Assignment } from "@/types/lectureDetail";

// 과제 목록 조회
export async function fetchAssignments(): Promise<Assignment[]> {
  try {
    const response = await api.get('/assignments/1/');
    console.log("fetchAssignments API 응답 데이터:", response.data);
    return response.data.assignments as Assignment[];
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("과제 목록을 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("과제 목록을 불러오는 중 네트워크 오류:", axiosError.message);
    }
    return [];
  }
}