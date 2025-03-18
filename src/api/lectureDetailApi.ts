import {
  Chapter,
  SChapter,
  transformChapter,
  transformVideo,
  Video,
} from "@/types/video";
import api from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 챕터 리스트
export const useChapters = (lectureId: number) =>
  useQuery({
    queryKey: ["chapters", lectureId],
    queryFn: async () => {
      const response = await api.get(`/courses/lecture_chapter/${lectureId}/`);
      const transformedChapter = response.data.map((chapter: SChapter) =>
        transformChapter(chapter))

      console.log(transformedChapter)
      return response.data.map((chapter: SChapter) =>
        transformChapter(chapter)
      );
    },
    staleTime: 1000 * 60 * 10,
  });

// 비디오 정보 id, title, videoUrl
export const useChapterVideo = (chapterVideoId: number) =>
  useQuery({
    queryKey: ["chapterVideo", chapterVideoId],
    queryFn: async () => {
      const response = await api.get(
        `/courses/chapter_video/${chapterVideoId}/`
      );
      const transformedVideo = transformVideo(response.data);
      console.log(transformedVideo)
      return transformVideo(response.data);
    },
    // enabled: !!chapterVideoId,
  });

// export const fetchChapterDetails = async (
//   lectureId: number,
//   chapterId: number
// ): Promise<Chapter> => {
//   try {
//     const chapterResponse = await fetchChapters(lectureId);
//     console.log("가져온 챕터 목록:", chapterResponse);
//     const chapterData = chapterResponse.find(
//       (ch: Chapter) => Number(ch.id) === chapterId
//     );

//     if (!chapterData) {
//       throw new Error(`Chapter with ID ${chapterId} not found`);
//     }

//     const videoDetailed = await Promise.all(
//       chapterData.chapterVideoTitles.map(async (videoSummary: Video) => {
//         return await fetchChapterVideo(videoSummary.id);
//       })
//     );
//     console.log("chapterData:", chapterData);
//     console.log(videoDetailed);
//     console.log({ ...chapterData, chapterVideoTitles: videoDetailed });

//     return {
//       ...chapterData,
//       chapterVideoTitles: videoDetailed,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// 비디오 진행 상태 만들기
export const useCreateVideoProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chapterVideoId,
      lastWatchedTime,
    }: {
      chapterVideoId: number;
      lastWatchedTime: number;
    }) => {
      const response = await api.post(
        `/courses/chapter_video/${chapterVideoId}/progress/`,
        { last_watched_time: lastWatchedTime }
      );
      console.log('비디오 상태 만들기 완료')
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapterVideo"] });
    },
  });
};

// 비디오 진행률 업데이트
export const useUpdateVideoProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chapterVideoId,
      lastWatchedTime,
    }: {
      chapterVideoId: number | null;
      lastWatchedTime: number;
    }) => {
      const response = await api.patch(
        `/courses/chapter_video/${chapterVideoId}/progress/update/`,
        { last_watched_time: lastWatchedTime }
      );
      console.log('진행률 업데이트')
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapterVideo"] });
    },
  });
};
