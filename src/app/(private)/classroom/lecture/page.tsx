"use client";

import { useEffect, useState } from "react";
import { useLectureListStore } from "@/store/useLectureListStore";
import { useModalStore } from "@/store/useModalStore";
import LectureCard from "../../_components/ui/LectureCard";
import { Lecture } from "@/types/class";
import LectureDetailModal from "./_components/LectureDetailModal";
import ReviewModal from "./_components/ReviewModal";
import Button from "@/components/Button";

const LecturePage = () => {
  const { lectures, fetchLectures, fetchLectureDetail } = useLectureListStore();
  const { openModal } = useModalStore();
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [selectedLectureTitle, setSelectedLectureTitle] = useState("");

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  useEffect(() => {
    if (lectures.length === 0) {
      const timer = setTimeout(() => {
        window.location.href = "/classinfo/harmonics";
      }, 1000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [lectures]);

  const handleLectureDetail = async (lectureId: number) => {
    await fetchLectureDetail(lectureId);
    setSelectedLectureId(lectureId);
    openModal("lectureDetail"); // 강의 상세 모달 열기
  };

  const handleReviewClick = (lectureId: number, lectureTitle: string) => {
    setSelectedLectureId(lectureId);
    setSelectedLectureTitle(lectureTitle);
    openModal("review"); // 리뷰 작성 모달 열기
  };

  if (lectures.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center text-gray-600 text-xl">
          수강중인 강의가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-5">수업자료</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] gap-4 justify-items-center">
        {lectures.map((lecture: Lecture) => (
          <div
            key={lecture.id}
            className="bg-white rounded-lg shadow-md w-full min-w-[260px] max-w-[300px] hover:shadow-lg transition-shadow"
          >
            <LectureCard lecture={lecture} type="lecture" />
            <div className="flex gap-2 px-4 pb-4 justify-around">
              <Button
                label="강의 상세보기"
                onClick={() => handleLectureDetail(lecture.id)}
                variant="outline"
                size="small"
                width="w-1/2"
              />
              <Button
                label="강의 리뷰작성"
                onClick={() => handleReviewClick(lecture.id, lecture.title)}
                variant="secondary"
                size="small"
                width="w-1/2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 모달 컴포넌트들 */}
      <LectureDetailModal lectureId={selectedLectureId} />
      <ReviewModal lectureId={selectedLectureId} lectureTitle={selectedLectureTitle} />
    </div>
  );
};

export default LecturePage;