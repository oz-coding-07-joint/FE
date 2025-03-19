/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useLectureListStore } from '@/store/useLectureListStore';
import clsx from 'clsx';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

const LecturePage = () => {
  const { lectures, lectureDetail, fetchLectures, fetchLectureDetail, submitReview } = useLectureListStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [reviewData, setReviewData] = useState({ star: 0, content: "" });
  const [selectedLectureTitle, setSelectedLectureTitle] = useState("");

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  console.log(lectures, 'lectures')

  const handleLectureDetail = async (lectureId: number) => {
    await fetchLectureDetail(lectureId);
    setSelectedLectureId(lectureId);
    setIsModalOpen(true);
  };

  const handleReviewClick = (lectureId: number) => {
    setSelectedLectureId(lectureId);
    setReviewData({ star: 0, content: "" });
    setIsReviewModalOpen(true);
    const lecture = lectures.find((l) => l.id === lectureId);
    setSelectedLectureTitle(lecture ? lecture.title : "IT스타트업 사원개발캠프 - GA와 데이터러닝시");
  };

  const handleReviewSubmit = async () => {
    if (selectedLectureId && reviewData.star > 0 && reviewData.content.trim()) {
      try {
        await submitReview(selectedLectureId, reviewData);
        alert("후기가 성공적으로 제출되었습니다!");
        setIsReviewModalOpen(false);
        setReviewData({ star: 0, content: "" });
        setSelectedLectureId(null);
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("후기 제출에 실패했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("별점과 후기 내용을 입력해 주세요.");
    }
  }; 

  return (
    <div className="bg-muted-100 h-screen px-5 pt-5">
      <h1 className="text-3xl font-bold pb-3">강의 목록</h1>
      {lectures.length === 0 ? (
        <Suspense fallback={<LoadingSkeleton />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
            {Array(3).fill(null).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px] h-[300px]">
                <LoadingSkeleton />
              </div>
            ))}
          </div>
        </Suspense>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className={clsx('bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px]', 'hover:shadow-lg transition-shadow')}
            >
              <img
                src={lecture.thumbnail || "/assets/images/no-img.png"}
                alt={lecture.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{lecture.title}</h3>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${lecture.progress_rate}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">{lecture.progress_rate}% 강좌 완료</p>
                <div className="flex mt-4 gap-2">
                  <Button
                    label="수업 정보 보기"
                    onClick={() => handleLectureDetail(lecture.id)}
                    variant="outline"
                    size="medium"
                    type="button"
                  />
                  <Button
                    label="수업 후기 작성"
                    onClick={() => handleReviewClick(lecture.id)}
                    variant="secondary"
                    size="medium"
                    type="button"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {lectureDetail && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">수업정보</h2>
            <div className="w-full border-b-2 border-gray-600 mt-1 mb-4"></div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">강의명</label>
              <p className="text-gray-600">{lectureDetail.title}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">강의소개</label>
              <p className="text-gray-600">{lectureDetail.introduction}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">학습목표</label>
              <p className="text-gray-600">{lectureDetail.learning_objective}</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">강사</label>
              <p className="text-gray-600">{lectureDetail.instructor?.experience || "정보 없음"}</p>
            </div>
            <div className="mt-6">
              <div className="flex justify-end gap-2">
                <Button
                  label="닫기"
                  onClick={() => setIsModalOpen(false)}
                  variant="primary"
                  size="medium"
                  type="button"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">수강후기</h2>
          <div className="w-full border-b-2 border-gray-600 mt-1 mb-4"></div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">강의명</label>
            <p className="text-gray-800 mb-2">{selectedLectureTitle}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">평점</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={clsx('text-2xl', star <= reviewData.star ? 'text-yellow-400' : 'text-gray-300')}
                  onClick={() => setReviewData({ ...reviewData, star })}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">후기 내용</label>
            <textarea
              value={reviewData.content}
              onChange={(e) => setReviewData({ ...reviewData, content: e.target.value })}
              className="w-full p-2 border rounded text-black placeholder-gray-400 h-[200px] resize-none"
              placeholder="이 강의에 대한 후기를 작성해 주세요."
            />
          </div>
          <div className="mt-6">
            <div className="flex justify-end">
              <Button
                label="제출하기"
                onClick={handleReviewSubmit}
                variant="primary"
                size="medium"
                type="submit"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LecturePage;