import { create } from 'zustand';
import { fetchLectures, fetchLectureDetail, submitReview } from '@/api/lectureApi';
import { Lecture } from '@/types/class';

interface ReviewData {
  star: number;
  content: string;
}

interface LectureListStore {
  lectures: Lecture[];
  lectureDetail: Lecture | null;
  isLoading: boolean; // 로딩 상태 추가
  error: string | null; // 에러 메시지 추가
  fetchLectures: () => Promise<void>;
  fetchLectureDetail: (lectureId: number) => Promise<void>;
  submitReview: (lectureId: number, reviewData: ReviewData) => Promise<boolean>; //성공 여부 반환
}

export const useLectureListStore = create<LectureListStore>((set) => ({
  lectures: [],
  lectureDetail: null,
  isLoading: false,
  error: null,

  // 강의 목록 가져오기
  fetchLectures: async () => {
    set({ isLoading: true, error: null }); // 로딩 시작
    try {
      const fetchedLectures = await fetchLectures();
      set({ lectures: fetchedLectures, isLoading: false });
    } catch (error) {
      console.error("강의 목록 불러오기 오류:", error);
      set({ lectures: [], isLoading: false, error: "강의 목록을 불러오는데 실패했습니다." });
    }
  },

  // 강의 상세 정보 가져오기
  fetchLectureDetail: async (lectureId: number) => {
    set({ isLoading: true, error: null });
    try {
      const fetchedLectureDetail = await fetchLectureDetail(lectureId);
      if (fetchedLectureDetail) {
        set({ lectureDetail: fetchedLectureDetail, isLoading: false });
      } else {
        throw new Error("강의 상세 정보가 없습니다.");
      }
    } catch (error) {
      console.error("강의 상세 정보 불러오기 오류:", error);
      set({ lectureDetail: null, isLoading: false, error: "강의 상세 정보를 불러오는데 실패했습니다." });
    }
  },

  // 리뷰 제출
  submitReview: async (lectureId: number, reviewData: ReviewData) => {
    try {
      const success = await submitReview(lectureId, reviewData);
      if (success) {
        console.log("리뷰 제출 성공");
        return true;
      } else {
        console.error("리뷰 제출 실패");
        return false;
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류:", error);
      return false;
    }
  },
}));
