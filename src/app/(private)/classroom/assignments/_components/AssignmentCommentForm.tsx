import { useState } from "react";
import { AssignmentComment } from "@/types/assignment";

interface AssignmentCommentFormProps {
  assignmentId: number;
  onSubmit: (comment: AssignmentComment) => void;
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
    if (!content) {
      alert("댓글 내용을 작성해주세요.");
      return;
    }

    const newComment: AssignmentComment = {
      id: Date.now(),
      assignmentId: assignmentId,  // assignmentId를 전달
      parentId: parentId, // 대댓글일 경우 parentId를 포함
      fileUrl: file ? URL.createObjectURL(file) : "",
      content,
      createdAt: new Date(),
      userNickname: "학생A", // 예시로 "학생A"
    };

    onSubmit(newComment);
    setContent("");
    setFile(null);
  };

  return (
    <div className="p-2 space-y-2">
      {/* 댓글 작성 공간 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="PDF, MIDI 파일 첨부 가능 (개별 업로드 용량 20MB 제한)"
        rows={3}
        className="w-full border p-2 text-sm rounded-md resize-none"
      />

      {/* 파일 첨부 및 전송 버튼 */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="file"
          accept=".pdf, .midi, .midi, .mp3, .wav"
          onChange={handleFileChange}
          className="border p-1 rounded-md text-sm flex-grow"
        />
        {file && (
          <div className="text-xs text-gray-700 truncate max-w-[150px]">{file.name}</div>
        )}
        {fileError && <div className="text-red-500 text-xs">{fileError}</div>}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm ml-2"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default AssignmentCommentForm;
