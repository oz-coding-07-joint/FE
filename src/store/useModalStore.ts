import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {}, // 모든 모달 기본적으로 닫힘

  openModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true },
    })),

  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false },
    })),
}));
