// types/assignment.ts

export interface DownloadInfo {
    file_name: string;
    object_key: string;
    download_url: string;
  }
  
  export interface SAssignmentList {
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
    chapter_video: number;
    title: string;
    content: string;
    file_url: string;
    created_at: Date;
    updated_at: Date;
    download_info?: DownloadInfo;
  }
  
  export interface Assignment {
    id: number;
    videoId: number;
    title: string;
    content: string;
    fileUrl: string;
    createdAt: Date;
    updatedAt: Date;
    downloadInfo?: DownloadInfo;
  }
  
  export function transformAssignment(assignment: SAssignment): Assignment {
    return {
      id: assignment.id,
      videoId: assignment.chapter_video,
      title: assignment.title,
      content: assignment.content,
      fileUrl: assignment.file_url,
      createdAt: assignment.created_at,
      updatedAt: assignment.updated_at,
      downloadInfo: assignment.download_info,
    };
  }
  
  export interface SAssignmentComment {
    id: number;
    parent?: number;
    assignment: number;
    file_url: string;
    content: string;
    created_at: Date;
    nickname: string;
    replies?: SAssignmentComment[];
    download_info?: DownloadInfo;
  }
  
  export interface AssignmentComment {
    id: number;
    parentId?: number | null;
    assignmentId: number;
    fileUrl: string;
    content: string;
    createdAt: Date;
    userNickname: string;
    replies?: AssignmentComment[];
    downloadInfo?: DownloadInfo;
  }
  
  export function transformAssignmentComment(comment: SAssignmentComment): AssignmentComment {
    return {
      id: comment.id,
      parentId: comment.parent ?? null,
      assignmentId: comment.assignment,
      fileUrl: comment.file_url,
      content: comment.content,
      createdAt: comment.created_at,
      userNickname: comment.nickname,
      replies: comment.replies?.map(transformAssignmentComment),
      downloadInfo: comment.download_info,
    };
  }