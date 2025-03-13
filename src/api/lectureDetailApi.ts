import {
  Chapter,
  SChapter,
  transformChapter,
  transformVideo,
  Video,
} from "@/types/video";
import axios from "axios";
import api from "./api";

export const fetchChapters = async (lectureId: number): Promise<Chapter[]> => {
  try {
    const response = await axios.get(
      `/api/mockData/lecture_chapter/${lectureId}/`
    );
    console.log("fetchChapters API 응답 데이터:", response.data);
    return response.data.map((chapter: SChapter) => transformChapter(chapter));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 비디오 정보, 비디오 진행도 상태
export const fetchChapterVideo = async (
  chapterVideoId: number,
  videoTitle?: string
): Promise<Video> => {
  try {
    const videoResponse = await axios.get(
      `/api/mockData/chapter_video/${chapterVideoId}/`
    );
    const videoData = transformVideo(videoResponse.data);

    if (videoTitle) {
      videoData.title = videoTitle;
    }

    const stateResponse = await axios.get(
      `/api/mockData/chapter_video/${chapterVideoId}/state/`
    );
    
    return {
      ...videoData,
      progress: stateResponse.data.progress,
      isCompleted: stateResponse.data.is_completed,
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
      (ch: Chapter) => Number(ch.id) === chapterId
    );

    if (!chapterData) {
      throw new Error(`Chapter with ID ${chapterId} not found`);
    }

    const videoDetailed = await Promise.all(
      chapterData.chapterVideoTitles.map(async (videoSummary: Video) => {
        return await fetchChapterVideo(videoSummary.id, videoSummary.title);
      })
    );
    console.log("chapterData:", chapterData);
    console.log(videoDetailed);

    return {
      ...chapterData,
      chapterVideoTitles: videoDetailed,
    };
  } catch (error) {
    throw error;
  }
};

export const getVideoState = async (chapterVideoId: number | null) => {
  try {
    const response = await axios.get(
      `/api/mockData/chapter_video/${chapterVideoId}/state/`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch video state", error);
    return null;
  }
};

// 비디오 진행률 보내기
export const updateVideoProgress = async (
  chapterVideoId: number | null,
  newProgressSeconds: number,
  isCompleted: boolean

) => {
  const response = await axios.patch(
    `/api/mockData/chapter_video/${chapterVideoId}/progress/`,
    {
      progress: newProgressSeconds,
      is_completed: isCompleted,
    }
  );

  if (!response) {
    throw new Error(`Failed to update resource`);
  }

  const updatedResource = await getVideoState(chapterVideoId);

  return updatedResource;
};
