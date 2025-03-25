
interface SAssignmentList {
    lecture_chapter_id: number;
    assignment: SAssignment;
}

export interface AssignmentList {
    chapterId: number;
    assignment: Assignment;
}

export function transformAssignmentList(assignmentList: SAssignmentList): AssignmentList {
    return {
        chapterId: assignmentList.lecture_chapter_id,
        assignment: transformAssignment(assignmentList.assignment),
    };
}

export interface SAssignment {
    id: number;
    chapter_video_id: number;
    title: string;
    content: string;
    file_url: string;
    created_at: Date;
    updated_at: Date;
} 

export interface Assignment {
    id: number;
    videoId: number;
    title: string;
    content: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export function transformAssignment(assignment: SAssignment): Assignment {
    return {
        id: assignment.id,
        videoId: assignment.chapter_video_id,
        title: assignment.title,
        content: assignment.content,
        fileUrl: assignment.file_url,
        createdAt: assignment.created_at,
        updatedAt: assignment.updated_at,
    };
}

export interface SAssignmentComment {
    id: number;
    parent_id?: number; // 피드백이면 parentId 있음
    assignment_id: number; // 과제 ID 추가
    file_url: string;
    content: string;
    created_at: Date;
    nickname: string;
}

export interface AssignmentComment {
    id: number;
    parentId?: number | null; // 피드백이면 parentId 있음
    assignmentId: number; // 과제 ID 추가
    fileUrl: string;
    content: string;
    createdAt: Date;
    userNickname: string;
}

export function transformAssignmentComment(comment: SAssignmentComment): AssignmentComment {
    return {
        id: comment.id,
        parentId: comment.parent_id !== undefined ? comment.parent_id : null, // undefined이면 null로 처리
        assignmentId: comment.assignment_id, // assignmentId 추가
        fileUrl: comment.file_url,
        content: comment.content,
        createdAt: comment.created_at,
        userNickname: comment.nickname,
    };
}
