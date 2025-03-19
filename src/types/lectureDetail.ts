// lectureDetail.ts
export interface Instructor {
  id: number;
  experience: string;
}

export interface Lecture {
  id: number;
  title: string;
  thumbnail?: string;
  progress_rate?: number;
  introduction?: string;
  learningObjectives?: string;
  instructor?: Instructor;
}

export interface LectureDetail {
  id: number;
  title: string;
  introduction?: string;
  learning_objective?: string;
  instructor?: Instructor;
  progress_rate?: number;
}

export interface Assignment {
  id: number;
  title: string;
  fileUrl?: string;
  progress_rate?: number;
}

export interface Chapter {
  id: number;
  title: string;
  chapterVideoTitles?: Video[];
  materialInfo?: Material[];
}

export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  isCompleted?: boolean;
}

export interface Material {
  id: number;
  title: string;
  url: string;
}

export interface ReviewResponse {
  id: number;
  message: string;
}