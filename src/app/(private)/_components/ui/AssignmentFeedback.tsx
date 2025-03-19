import { useEffect, useState } from "react";
import api from "@/api/api";
import { Assignment, AssignmentComment, transformAssignmentComment } from "@/types/assignment";
import AssignmentCommentForm from "./AssignmentCommentForm";

interface AssignmentFeedbackProps {
  selectedAssignment: Assignment | null;
}

const AssignmentFeedback = ({ selectedAssignment }: AssignmentFeedbackProps) => {
  const [comments, setComments] = useState<AssignmentComment[]>([]);

  useEffect(() => {
    if (selectedAssignment) {
      const fetchComments = async () => {
        try {
          const response = await api.get(`/assignments/assignment-comment/${selectedAssignment.id}/`);
          setComments(response.data.map(transformAssignmentComment));
        } catch (error) {
          console.error("❌ 댓글을 불러오는 데 실패했습니다:", error);
        }
      };

      fetchComments();
    }
  }, [selectedAssignment]);

  const submitComment = async (newComment: AssignmentComment) => {
    if (!selectedAssignment) return;

    try {
      await api.post(`/assignments/assignment-comment/${selectedAssignment.id}/`, newComment);
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("❌ 댓글 제출에 실패했습니다:", error);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-1/4 h-[75vh] flex flex-col">
      <div className="bg-[#F5F9FF] p-4 h-16 border border-gray-300">
        <h2 className="text-xl font-semibold text-black">과제 피드백</h2>
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border p-2 rounded-md bg-white">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{comment.userNickname}</span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-800 mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">아직 댓글이 없습니다.</p>
        )}
      </div>
      <div className="p-4 border-t bg-white">
        <AssignmentCommentForm onSubmit={submitComment} assignmentId={selectedAssignment?.id || 0} parentId={null} />
      </div>
    </div>
  );
};

export default AssignmentFeedback;
