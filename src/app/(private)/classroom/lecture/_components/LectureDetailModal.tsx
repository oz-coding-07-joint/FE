import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useModalStore } from "@/store/useModalStore";
import { useLectureListStore } from "@/store/useLectureListStore";

interface LectureDetailModalProps {
  lectureId: number | null;
}

const LectureDetailModal = ({ lectureId }: LectureDetailModalProps) => {
  const { closeModal, modals } = useModalStore();
  const { lectureDetail } = useLectureListStore(); // 상태에서 강의 정보 가져오기

  // 강의 정보가 없거나, lectureId가 없을 경우 모달을 렌더링하지 않음
  if (!modals["lectureDetail"] || !lectureId || !lectureDetail) return null;

  return (
    <Modal modalKey="lectureDetail">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">수업정보</h2>
        <p className="text-gray-600 mb-4">강의명: {lectureDetail?.title || "정보 없음"}</p>
        <p className="text-gray-600 mb-4">강의소개: {lectureDetail?.introduction || "정보 없음"}</p>
        <p className="text-gray-600 mb-4">학습목표: {lectureDetail?.learningObjectives || "정보 없음"}</p>
        <p className="text-gray-600 mb-4">강사: {lectureDetail?.instructor?.experience || "정보 없음"}</p>
        <div className="flex justify-center">
          <Button label="닫기" onClick={() => closeModal("lectureDetail")} variant="outline" size="small" />
        </div>
      </div>
    </Modal>
  );
};

export default LectureDetailModal;
