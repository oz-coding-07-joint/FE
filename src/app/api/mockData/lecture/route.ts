import { NextResponse } from "next/server";

export async function GET() {
  const mock = {
    student_id: 5001,
    lectures: [
      {
        id: 1,
        title: "음악 이론",
        thumbnail_url: "썸네일 이미지URL",
        progress_rate: "진행도",
      },
      {
        id: 2,
        title: "클래식 화성학 심화",
        thumbnail_url: "썸네일 이미지URL",
        progress_rate: "진행도",
      },
    ],
  };

  return NextResponse.json(mock);
}
