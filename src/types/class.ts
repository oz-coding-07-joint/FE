export interface Class {
  id: number;
  title: string;
  price?: number;
  totalDuration?: number;
  maxStudent?: number;
}

export interface Instructor {
  id: number;
  userId: number;
  experience: string;
}

export interface Lecture {
  id: number;
  title: string;
  thumbnailUrl: string;
  classId: number;
  instructorId: number;
  introduction: string; //강의소개
  learningObjectives: string; //학습목표
}

export interface Chapter {
  id: number;
  title: string;
  lectureId: number;
  materialUrl: string;
}

export interface Review {
  id: number;
  userId: number;
  userNickname: string;
  lectureId: number;
  star: number;
  content: string;
}

export interface SelectBoxProps {
  options: {
    value: string;
    label: string;
  }[];
}

export interface DetailContainerProps {
    children: React.ReactNode;
    leftTab?: React.ReactNode;
    rightTab?: React.ReactNode;
    width?: string;
    height?: string;
}
