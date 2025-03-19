"use client";

import { useState, useEffect } from "react";
import { Assignment, AssignmentComment } from "@/types/assignment";
import AssignmentCommentForm from "@/app/(private)/_components/ui/AssignmentCommentForm";
import api from "@/api/api";
import { LectureDetail } from "@/types/lectureDetail";
import { useAuthStore } from "@/store/useAuthStore";

interface Chapter {
  id: number;
  title: string;
}

interface AssignmentData {
  id: number;
  title: string;
  content: string;
  file_url?: string;
}

const AssignmentPage = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentData | null>(null);
  const [comments, setComments] = useState<AssignmentComment[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lecture, setlecture] = useState<LectureDetail>({
    // 초기값
        id : 0,
        title: '',
        introduction: '',
        learning_objective: '',
        instructor: {
            id: 0,
            experience: ''    
        }
    })
  const {user} = useAuthStore()

  // 📌 과목에 대한 상세 내용
  const fetchlecture = async () => {
    try {
      const response = await api.get(`/courses/lecture/1/`);
      console.log("📌 Fetched chlecture:", response.data);
      setlecture(response.data);
    } catch (error) {
      console.error("❌ 강의 챕터 목록을 불러오는 데 실패했습니다:", error);
    }
  }

  // 📌 강의 챕터 목록 가져오기
  const fetchChapters = async () => {
    try {
      const response = await api.get(`/courses/lecture_chapter/1/`);
      console.log("📌 Fetched chapters:", response.data);
      setChapters(response.data);
      if (response.data.length > 0) {
        setSelectedChapter(response.data[0].id);
      }
    } catch (error) {
      console.error("❌ 강의 챕터 목록을 불러오는 데 실패했습니다:", error);
    }
  };

  // 📌 선택한 챕터의 과제 목록 가져오기
  const fetchAssignments = async (chapterId: number) => {
    if (!chapterId) return;
    try {
      const response = await api.get(`/assignments/${chapterId}/`);
      console.log("📌 Fetched assignments:", response.data);
      setAssignments(response.data);
    } catch (error) {
      console.error("❌ 과제 목록을 불러오는 데 실패했습니다:", error);
    }
  };

  // 📌 선택한 과제의 피드백 가져오기
  const fetchComments = async (assignmentId: number) => {
    try {
      const response = await api.get(`/assignments/assignment-comment/${assignmentId}/`);
      console.log("📌 Fetched comments:", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("❌ 댓글을 불러오는 데 실패했습니다:", error);
    }
  };

  // 📌 과제 피드백 제출하기
  const submitComment = async (newComment: AssignmentComment) => {
    try {
      await api.post(`/assignments/assignment-comment/${newComment.assignmentId}/`, newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("❌ 댓글 제출에 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchChapters();
    fetchlecture();
  }, [user]);

  useEffect(() => {
    if (selectedChapter !== null) {
      fetchAssignments(selectedChapter);
    }
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
              <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                첨부 파일 보기
              </a>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">{lecture.title}</h1>
      <div className="flex gap-6">
        
        {/* 📌 왼쪽 박스 - "과제 목록" 유지 */}
        <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh]">
          <div className="bg-[#F5F9FF] p-4 h-16 flex items-center justify-start border border-gray-300">
            <h2 className="text-xl font-semibold text-black">과제 목록</h2>
          </div>
          <div className="mt-4 px-4">
            <select
              value={selectedChapter || ""}
              onChange={(e) => handleChapterChange(Number(e.target.value))}
              className="w-full border p-2 rounded-md"
            >
              <option value="">챕터를 선택하세요</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </option>
              ))}
            </select>
          </div>

          {/* 과제 목록 */}
          <div className="mt-4 px-4">
            {assignments.length > 0 ? (
              <ul>
                {assignments.map((assignment) => (
                  <li
                    key={assignment.id}
                    onClick={() => setSelectedAssignment(assignment)}
                    className="p-2 cursor-pointer hover:bg-sky-100 border-b-2 border-gray-200"
                  >
                    {assignment.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-4">과제가 없습니다.</p>
            )}
          </div>
        </div>

        {/* 📌 중간 박스 - 과제 내용 유지 */}
        <div className="bg-white rounded-md shadow-md overflow-hidden flex-1 h-[75vh] flex flex-col">
          <div className="bg-[#F5F9FF] p-4 h-16 border border-gray-300">
            <h2 className="text-xl font-semibold text-black">{selectedAssignment ? selectedAssignment.title : "과제 내용"}</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1">
            {selectedAssignment ? <p className="text-gray-700">{selectedAssignment.content}</p> : <p>과제를 선택해주세요.</p>}
          </div>
          <div className="p-4 border-t bg-white">
            {selectedAssignment?.file_url ? (
              <a href={selectedAssignment.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                첨부 파일 보기
              </a>
            ) : (
              <p className="text-gray-700">첨부 파일 없음</p>
            )}
          </div>
        </div>

        {/* 📌 오른쪽 박스 - 과제 피드백 유지 */}
        <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col">
          <div className="bg-[#F5F9FF] p-4 h-16 border border-gray-300">
            <h2 className="text-xl font-semibold text-black">과제 피드백</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 space-y-2">
            {comments.length > 0 ? renderComments(null) : <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>}
          </div>
          <div className="p-4 border-t bg-white">
            <AssignmentCommentForm onSubmit={submitComment} assignmentId={selectedAssignment?.id || 0} parentId={null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
