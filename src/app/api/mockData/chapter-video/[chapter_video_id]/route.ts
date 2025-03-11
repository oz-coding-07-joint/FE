import { NextResponse } from "next/server";

export function GET() {
  const mock = {
    id: 1,
    video_url: "https://lecture.com",
  };
  return NextResponse.json(mock);
}
