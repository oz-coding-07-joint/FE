export interface Assignment {
    id: number;
    videoId: number;
    title: string;
    content: string;
    fileUrl: string;
}

export interface AssignmentComment {
    id: number;
    userId: number;
    assignmentId: number;
    parentId?: number; // 피드백이면 parentId 있음
    fileUrl: string;
    content: string;
    createdAt: number;
}