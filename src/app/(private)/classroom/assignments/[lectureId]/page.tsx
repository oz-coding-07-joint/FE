'use client';

import { useState, useEffect } from 'react';
import AssignmentDetails from '@/app/(private)/_components/ui/AssignmentDetails';
import AssignmentCommentList from '@/app/(private)/_components/ui/AssignmentCommentList';
import AssignmentCommentForm from '@/app/(private)/_components/ui/AssignmentCommentForm';
import { Assignment, AssignmentComment } from '@/types/assignment';

const AssignmentPage = () => {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [comments, setComments] = useState<AssignmentComment[]>([]);

  useEffect(() => {
    // 예시로 과제 데이터를 가져옵니다 (실제 API 호출 필요)
    const fetchedAssignment: Assignment = {
      id: 1,
      videoId: 101,
      title: 'Introduction to Programming',
      content: 'This is the assignment description.',
      fileUrl: 'https://example.com/assignment.pdf',
    };

    setAssignment(fetchedAssignment);

    // 예시로 댓글 데이터를 가져옵니다 (실제 API 호출 필요)
    const fetchedComments: AssignmentComment[] = [
      {
        id: 1,
        userNickname: '홍길동',
        parentId: undefined,
        fileUrl: '',
        content: 'Great assignment!',
        createdAt: new Date(),
      },
    ];

    setComments(fetchedComments);
  }, []);

  const handleCommentSubmit = (newComment: AssignmentComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="p-4">
      {assignment ? (
        <>
          <AssignmentDetails assignment={assignment} />
          <AssignmentCommentForm
            assignmentId={assignment.id}
            onSubmit={handleCommentSubmit}
          />
          <AssignmentCommentList comments={comments} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AssignmentPage;
