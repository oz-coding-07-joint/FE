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
  setSelectedChapterId: (id) => set({ selectedChapterId: id }),
  setSelectedVideoId: (id) => set({ selectedVideoId: id }),
}));

type VideoStore = {
  playing: boolean;
  duration: number;
  currentUrl: string | null;
  pendingSeekTime: number | null;
  isUpdatingUrl: boolean;
  setPlaying: (state: boolean) => void;
  setDuration: (total: number) => void;
  setCurrentUrl: (url: string) => void;
  setPendingSeekTime: (time: number) => void
  setIsUpdatingUrl: (state: boolean) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  playing: false,
  duration: 0,
  currentUrl: null,
  pendingSeekTime: null,
  isUpdatingUrl: false,
  setPlaying: (state) => set({ playing: state }),
  setDuration: (total) => set({ duration: total }),
  setCurrentUrl: (url) => set({ currentUrl: url }),
  setPendingSeekTime: (time) => set({ pendingSeekTime: time }),
  setIsUpdatingUrl: (state) => ({ isUpdatingUrl: state }),
}))