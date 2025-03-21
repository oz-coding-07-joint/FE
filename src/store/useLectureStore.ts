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

type VideoStore = {
  playing: boolean;
  duration: number;
  setPlaying: (state: boolean) => void;
  setDuration: (total: number) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  playing: false,
  duration: 0,
  setPlaying: (state) => set({playing: state}),
  setDuration: (total) => set({duration: total}),
}))