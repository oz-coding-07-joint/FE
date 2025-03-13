"use client";

import { useState, useEffect } from "react";
import { Assignment, AssignmentComment } from "@/types/assignment";
import AssignmentCommentForm from "@/app/(private)/_components/ui/AssignmentCommentForm";

interface ChapterAssignment {
  chapterId: number;
  assignment: Assignment;
}

const AssignmentPage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [assignments, setAssignments] = useState<ChapterAssignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [comments, setComments] = useState<AssignmentComment[]>([]);

  // 과제 제출 상태 관리
  const [assignmentStatus, setAssignmentStatus] = useState<{ [key: number]: string }>({});

  // 더미 데이터 설정
  useEffect(() => {
    const fetchedAssignments: ChapterAssignment[] = [
      {
        chapterId: 1,
        assignment: {
          id: 1,
          videoId: 101,
          title: "음악 이론 기초 과제 1",
          content: "주어진 음계에 맞춰 간단한 멜로디를 작곡해보세요.",
          fileUrl: "",
        },
      },
      {
        chapterId: 1,
        assignment: {
          id: 2,
          videoId: 102,
          title: "음악 이론 기초 과제 2",
          content: "주어진 코드 진행에 맞춰 화음 분석을 하고, 새로운 화음 진행을 만들어보세요.",
          fileUrl: "",
        },
      },
      {
        chapterId: 2,
        assignment: {
          id: 3,
          videoId: 201,
          title: "작곡과 편곡 과제 1",
          content: "주어진 멜로디를 다양한 편곡 스타일로 변형하여 작성하세요.",
          fileUrl: "",
        },
      },
    ];
    setAssignments(fetchedAssignments);

    // 초기 상태: 모든 과제는 미제출로 설정
    const initialStatus = fetchedAssignments.reduce((acc, curr) => {
      acc[curr.assignment.id] = "미제출";  // 과제 초기 상태는 미제출
      return acc;
    }, {} as { [key: number]: string });

    setAssignmentStatus(initialStatus);
  }, []);

  // 댓글 제출 시 과제 제출 상태 업데이트
  const handleCommentSubmit = (newComment: AssignmentComment) => {
    setComments((prevComments) => [...prevComments, newComment]);

    // 댓글이 제출되면 해당 과제의 상태를 '과제 제출'로 업데이트
    setAssignmentStatus((prevStatus) => ({
      ...prevStatus,
      [newComment.assignmentId]: "과제 제출", // 해당 과제 ID의 상태를 과제 제출로 변경
    }));
  };

  // 과제 목록 클릭 시 선택된 과제 변경
  const handleChapterChange = (chapterId: number) => {
    setSelectedChapter(chapterId);
    const filteredAssignments = assignments.filter((a) => a.chapterId === chapterId);
    setSelectedAssignment(filteredAssignments.length > 0 ? filteredAssignments[0].assignment : null);
  };
  
  // 댓글 렌더링
  const renderComments = (parentId: number | null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment.id} className="border p-2 rounded-md bg-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{comment.userNickname}</span>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
          <p className="text-gray-800 mt-2">{comment.content}</p>
          {comment.fileUrl && (
            <div className="mt-2">
              <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer">
                첨부 파일 보기
              </a>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">과제 관리</h1>
      <div className="flex gap-6">
        <div className="w-1/4 border p-0 rounded-md shadow-md">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">강의 목록</h2> {/* 제목 박스에 자연스러운 테두리 추가 */}
          </div>
          <div className="mt-4">
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
            >
              <option value={1}>음악 이론 기초</option>
              <option value={2}>작곡과 편곡</option>
            </select>
          </div>
          {assignments.filter((a) => a.chapterId === selectedChapter).map(({ assignment }) => (
            <ul key={assignment.id} className="mt-4">
              <li
                onClick={() => setSelectedAssignment(assignment)}
                className="p-2 cursor-pointer hover:bg-sky-100 border-b-2 border-gray-200"
              >
                {assignment.title}
                {/* 과제 상태 표시 */}
                <span className="text-sm ml-2 text-gray-500">
                  {assignmentStatus[assignment.id] === "과제 제출" ? "과제 제출" : "과제 미제출"}
                </span>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex-1 border p-0 rounded-md shadow-md h-[75vh]">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">
              {selectedAssignment ? selectedAssignment.title : "과제 내용"}
            </h2> {/* 제목 박스에 자연스러운 테두리 추가 */}
          </div>
          <div className="p-4 mt-4">
            {selectedAssignment ? (
              <p className="text-gray-700">{selectedAssignment.content}</p>
            ) : (
              <div className="p-4">과제를 선택해주세요.</div>
            )}
          </div>
        </div>
        <div className="w-1/4 border p-0 rounded-md shadow-md h-[75vh] flex flex-col">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">과제 피드백</h2> {/* 제목 박스에 자연스러운 테두리 추가 */}
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {comments.length > 0 ? renderComments(null) : (
              <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <AssignmentCommentForm
              onSubmit={handleCommentSubmit}
              assignmentId={selectedAssignment?.id || 0}
              parentId={null} // 대댓글 없앰
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
