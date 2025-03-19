import { create } from 'zustand';

type LectureStore = {
  selectedChapterId: number | null;
  selectedVideoId: number | null;
  setSelectedChapterId: (id: number) => void;
  setSelectedVideoId: (id: number) => void;
}

export const useLectureStore = create<LectureStore>((set) => ({
  selectedChapterId: null,
  selectedVideoId: null,
  setSelectedChapterId: (id) => set({selectedChapterId: id}),
  setSelectedVideoId: (id) => set({selectedVideoId: id}),
}));
