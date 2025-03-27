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
import { ArrowElbowDownRight, Paperclip } from "phosphor-react";
import { getFileNameFromUrl } from "@/utils/fileurl";
import { downloadFileBlob } from "@/utils/downloadBlob";

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
        formData.append("file_url", file);
      }

      await submitAssignmentComment(selectedAssignment.id, formData);
      await loadComments(selectedAssignment.id);
    } catch (err) {
      console.error("❌ 과제 제출 실패:", err);
    }
  };

  const renderComment = (comment: AssignmentComment, depth = 0): JSX.Element[] => {
    const isReply = depth > 0;
    const fileUrl = comment.fileUrl;
    const fileName = getFileNameFromUrl(fileUrl || "");
    const displayName = fileName.split("_")[0] + "." + fileName.split(".").pop();

    const parentComment = (
      <div
        key={`comment-${comment.id}`}
        className={`border-b p-2 bg-white ${isReply ? "flex gap-2" : ""}`}
      >
        {isReply && <ArrowElbowDownRight size={14} className="mt-1" />}
        <div className="flex-1">
          <div className="flex gap-1 items-center text-sm">
            <span>{comment.userNickname}</span>
            <span className="text-muted-300 text-xs">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-muted-500 mt-1">{comment.content}</p>
          {fileUrl && (
            <button
              onClick={() => downloadFileBlob(fileUrl, fileName)}
              className="flex items-center text-xs text-blue-600 underline mt-1"
            >
              <Paperclip size={12} className="mr-1" />
              {displayName}
            </button>
          )}
        </div>
      </div>
    );

    const replyComments = comment.replies?.flatMap((reply) => renderComment(reply, depth + 1)) || [];

    return [parentComment, ...replyComments];
  };

  return selectedAssignment ? (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] h-16 flex items-center w-full px-4">
        <h2 className="text-xl font-medium text-primary-900">과제피드</h2>
      </div>
      <div className="px-2 overflow-y-auto flex-1 space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <p className="text-gray-500 text-center">과제피드 내역이 없습니다.</p>
        )}
      </div>
      <div className="p-4 bg-white">
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
