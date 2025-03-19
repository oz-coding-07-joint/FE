// src/store/useAssignmentStore.ts
import { create } from 'zustand';
import { fetchAssignments } from '@/api/assignmentApi';

interface Assignment {
  id: number;
  title: string;
  fileUrl?: string;
  progress_rate?: number;
}

interface AssignmentStore {
  assignments: Assignment[];
  isLoading: boolean; // 로딩 상태 추가
  fetchAssignments: () => Promise<void>;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  isLoading: false, // 초기값 false
  fetchAssignments: async () => {
    try {
      set({ isLoading: true }); // 로딩 시작
      const fetchedAssignments = await fetchAssignments();
      set({ assignments: fetchedAssignments });
    } catch (error) {
      console.error("Error fetching assignments:", error);
      set({ assignments: [] });
    } finally {
      set({ isLoading: false }); // 로딩 완료
    }
  },
}));