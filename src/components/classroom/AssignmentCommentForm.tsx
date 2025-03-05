import { useState } from 'react';
import { AssignmentComment } from '@/types/assignment';

interface AssignmentCommentFormProps {
  assignmentId: number;
  onSubmit: (comment: AssignmentComment) => void;
}

const AssignmentCommentForm: React.FC<AssignmentCommentFormProps> = ({ assignmentId, onSubmit }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!content) {
      alert('Please enter a comment');
      return;
    }

    const newComment: AssignmentComment = {
      id: Date.now(), // 간단히 ID를 timestamp로 처리 (실제 시스템에서는 서버에서 할당)
      userId: 1, // 여기서는 예시로 userId를 1로 설정
      assignmentId,
      parentId: undefined, // 기본값은 undefined (피드백이 아니므로)
      fileUrl: file ? URL.createObjectURL(file) : '', // 파일이 있을 경우 URL 생성
      content,
      createdAt: Date.now(),
    };

    onSubmit(newComment);
    setContent('');
    setFile(null);
  };

  return (
    <div className="p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Leave a comment"
        rows={4}
        className="w-full border p-2"
      />
      <div className="mt-2">
        <input type="file" onChange={handleFileChange} className="block" />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Comment
      </button>
    </div>
  );
};

export default AssignmentCommentForm;
