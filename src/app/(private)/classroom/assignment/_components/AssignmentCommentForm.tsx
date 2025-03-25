import { useState } from "react";
import { AssignmentComment } from "@/types/assignment";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";

interface AssignmentCommentFormProps {
  assignmentId: number;
  onSubmit: (comment: AssignmentComment, file: File | null) => void;
  parentId: number | null; // 대댓글을 위한 parentId
}

const AssignmentCommentForm: React.FC<AssignmentCommentFormProps> = ({
  assignmentId,
  onSubmit,
  parentId,
}) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const { user } = useAuthStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      // 파일 용량 제한 20MB
      if (selectedFile.size > 20 * 1024 * 1024) {
        setFileError("파일 크기는 20MB를 초과할 수 없습니다.");
        setFile(null);
      } else {
        setFileError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("과제 내용을 작성해주세요.");
      return;
    }
  
    const newComment: AssignmentComment = {
      id: Date.now(), // 임시 ID
      assignmentId,
      parentId,
      fileUrl: "", // 서버 응답으로 채워질 예정
      content,
      createdAt: new Date(),
      userNickname: user.nickname,
    };
  
    onSubmit(newComment, file); // file도 함께 넘김
    setContent("");
    setFile(null);
  };
  

  return (
    <div className="space-y-1">
      {/* 댓글 작성 공간 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="PDF, MIDI 파일 첨부 가능 (개별 업로드 용량 20MB 제한)"
        rows={3}
        className="w-full border p-1 text-sm rounded-sm resize-none"
      />

      {/* 파일 첨부 및 전송 버튼 */}
      <div className="flex items-center gap-2 mt-2 justify-between">
        <input
          type="file"
          accept=".pdf, .midi, .midi, .mp3, .wav, .png, .jpg"
          onChange={handleFileChange}
          className="h-10 border p-1 py-2 rounded-sm text-xs flex-grow flex-1 w-0 text-muted-400"
        />
        {/* {file && (
          <div className="text-xs text-gray-700 truncate max-w-[150px]">{file.name}</div>
        )} */}
        {fileError && <div className="text-red-500 text-xs">{fileError}</div>}

        <Button label="제출" size="small" variant="primary"  onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AssignmentCommentForm;
