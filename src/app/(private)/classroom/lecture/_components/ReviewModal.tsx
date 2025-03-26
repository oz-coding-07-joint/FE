import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useModalStore } from "@/store/useModalStore";
import { useState } from "react";
import { AxiosError } from "axios";
import { submitReview } from "@/api/lectureApi";

interface ReviewModalProps {
  lectureTitle: string;
  lectureId: number | null;
}

const ReviewModal = ({ lectureTitle, lectureId }: ReviewModalProps) => {
  const { closeModal, modals } = useModalStore();
  const [reviewData, setReviewData] = useState({ star: 0, content: "" });

  const handleReviewSubmit = async () => {
    if (!lectureId) {
      alert("강의를 선택해주세요.");
      return;
    }

    if (reviewData.star === 0 || !reviewData.content.trim()) {
      alert("별점과 후기 내용을 입력해 주세요.");
      return;
    }

    try {
      await submitReview(lectureId, reviewData);
      alert("후기가 성공적으로 제출되었습니다!");
      setReviewData({ star: 0, content: "" }); // 입력 초기화
      closeModal("review");
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "후기 제출에 실패했습니다. 다시 시도해 주세요.");
      } else {
        alert("후기 제출에 실패했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <Modal modalKey="review">
      {modals["review"] && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">수강후기</h2>
          <p className="text-gray-800 mb-2">강의명: {lectureTitle}</p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">평점</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-2xl ${star <= reviewData.star ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setReviewData({ ...reviewData, star })}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={reviewData.content}
            onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
            className="w-full p-2 border rounded text-black placeholder-gray-400 h-[200px] resize-none"
            placeholder="이 강의에 대한 후기를 작성해 주세요."
          />
          <div className="flex justify-center">
            <Button label="제출하기" onClick={handleReviewSubmit} variant="primary" size="small" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReviewModal;
