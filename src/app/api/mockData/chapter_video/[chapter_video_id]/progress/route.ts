import { NextResponse } from "next/server";

export async function PATCH(request: Request, {params}: {params: {chapter_vidoe_id: string}}) {
  try {
    const {progress, is_completed, last_watched_time} = await request.json();

    if(typeof progress !== 'number' || typeof is_completed !== 'boolean') {
      return NextResponse.json({error: 'Invalid request body'}, {status: 400});
    }

    if(last_watched_time && typeof last_watched_time !== 'string') {
      return NextResponse.json({error: 'Invalid reques body'}, {status: 400});
    }

    const chapterVideoId = Number(params.chapter_vidoe_id);

    const updatedProgress = {
      chapterVideoId,
      progress,
      is_completed,
      last_watched_time,
    };

    return NextResponse.json(updatedProgress);
  } catch(error) {
    console.error('error', error)
  }
}