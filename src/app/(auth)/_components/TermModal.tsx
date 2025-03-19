import Modal from "@/components/Modal";
import { Term } from "@/types/auth";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  term: Term | null;
}

const TermsModal = ({ isOpen, onClose, term }: TermsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-center mt-4 mb-6 text-muted-600">{term?.name}</h2>
      <p className="text-muted-400 whitespace-pre-wrap">{term?.detail || "약관 정보를 불러올 수 없습니다."}</p>
    </Modal>
  );
};

export default TermsModal;
