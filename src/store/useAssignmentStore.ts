import { create } from "zustand";
import { Assignment, AssignmentComment } from "@/types/assignment";
import { fetchAssignments, fetchAssignmentsComment, submitAssignmentComment } from "@/api/assignmentApi";

interface AssignmentStore {
  assignments: Assignment[];
  comments: AssignmentComment[];
  isLoading: boolean;
  isCommentLoading: boolean;
  selectedAssignment: Assignment | null;
  setSelectedAssignment: (assignment: Assignment | null) => void;

  fetchAssignments: (chapterId: number) => Promise<void>;
  fetchComments: (assignmentId: number) => Promise<void>;
  addComment: (assignmentId: number, commentData: FormData) => Promise<void>;
}

export const useAssignmentStore = create<AssignmentStore>((set, get) => ({
  assignments: [],
  comments: [],
  isLoading: false,
  isCommentLoading: false,
  selectedAssignment: null,
  setSelectedAssignment: (assignment) => set({ selectedAssignment: assignment }),

  fetchAssignments: async (chapterId: number) => {
    try {
      set({ isLoading: true });
      const data = await fetchAssignments(chapterId);
      set({ assignments: data });
    } catch (error) {
      console.error("❌ 과제 불러오기 실패:", error);
      set({ assignments: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchComments: async (assignmentId: number) => {
    try {
      set({ isCommentLoading: true });
      const comments = await fetchAssignmentsComment(assignmentId);
      set({ comments });
    } catch (error) {
      console.error("❌ 피드백 불러오기 실패:", error);
      set({ comments: [] });
    } finally {
      set({ isCommentLoading: false });
    }
  },

  addComment: async (assignmentId: number, formData: FormData) => {
    try {
      await submitAssignmentComment(assignmentId, formData);
      await get().fetchComments(assignmentId); // 서버에서 다시 불러오기
    } catch (error) {
      console.error("❌ 댓글 제출 실패:", error);
    }
  },
}));
