import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/useModalStore";
import { Term } from "@/types/auth";

interface TermsModalProps {
  term: Term | null;
}

const TermsModal = ({ term }: TermsModalProps) => {
  const { closeModal } = useModalStore();


  return (
    <Modal modalKey="termsModal">
      <h2 className="text-xl font-bold text-center mt-4 mb-6 text-muted-600">
        {term?.name}
      </h2>
      <div className="max-h-96 overflow-auto">
        <p className="text-muted-400 whitespace-pre-wrap">
          {term?.detail || "약관 정보를 불러올 수 없습니다."}
        </p>
      </div>
      <div className="flex justify-center">
        <Button label="닫기" onClick={() => closeModal("termsModal")} variant="outline" size="small" />
      </div>
    </Modal>
  );
};

export default TermsModal;