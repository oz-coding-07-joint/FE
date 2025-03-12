"use client";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

type RegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function registrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col p-6 gap-5 items-center">
        <h2 className="text-4xl">수강신청</h2>
        <span>
          수강신청을 진행하기 위해선 아래 계좌로 이체를 진행해주세요
          <br /> 이체 확인 후 수강등록이 완료됩니다.
        </span>

        <div className="bg-muted-200 list-none flex flex-col items-center px-20 py-5 bg-opacity-40 text-muted-600">
          <li>카카오뱅크 : 3333-111111-111111</li>
          <li>계좌명 : 소리상상</li>
          <li>결제금액 : 330,000원</li>
        </div>
        <div className="flex flex-col justify-start w-96 p-6">
          <span className="font-medium text-lg mb-2 text-muted-600">
            주의사항
          </span>
          <ul className="list-disc list-inside text-muted-400">
            <li>주의사항내용</li>
            <li>주의사항내용</li>
            <li>주의사항내용</li>
          </ul>
        </div>
        <Button label="닫기" size="small" variant="outline" onClick={onClose} />
      </div>
    </Modal>
  );
}
