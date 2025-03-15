import { NextResponse } from "next/server";

export async function GET() {
  const mock = {
    id: 1,
    title: "3 화음의 성부 진행",
    introduction: "초보자를 위한 강의",
    learning_objectives: "초보자를 사람처럼",
    instructor: {
      id: 1,
      experience: "개고수",
    },
  };
  return NextResponse.json(mock);
}
