export interface Instructor {
  id: number;
  experience: string;
}

export interface LectureDetail {
  id: number;
  title: string;
  introduction: string;
  learning_objective: string;
  instructor: Instructor;
}