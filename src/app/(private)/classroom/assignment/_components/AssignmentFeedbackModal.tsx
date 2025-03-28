"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useAssignmentStore } from "@/store/useAssignmentStore";
import { useModalStore } from "@/store/useModalStore";

const AssignmentFeedbackModal = () => {
  const { closeModal } = useModalStore();
  const { selectedAssignment, selectedComment, addComment, fetchComments } = useAssignmentStore();

  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected && selected.size > 20 * 1024 * 1024) {
      setFileError("파일 크기는 20MB를 초과할 수 없습니다.");
      setFile(null);
    } else {
      setFileError("");
      setFile(selected);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!content.trim()) {
      alert("피드백 내용을 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("parent", selectedComment.id.toString());
    if (file) {
      formData.append("file_url", file);
    }

    try {
      await addComment(selectedAssignment.id, formData);
      alert("피드백이 제출되었습니다.");
      await fetchComments(selectedAssignment.id); // 피드백 갱신
      setContent("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      closeModal("assignmentFeedback");
    } catch (err) {
      console.error("피드백 제출 실패:", err);
      alert("피드백 제출에 실패했습니다.");
    }
  };

  return (
    <Modal modalKey="assignmentFeedback">
      <h2 className="text-xl font-bold text-gray-800 mb-6">과제 피드백</h2>
      {selectedComment ? (
        <>
        <div className="text-sm text-gray-600 border rounded-md p-3 mb-4 bg-gray-50">
            <div className="mb-1 text-gray-800">
            <strong>{selectedComment.userNickname}</strong>님의 과제
            </div>
            <div className="text-sm">{selectedComment.content}</div>
        </div>

        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="피드백 내용을 입력하세요"
            rows={4}
            className="w-full border p-2 rounded-sm resize-none text-sm mb-2"
        />

        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-muted-400 mb-2"
        />
        {fileError && <div className="text-red-500 text-xs mb-2">{fileError}</div>}

        <div className="flex justify-center gap-2">
            <Button label="확인" onClick={handleSubmitFeedback} variant="primary" size="small" />
            <Button label="닫기" onClick={() => closeModal("assignmentFeedback")} variant="outline" size="small" />
        </div>
        </>
        ) : (
            <p className="text-center text-sm text-muted-500">피드백 대상을 찾을 수 없습니다.</p>
          )}
    </Modal>
  );
};

export default AssignmentFeedbackModal;
