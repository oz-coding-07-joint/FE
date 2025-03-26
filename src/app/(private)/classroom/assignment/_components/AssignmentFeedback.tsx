"use client";

import { useEffect, useState } from "react";
import {
  Assignment,
  AssignmentComment,
} from "@/types/assignment";
import AssignmentCommentForm from "./AssignmentCommentForm";
import {
  fetchAssignmentsComment,
  submitAssignmentComment,
} from "@/api/assignmentApi";
import { Paperclip } from "phosphor-react";

interface AssignmentFeedbackProps {
  selectedAssignment: Assignment | null;
}

const AssignmentFeedback = ({ selectedAssignment }: AssignmentFeedbackProps) => {
  const [comments, setComments] = useState<AssignmentComment[]>([]);

  const loadComments = async (assignmentId: number) => {
    const updated = await fetchAssignmentsComment(assignmentId);
    setComments(updated);
  };

  useEffect(() => {
    if (selectedAssignment) {
      loadComments(selectedAssignment.id);
    }
  }, [selectedAssignment]);

  const submitComment = async (newComment: AssignmentComment, file: File | null) => {
    if (!selectedAssignment) return;

    try {
      const formData = new FormData();
      formData.append("content", newComment.content);
      formData.append("parent", newComment.parentId?.toString() || "");
      formData.append("assignmentId", selectedAssignment.id.toString());

      if (file) {
        console.log("📎 첨부파일:", file.name);
        formData.append("file_url", file);
      }
      
      // ✅ forEach 버전으로 대체
      formData.forEach((value, key) => {
        console.log(`🧾 ${key}:`, value);
      });

      await submitAssignmentComment(selectedAssignment.id, formData);

      // ✅ 댓글 새로고침
      await loadComments(selectedAssignment.id);
    } catch (err) {
      console.error("❌ 과제 제출 실패:", err);
    }
  };

  return selectedAssignment ? (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="text-xl font-medium text-primary-900">과제피드</h2>
      </div>
      <div className="px-2 overflow-y-auto flex-1 space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b p-2 bg-white">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{comment.userNickname}</span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-800 mt-2">{comment.content}</p>
              {comment.fileUrl && (
                <a
                  href={comment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 underline mt-1 gap-1"
                >
                  <Paperclip size={14} />
                  첨부파일
                </a>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">과제피드 내역이 없습니다.</p>
        )}
      </div>
      <div className="p-4 border-t bg-white">
        <AssignmentCommentForm
          onSubmit={submitComment}
          assignmentId={selectedAssignment.id}
          parentId={null}
        />
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col items-center">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="text-xl font-medium text-primary-900">과제피드</h2>
      </div>
      <p className="text-gray-500 p-4">과제를 선택해주세요.</p>
    </div>
  );
};

export default AssignmentFeedback;
