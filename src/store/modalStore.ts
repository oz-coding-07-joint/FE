import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false, // 초기 상태: 닫힘
  openModal: () => set({ isOpen: true }), // 모달 열기
  closeModal: () => set({ isOpen: false }), // 모달 닫기
}));
