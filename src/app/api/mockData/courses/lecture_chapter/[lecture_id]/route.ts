import { NextResponse } from "next/server";

export function GET(request: Request, { params }:{ params: { lecture_id: string } }) {
  const { lecture_id } = params;
  const lectureIdNum = Number(lecture_id);
  console.log("lectureIdNum:", lectureIdNum); 
  const mock = [
    {
      id: 1,
      lecture_id: 1,
      title: "1장 음정",
      material_url: "https://lecture.pdf",
      chapter_video_titles: [
        {
          id: 101,
          title: "북치기 박치기",
        },
        {
          id: 102,
          title: "음정 마스터",
        },
      ],
    },
    {
      id: 2,
      lecture_id: 1,
      title: "2장 음계",
      material_url: "https://lecture.pdf",
      chapter_video_titles: [
        {
          id: 201,
          title: "스케일 이론",
        },
        {
          id: 202,
          title: "음계 마스터",
        },
      ],
    },
  ];
  const lectureData = mock.filter(lecture => lecture.lecture_id === lectureIdNum);
  return NextResponse.json(lectureData);
}
