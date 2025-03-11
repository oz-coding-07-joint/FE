import { NextResponse } from "next/server";

export async function GET() {
  const mock = {
    id: 101,
    student_id: 5001,
    progress: "70",
    is_completed: false,
  };
  return NextResponse.json(mock);
}
