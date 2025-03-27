"use client";

import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useModalStore } from "@/store/useModalStore"; // Zustand 모달 상태 추가

export default function RegistrationModal() {
  const { closeModal } = useModalStore(); // Zustand 상태 사용

  return (
    <Modal modalKey="registration">
      <div className="flex flex-col py-6 gap-5 items-center text-muted-600">
        <h2 className="text-4xl">수강신청</h2>
        <span>
          수강신청을 진행하기 위해선 아래 계좌로 이체를 진행해주세요
          <br /> 이체 확인 후 수강등록이 완료됩니다.
        </span>
        {/* 계좌정보 */}
        <div className="bg-muted-200 list-none flex flex-col items-center px-28 py-6 mb-2 bg-opacity-40 text-muted-600">
          <li>카카오뱅크 : 3333-111111-111111</li>
          <li>계좌명 : 소리상상</li>
          <li>결제금액 : 330,000원</li>
        </div>
        <div className="flex flex-col justify-start p-6 border-t">
          <span className="font-medium text-lg mb-2">주의사항</span>
          <div>
            <ul className="list-decimal list-outside text-muted-400 text-sm whitespace-pre-line pl-4">
              <li>수강생명과 동일한 명의로 이체 바랍니다.</li>
              <li>수취인명을 반드시 확인 후 이체 바랍니다.</li>
              <li>이체 후 확인까지 시간이 걸릴 수 있는 점 양해부탁드립니다.</li>
              <li>
                {`기타 시스템오류로 인한 입금 확인 불가건의 경우
              고개센터로 문의해주세요.`}
              </li>
            </ul>
          </div>
        </div>
        <Button
          label="닫기"
          size="small"
          variant="outline"
          onClick={() => closeModal("registration")} // 모달 닫기
        />
      </div>
    </Modal>
  );
}
