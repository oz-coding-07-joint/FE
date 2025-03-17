/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { fetchLectures, fetchLectureDetail, submitReview } from "@/api/lectureApi";
import { Lecture } from "@/types/class";
import Link from "next/link";
import { LectureDetail } from "@/types/lectureDetail";
import { ReviewRequest } from "@/types/review";
import Modal from "@/components/Modal";

export default function LecturePage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lectureDetail, setLectureDetail] = useState<LectureDetail | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewRequest>({ star: 0, content: "" });
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [selectedLectureTitle, setSelectedLectureTitle] = useState<string>("");

  useEffect(() => {
    async function loadLectures() {
      try {
        const data = await fetchLectures();
        setLectures(data);
      } catch (error) {
        console.error("강의 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLectures();
  }, []);

  const handleLectureDetail = async (lectureId: number) => {
    try {
      const data = await fetchLectureDetail(lectureId);
      setLectureDetail(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("강의 상세 정보를 불러오는 중 오류 발생:", error);
    }
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
        alert("후기 제출에 실패했습니다. 다시 시도해 주세요.");
        console.error("후기 제출 오류:", error);
      }
    } else {
      alert("별점과 후기 내용을 입력해 주세요.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">강의 목록</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4 justify-items-center">
        {lectures.map((lecture) => (
          <Link key={lecture.id} href={`/classroom/lecture/${lecture.id}`}>
            <div className="bg-white rounded-lg shadow-md w-full min-w-[250px] max-w-[300px]">
              <img
                src={lecture.thumbnailUrl || "@/assets/images/no-img.png"}
                alt={lecture.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {lecture.title}
                </h3>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${lecture.progressRate}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {lecture.progressRate}% 강좌 완료
                </p>
                <div className="flex mt-4">
                  <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded flex-1">
                    수업 정보 보기
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 flex-1 ml-3">
                    수업 후기 작성
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

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
              <p className="text-gray-600">{lectureDetail.instructor.experience}</p>
            </div>
            <div className="mt-6">
              <div className="flex justify-end gap-2">
                <button
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  닫기
                </button>
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
                  onClick={() => setReviewData({ ...reviewData, star })}
                  className={`text-2xl ${star <= reviewData.star ? "text-yellow-400" : "text-gray-300"}`}
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
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleReviewSubmit}
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}