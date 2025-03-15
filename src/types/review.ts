// src/types/review.ts
export interface ReviewRequest {
  star: number; // 1~5 사이의 숫자
  content: string;
}

export interface ReviewResponse {
  additionalProp1?: string; // 백엔드 응답에 따라 동적으로 정의 가능
  additionalProp2?: string;
  additionalProp3?: string;
}