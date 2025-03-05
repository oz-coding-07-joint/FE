import { AssignmentComment } from '@/types/assignment';

interface AssignmentCommentListProps {
  comments: AssignmentComment[];
}

const AssignmentCommentList: React.FC<AssignmentCommentListProps> = ({ comments }) => {
  const renderComment = (comment: AssignmentComment) => (
    <div key={comment.id} className="mb-4 p-4 border rounded-md">
      <div className="flex justify-between">
        <span className="font-bold">User {comment.userId}</span>
        <span className="text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      <p className="mt-2">{comment.content}</p>
      {comment.fileUrl && (
        <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
          Download Comment File
        </a>
      )}
      {comment.parentId && <p className="mt-2 text-gray-600">Reply to Comment {comment.parentId}</p>}
    </div>
  );

  return (
    <div className="mt-4">
      {comments.map(renderComment)}
    </div>
  );
};

export default AssignmentCommentList;
