// src/store/useLectureListStore.ts
import { create } from 'zustand';
import { fetchLectures, fetchLectureDetail, submitReview } from '@/api/lectureApi';

interface Lecture {
  id: number;
  title: string;
  thumbnail?: string;
  progress_rate?: number;
  introduction?: string;
  learningObjectives?: string;
  instructor?: { id: number; experience: string };
}

interface LectureDetail {
  id: number;
  title: string;
  introduction?: string;
  learning_objective?: string;
  instructor?: { id: number; experience: string };
  progress_rate?: number;
}

interface ReviewData {
  star: number;
  content: string;
}

interface LectureListStore {
  lectures: Lecture[];
  lectureDetail: LectureDetail | null;
  fetchLectures: () => Promise<void>;
  fetchLectureDetail: (lectureId: number) => Promise<void>;
  submitReview: (lectureId: number, reviewData: ReviewData) => Promise<void>;
}

export const useLectureListStore = create<LectureListStore>((set) => ({
  lectures: [],
  lectureDetail: null,
  fetchLectures: async () => {
    try {
      const fetchedLectures = await fetchLectures();
      set({ lectures: fetchedLectures });
    } catch (error) {
      console.error("Error fetching lectures:", error);
      set({ lectures: [] });
    }
  },
  fetchLectureDetail: async (lectureId: number) => {
    try {
      const fetchedLectureDetail = await fetchLectureDetail(lectureId);
      set({ lectureDetail: fetchedLectureDetail });
    } catch (error) {
      console.error("Error fetching lecture detail:", error);
      set({ lectureDetail: null });
    }
  },
  submitReview: async (lectureId: number, reviewData: ReviewData) => {
    try {
      await submitReview(lectureId, reviewData);
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error; // 에러를 호출한 곳에서 처리하도록 throw
    }
  },
}));