"use client";

import { useRef, useState } from "react";
import { AssignmentComment } from "@/types/assignment";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";

interface AssignmentCommentFormProps {
  assignmentId: number;
  onSubmit: (comment: AssignmentComment, file: File | null) => void;
  parentId: number | null;
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

  const fileInputRef = useRef<HTMLInputElement | null>(null); // ✅ ref 생성

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
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
      fileUrl: "",
      content,
      createdAt: new Date(),
      userNickname: user.nickname,
    };

    onSubmit(newComment, file);
    setContent("");
    setFile(null);

    // ✅ 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-1">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="PDF, MIDI 파일 첨부 가능 (20MB 제한)"
        rows={3}
        className="w-full border p-1 text-sm rounded-sm resize-none"
      />

      <div className="flex items-center gap-2 mt-2 justify-between">
        <input
          ref={fileInputRef} // ✅ ref 연결
          type="file"
          accept=".pdf,.midi,.mp3,.wav,.png,.jpg"
          onChange={handleFileChange}
          className="h-10 border p-1 py-2 rounded-sm text-xs flex-grow w-0 text-muted-400"
        />
        {fileError && <div className="text-red-500 text-xs">{fileError}</div>}
        <Button label="제출" size="small" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AssignmentCommentForm;
