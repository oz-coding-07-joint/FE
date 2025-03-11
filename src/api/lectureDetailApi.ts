import {
  Chapter,
  transformChapter,
  transformVideo,
  Video,
} from "@/types/video";
import axios from "axios";

export const fetchChapters = async (lectureId: number): Promise<Chapter[]> => {
  try {
    const response = await axios.get(
      `/api/mockData/lecture-chapter/${lectureId}/`
    );
    console.log("API 응답 데이터:", response.data);
    return response.data.map((chapter: any) => transformChapter(chapter));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 비디오 정보, 비디오 진행도 상태
export const fetchChapterVideo = async (
  chapterVideoId: number
): Promise<Video> => {
  try {
    const videoResponse = await axios.get(
      `/api/mockData/chapter-video/${chapterVideoId}/`
    );
    const videoData = transformVideo(videoResponse.data);

    const stateResponse = await axios.get(
      `/api/mockData/chapter-video/${chapterVideoId}/state/`
    );
    return {
      ...videoData,
      progress: stateResponse.data.progress,
      isCompleted: stateResponse.data.isCompleted,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchChapterDetails = async (
  lectureId: number,
  chapterId: number
): Promise<Chapter> => {
  try {
    const chapterResponse = await fetchChapters(lectureId);
    console.log("가져온 챕터 목록:", chapterResponse);
    const chapterData = chapterResponse.find(
      (ch: any) => Number(ch.id) === chapterId
    );

    if (!chapterData) {
      throw new Error(`Chapter with ID ${chapterId} not found`);
    }

    const videoDetailed = await Promise.all(
      chapterData.chapterVideoTitles.map(async (videoSummary:any) => {
        return await fetchChapterVideo(videoSummary.id);
      })
    );

    return {
      ...chapterData,
      chapterVideoTitles: videoDetailed,
    };
  } catch (error) {
    throw error;
  }
};
