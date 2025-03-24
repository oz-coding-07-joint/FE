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
  return (
    <div className="bg-muted-100 h-screen px-5 pt-5">
      <h1 className="text-3xl font-bold pb-3">수업자료</h1>
      {lectures.length === 0 ? (
        <div className="text-center text-gray-600">수강중인 강의가 없습니다</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
          {lectures.map((lecture: Lecture) => (
            <div
              key={lecture.id}
              className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px] hover:shadow-lg transition-shadow"
            >
              <LectureCard lecture={lecture} type="lecture" />
              <div className="flex gap-2 p-4">

                <Button
                  label="강의 상세보기"
                  onClick={() => handleLectureDetail(lecture.id)}
                  variant="primary"
                />
                <Button
                  label="강의 리뷰작성" 
                  onClick={() => handleReviewClick(lecture.id, lecture.title)}
                  variant="outline"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 모달 컴포넌트들 */}
      <LectureDetailModal lectureId={selectedLectureId} />
      <ReviewModal lectureId={selectedLectureId} lectureTitle={selectedLectureTitle} />
    </div>
  );
};

export default LecturePage;
