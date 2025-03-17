import {
  Chapter,
  SChapter,
  transformChapter,
  transformVideo,
  Video,
} from "@/types/video";
import axios from "axios";
import api from "./api";

//임시 토큰 사용
const mockToken = process.env.NEXT_PUBLIC_TEMPORARY_TOKEN;

const mockAPI = axios.create({
  baseURL: "http://211.188.59.23/api/v1",
  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${mockToken}`,
    "Content-Type": "application/json",
  },
});

export const fetchChapters = async (lectureId: number): Promise<Chapter[]> => {
  try {
    const response = await api.get(
      `/courses/lecture_chapter/${lectureId}/`
    );

    console.log("fetchChapters API 응답 데이터:", response.data);
    return response.data.map((chapter: SChapter) => transformChapter(chapter));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 비디오 정보 id, title, videoUrl
export const fetchChapterVideo = async (
  chapterVideoId: number,
): Promise<Video> => {
  try {
    const videoResponse = await api.get(
      `/courses/chapter_video/${chapterVideoId}/`
    );
    const videoData = transformVideo(videoResponse.data);

    console.log('videoData:', videoData)

    return videoData;
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
        return await fetchChapterVideo(videoSummary.id);
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

// 비디오 진행 상태 만들기
export const createVideoProgress = async (
  chapterVideoId: number | null,
  lastWatchedTime: number
) => {
  try {
    const response = await api.post(
      `/courses/chater_video/${chapterVideoId}/progress/`,
      {
        last_watched_time: lastWatchedTime,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create video progress", error);
    throw error;
  }
};

// 비디오 진행률 업데이트
export const updateVideoProgress = async (
  chapterVideoId: number | null,
  lastWatchedTime: number,
  isCompleted: boolean,
) => {
  try {
    const response = await api.patch(
      `/courses/chapter_video/${chapterVideoId}/progress/update/`,
      {
        last_watched_time: lastWatchedTime,
        is_completed: isCompleted,
      }
    );

    if (!response) {
      throw new Error(`Failed to update resource`);
    }

    return response.data;
  } catch (error) {
    console.error('Failed to update video progress', error);
    throw error;
  }
};
