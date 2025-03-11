import { NextResponse } from "next/server";

export function GET(request: Request, { params }: { params: { chapter_video_id: string } }) {
  const {chapter_video_id} = params;
  const chapterVideoIdNum = Number(chapter_video_id);
  //id: 비디오 아이디
  const mock = [
    {
      id: 101,
      video_url: "https://youtu.be/GnvztDUhH3w?si=6T9UFuqlbzBU41ni",
    },
    {
      id: 102,
      video_url: "https://youtu.be/PG4EkPUqSY8?si=gPUAs5mvIRJWnMyX",
    },
  ];

  const videoStateData = mock.find((item) => item.id === chapterVideoIdNum);
  return NextResponse.json(videoStateData);
}
