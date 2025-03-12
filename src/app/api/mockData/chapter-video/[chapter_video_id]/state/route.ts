import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: {params: {chapter_video_id: string}}) {
  const {chapter_video_id} = params;
  const chapterVideoIdNum = Number(chapter_video_id);
  
  const mock = [
    {
      id: 101,
      student_id: 5001,
      progress: "70",
      is_completed: false,
    },
    {
      id: 102,
      student_id: 5001,
      progress: "100",
      is_completed: true,
    },
    {
      id: 201,
      student_id: 5001,
      progress: "70",
      is_completed: false,
    },
    {
      id: 202,
      student_id: 5001,
      progress: "0",
      is_completed: false,
    },
  ];

  const videoStateData = mock.find((item) => item.id === chapterVideoIdNum);
  return NextResponse.json(videoStateData);
}
