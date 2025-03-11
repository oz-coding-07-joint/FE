import { NextResponse } from "next/server";

let users = [
  {chapter_video_id: 1, progress: 75.50, is_compeleted: false},
  {chapter_video_id: 2, progress: 75.50, is_compeleted: false},
]

export async function PATCH(request: Request, {params}: {params: {chapter_video_id: string}}) {
  const chapterVideoId = parseInt(params.chapter_video_id);
  const updatedData = await request.json();

  const userIndex = users.findIndex(user => user.chapter_video_id === chapterVideoId);

  users[userIndex] = {
    ...users[userIndex],
    ...updatedData
  };

  return NextResponse.json(users[userIndex]);
}