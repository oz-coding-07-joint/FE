"use client";

import { useState, useEffect } from "react";
import { Assignment, AssignmentComment } from "@/types/assignment";
import AssignmentCommentForm from "@/app/(private)/_components/ui/AssignmentCommentForm";
import axios from "axios";

interface ChapterAssignment {
  chapterId: number;
  assignment: Assignment;
}

interface Chapter {
  id: number;
  title: string;
}

const AssignmentPage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [assignments, setAssignments] = useState<ChapterAssignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [comments, setComments] = useState<AssignmentComment[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [assignmentStatus, setAssignmentStatus] = useState<{ [key: number]: string }>({});

  const fetchChapters = async () => {
    try {
      const response = await axios.get("/api/chapters");
      console.log("Fetched chapters:", response.data);
      setChapters(response.data);
    } catch (error) {
      console.error("강의 목록을 불러오는 데 실패했습니다:", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`/api/assignments?chapterId=${selectedChapter}`);
      console.log("Fetched assignments:", response.data);
      setAssignments(response.data);
  
      const initialStatus: Record<number, string> = response.data.reduce(
        (acc: Record<number, string>, curr: ChapterAssignment) => {
          acc[curr.assignment.id] = "미제출";
          return acc;
        },
        {} as Record<number, string>
      );
  
      setAssignmentStatus(initialStatus);
    } catch (error) {
      console.error("과제 목록을 불러오는 데 실패했습니다:", error);
    }
  };
  

  const fetchComments = async (assignmentId: number) => {
    try {
      const response = await axios.get(`/api/assignments/${assignmentId}/comments`);
      console.log("Fetched comments:", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("댓글을 불러오는 데 실패했습니다:", error);
    }
  };

  const submitComment = async (newComment: AssignmentComment) => {
    try {
      await axios.post("/api/comments", newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("댓글 제출에 실패했습니다:", error);
    }
  };

  const handleCommentSubmit = (newComment: AssignmentComment) => {
    submitComment(newComment);
    setAssignmentStatus((prevStatus) => ({
      ...prevStatus,
      [newComment.assignmentId]: "과제 제출",
    }));
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [selectedChapter]);

  useEffect(() => {
    if (selectedAssignment) {
      fetchComments(selectedAssignment.id);
    }
  }, [selectedAssignment]);

  const handleChapterChange = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setSelectedAssignment(null);
  };

  const renderComments = (parentId: number | null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment.id} className="border p-2 rounded-md bg-white">
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
        <div className="w-1/4 border p-0 rounded-md shadow-md bg-white">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-black">강의 목록</h2> {/* 글자색을 검정색으로 수정 */}
          </div>
          <div className="mt-4 px-4">
            <select
              value={selectedChapter}
              onChange={(e) => handleChapterChange(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
            >
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))
              ) : (
                <option value={0}>강의 목록이 없습니다.</option>
              )}
            </select>
          </div>
          {assignments.length > 0 && assignments.filter((a) => a.chapterId === selectedChapter).map(({ assignment }) => (
            <ul key={assignment.id} className="mt-4">
              <li
                onClick={() => setSelectedAssignment(assignment)}
                className="p-2 cursor-pointer hover:bg-sky-100 border-b-2 border-gray-200"
              >
                {assignment.title}
                <span className="text-sm ml-2 text-gray-500">
                  {assignmentStatus[assignment.id] === "과제 제출" ? "과제 제출" : "과제 미제출"}
                </span>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex-1 border p-0 rounded-md shadow-md bg-white h-[75vh] flex flex-col">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-black">
              {selectedAssignment ? selectedAssignment.title : "과제 내용"} {/* 글자색을 검정색으로 수정 */}
            </h2>
          </div>
          <div className="flex-1 p-4 overflow-y-auto px-4">
            {selectedAssignment ? (
              <p className="text-gray-700">{selectedAssignment.content}</p>
            ) : (
              <div className="p-4">과제를 선택해주세요.</div>
            )}
          </div>
          <div className="h-10 flex items-center bg-white border-t px-4 border-gray-300">
            {selectedAssignment?.fileUrl ? (
              <a href={selectedAssignment.fileUrl} target="_blank" rel="noopener noreferrer">
                첨부 파일 보기
              </a>
            ) : (
              <p className="text-gray-700">첨부 파일 없음</p>
            )}
          </div>
        </div>
        <div className="w-1/4 border p-0 rounded-md shadow-md bg-white h-[75vh] flex flex-col">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300 rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-black">과제 피드백</h2> {/* 글자색을 검정색으로 수정 */}
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 px-4">
            {comments.length > 0 ? renderComments(null) : (
              <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
            )}
          </div>
          <div className="p-4 border-t bg-white">
            <AssignmentCommentForm
              onSubmit={handleCommentSubmit}
              assignmentId={selectedAssignment?.id || 0}
              parentId={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
