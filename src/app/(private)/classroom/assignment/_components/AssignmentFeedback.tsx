"use client";

import { useEffect, useState } from "react";
import { Assignment, AssignmentComment } from "@/types/assignment";
import AssignmentCommentForm from "./AssignmentCommentForm";
import { fetchAssignmentsComment, submitAssignmentComment } from "@/api/assignmentApi";
import { Paperclip } from "phosphor-react";

interface AssignmentFeedbackProps {
  selectedAssignment: Assignment | null;
}

const AssignmentFeedback = ({ selectedAssignment }: AssignmentFeedbackProps) => {
  const [comments, setComments] = useState<AssignmentComment[]>([]);

  useEffect(() => {
    if (!selectedAssignment) return;

    const fetchComments = async () => {
      const data = await fetchAssignmentsComment(selectedAssignment.id);
      setComments(data);
    };

    fetchComments();
  }, [selectedAssignment]);

  const submitComment = async (newComment: AssignmentComment, file: File | null) => {
    if (!selectedAssignment) return;
  
    try {
      const formData = new FormData();
      formData.append("content", newComment.content);
      formData.append("parent", newComment.parentId?.toString() || "");
      formData.append("assignmentId", selectedAssignment.id.toString());
  
      if (file) {
        formData.append("file", file); // 여기에서 파일 실제 업로드
      }
  
      await submitAssignmentComment(selectedAssignment.id, formData);
  
      // 업로드 후 댓글 새로고침
      const updatedComments = await fetchAssignmentsComment(selectedAssignment.id);
      setComments(updatedComments);
    } catch (err) {
      console.error("과제 제출 실패:", err);
    }
  };
  

  return selectedAssignment ? (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">과제피드</h2>
      </div>
      <div className="px-2 overflow-y-auto flex-1 space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b-[1px] p-2 bg-white">
              <div className="flex gap-1 items-center">
                <span className="font-medium">{comment.userNickname}</span>
                <span className="text-xs text-muted-300">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-muted-500 mt-2 text-sm">{comment.content}</p>
              {comment.fileUrl && (
                <a
                  href={comment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-black underline block mt-1"
                >
                  <Paperclip size={12} /> 첨부파일
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
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col items-center ">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="h-max w-max font-medium text-primary-900">과제피드</h2>
      </div>
      <p className="text-gray-500 p-4">과제를 선택해주세요.</p>
    </div>
  );

};

export default AssignmentFeedback;
