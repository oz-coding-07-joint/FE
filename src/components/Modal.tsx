"use client";

import { useModalStore } from "@/store/useModalStore";
import { X } from "phosphor-react";
import { ReactNode } from "react";

type ModalProps = {
  modalKey: string; // 모달을 구별할 키값
  children: ReactNode;
  width?: string;
};

const Modal = ({ modalKey, children, width = "520px" }: ModalProps) => {
  const { modals, closeModal } = useModalStore(); // Zustand 상태 가져오기

  if (!modals[modalKey]) return null; // 해당 key의 모달이 닫혀있으면 렌더링 X

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white max-w-[90vw] max-h-[80vh] sm:max-w-[90vw] p-8 rounded-lg shadow-xl overflow-auto relative"
        style={{ width }} // 인라인 스타일로 width 적용
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-5 right-5 text-muted-400"
          onClick={() => closeModal(modalKey)} // 해당 모달만 닫기
        >
          <X size={30} weight="bold" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
