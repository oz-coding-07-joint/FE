import { fetchChapterDetails, fetchChapters } from '@/api/lectureDetailApi';
import { Chapter } from '@/types/video';
import { create } from 'zustand';

type LectureStore = {
  chapters: Chapter[];
  chapterDetails: Chapter | null;
  selectedChapterId: number | null;
  selectedVideoId: number | null;
  setSelectedChapterId: (id: number) => void;
  setSelectedVideoId: (id: number) => void;
  fetchChapters: (lectureId: number) => Promise<void>;
  fetchChapterDetails: (lectureId: number) => Promise<void>;
}

export const useLectureStore = create<LectureStore>((set, get) => ({
  chapters: [],
  chapterDetails: null,
  selectedChapterId: null,
  selectedVideoId: null,

  setSelectedChapterId: (id) => set({selectedChapterId: id}),
  setSelectedVideoId: (id) => set({selectedVideoId: id}),

  fetchChapters: async (lectureId) => {
    try {
      const fetchedChapters = await fetchChapters(lectureId);
      set({ chapters: fetchedChapters });

      if(fetchedChapters.length > 0) {
        set({ selectedChapterId: fetchedChapters[0].id});
      }
    } catch(error) {
      console.error(`Error fetching chapters:`, error);
    }
  },

  fetchChapterDetails: async (lectureId) => {
    try{
      const {selectedChapterId} = get();
      if(!selectedChapterId) return;

      const fetchedChapterDetails = await fetchChapterDetails(lectureId, selectedChapterId);
      set({chapterDetails: fetchedChapterDetails});

      if(fetchedChapterDetails.chapterVideoTitles.length > 0) {
        set({selectedVideoId: fetchedChapterDetails.chapterVideoTitles[0].id});
      }
    } catch(error) {
      console.error(`Error fetching chapter details:`, error);
    }
  },
}));
