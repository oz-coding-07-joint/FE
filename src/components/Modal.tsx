"use client";

import { X } from "phosphor-react";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[520px] max-w-[90vw] max-h-[80vh] sm:max-w-[90vw] p-8 rounded-lg shadow-xl overflow-auto relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-5 right-5 text-muted-400"
          onClick={onClose}
        >
          <X size={30} weight="bold" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
