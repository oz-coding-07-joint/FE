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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-xl relative">
        <button
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <X size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
