import { AxiosError } from "axios";
import api from "./api";
import {
  Assignment,
  AssignmentComment,
  SAssignment,
  SAssignmentComment,
  transformAssignment,
  transformAssignmentComment
} from "@/types/assignment";

// 챕터별 과제 목록 조회
export const fetchAssignments = async (
  lectureChapterId: number
): Promise<Assignment[]> => {
  try {
    const response = await api.get<{ assignments: SAssignment[] }>(
      `/assignments/${lectureChapterId}`
    );

    const assignments = response.data.assignments || [];
    //console.log("✅ fetchAssignments API 응답:", assignments);

    return assignments.map(transformAssignment);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("❌ 과제 목록 조회 오류:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("❌ 과제 목록 조회 네트워크 오류:", axiosError.message);
    }

    return [];
  }
};


// 수강생 과제 및 피드백 목록 조회
export const fetchAssignmentsComment = async (
  assignmentId: number
): Promise<AssignmentComment[]> => {
  try {
    const response = await api.get<SAssignmentComment[]>(
      `/assignments/assignment-comment/${assignmentId}`
    );
    console.log("fetchAssignmentsComment API 응답 데이터:", response.data);
    return response.data.map(transformAssignmentComment)
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("피드백 목록을 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("피드백 목록을 불러오는 중 네트워크 오류:", axiosError.message);
    }

    return [];
  }
};

// 과제 제출
export const submitAssignmentComment = async (
  assignmentId: number,
  formData: FormData
): Promise<void> => {
  try {
    await api.post(`/assignments/assignment-comment/${assignmentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("과제 제출 성공");
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("과제 제출 실패:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("과제 제출 실패:", axiosError.message);
    }
  }
};
