export interface Instructor {
  id: number;
  experience: string;
}

interface SLecture {
  id: number;
  title: string;
  thumbnail_url: string;
  progress_rate: number;
  introduction: string;//강의소개
  learning_objectives: string;//학습목표
  instructor: Instructor;
}

export interface Lecture {
  id: number;
  title: string;
  thumbnailUrl: string;
  progressRate: number;
  introduction: string; //강의소개
  learningObjectives: string; //학습목표
  instructor: Instructor;
}

export function transformLecture(lecture:SLecture):Lecture {
  return {
    id: lecture.id,
    title: lecture.title,
    thumbnailUrl: lecture.thumbnail_url,
    progressRate: lecture.progress_rate,
    introduction: lecture.introduction,
    learningObjectives: lecture.learning_objectives,
    instructor: {
      id: lecture.instructor.id,
      experience: lecture.instructor.experience,
    },
  };
}

interface SReview {
  id: number;
  student_nickname?: string;
  lecture_title?: string;
  star: number;
  content: string;
} 

export interface Review {
  id: number;
  userNickname?: string;
  lectureTitle?: string;
  star: number;
  content: string;
}

export function transformReview(review: SReview): Review {
  return {
    id: review.id,
    userNickname: review.student_nickname,
    lectureTitle: review.lecture_title,
    star: review.star,
    content: review.content,
  };
}

