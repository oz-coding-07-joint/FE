import { AxiosError } from "axios";
import api from "./api";
import { Lecture, SLecture, transformLecture } from "@/types/class";
import { Chapter, SChapter, transformChapter } from "@/types/video";

// 강의 목록 조회
export const fetchLectures = async (): Promise<Lecture[]> => {
  try {
    const response = await api.get('/courses/lecture/');
    console.log("fetchLectures API 응답 데이터:", response);
    return response.data.map((lecture: SLecture) => transformLecture(lecture));
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("강의 목록을 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("강의 목록을 불러오는 중 네트워크 오류:", axiosError.message);
    }
    return [];
  }
};

// 강의 상세 정보 조회
export const fetchLectureDetail = async (lectureId: number): Promise<Lecture | null> => {
  try {
    const response = await api.get<SLecture>(`/courses/lecture/${lectureId}/`);
    console.log("fetchLectureDetail API 응답 데이터:", response.data);
    return transformLecture(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("강의 상세 정보를 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("강의 상세 정보를 불러오는 중 네트워크 오류:", axiosError.message);
    }
    return null;
  }
};

// 후기 제출
export const submitReview = async (lectureId: number, reviewData: { star: number; content: string }): Promise<boolean> => {
  try {
    await api.post(`/reviews/${lectureId}/`, reviewData);
    console.log("후기 제출 완료");
    return true; // 성공 시 true 반환
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("후기 제출 오류:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("후기 제출 중 네트워크 오류:", axiosError.message);
    }
    throw axiosError;
  }
};


// 챕터 목록 조회
export const fetchChapters = async (lectureId: number): Promise<Chapter[]> => {
  try {
    const response = await api.get(`/courses/lecture_chapter/${lectureId}/`);
    console.log("fetchChapters API 응답 데이터:", response.data);
    return response.data.lectures.map((chapter: SChapter) => transformChapter(chapter)); 
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("챕터 목록을 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("챕터 목록을 불러오는 중 네트워크 오류:", axiosError.message);
    }
    return [];
  }
};

// 챕터 상세 정보 조회
export const fetchChapterDetails = async (lectureId: number, chapterId: number): Promise<Chapter | null> => {
  try {
    const response = await api.get<SChapter>(`/courses/lecture/${lectureId}/chapter/${chapterId}/`);
    console.log("fetchChapterDetails API 응답 데이터:", response.data);
    return transformChapter(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("챕터 상세 정보를 불러오는 중 오류 발생:", {
        status: axiosError.response.status,
        data: axiosError.response.data,
        message: axiosError.message,
      });
    } else {
      console.error("챕터 상세 정보를 불러오는 중 네트워크 오류:", axiosError.message);
    }
    return null;
  }
};