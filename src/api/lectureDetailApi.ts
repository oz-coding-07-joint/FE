import { SChapter, transformChapter, transformVideo } from "@/types/video";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "./api";
import { AxiosError } from "axios";

// 챕터 리스트
export const useChapters = (lectureId: number) =>
  useQuery({
    queryKey: ["chapters", lectureId],
    queryFn: async () => {
      const response = await api.get(`/courses/lecture_chapter/${lectureId}/`);
      const transformedChapter = response.data.map((chapter: SChapter) =>
        transformChapter(chapter)
    );
    console.log(transformedChapter)
      return transformedChapter;
    },
    staleTime: 1000 * 60 * 10,
  });

// 비디오 정보 id, title, videoUrl
export const useChapterVideo = (chapterVideoId: number | null) =>
  useQuery({
    queryKey: ["chapterVideo", chapterVideoId],
    queryFn: async () => {
      const response = await api.get(
        `/courses/chapter_video/${chapterVideoId}/`
      );
      return transformVideo(response.data);
    },
    enabled: !!chapterVideoId,
  });

export const useGetVideoProgress = (chapterVideoId: number | null) => {
  const createProgress = useCreateVideoProgress();

  return useQuery({
    queryKey: ["videoProgress", chapterVideoId],
    queryFn: async () => {
      try {
        const response = await api.get(
          `/courses/chapter_video/${chapterVideoId}/state/`
        );
        const transformedGetVideoProgress = transformVideo(response.data)
        return transformedGetVideoProgress;
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          console.log("진행 상태가 없으므로 새로 생성");
          if (chapterVideoId) {
            createProgress.mutate({
              chapterVideoId,
              lastWatchedTime: 0,
              duration: 0,
            });
          }
          return null;
        }
        throw error;
      }
    },
    enabled: !!chapterVideoId,
    retry: false,
  });
};

// 비디오 진행 상태 만들기
export const useCreateVideoProgress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chapterVideoId,
      lastWatchedTime,
      duration,
    }: {
      chapterVideoId: number | null;
      lastWatchedTime: number;
      duration: number;
    }) => {
      try {
        const response = await api.post(
          `/courses/chapter_video/${chapterVideoId}/progress/`,
          { last_watched_time: lastWatchedTime, total_duration: duration }
        );
        console.log('post', response.data)
        return response.data;
      } catch (error) {
        console.error("비디오 상태 만들기 오류", error);
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["videoProgress", variables.chapterVideoId],
      });
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
      duration,
    }: {
      chapterVideoId: number | null;
      lastWatchedTime: number;
      duration: number;
    }) => {
      if (!chapterVideoId) return null;

      try {
        const response = await api.patch(
          `/courses/chapter_video/${chapterVideoId}/progress/update/`,
          { last_watched_time: lastWatchedTime, total_duration: duration }
        );
        return response.data;
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          const createResponse = await api.post(
            `/courses/chapter_video/${chapterVideoId}/progress/`,
            { last_watched_time: lastWatchedTime, total_duration: duration }
          );
          return createResponse.data;
        }
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["videoProgress", variables.chapterVideoId],
      });
    },
  });
};

export const useGetMultipleVideoProgress = (chapterItems: { id: number }[] = []) => {
  return useQueries({
    queries: chapterItems
      .filter((item) => !!item.id) // null 체크
      .map((item) => ({
        queryKey: ["videoProgress", item.id],
        queryFn: async () => {
          try {
            const response = await api.get(
              `/courses/chapter_video/${item.id}/state/`
            );

            const transformedGetVideoProgress = transformVideo(response.data)

            return transformedGetVideoProgress;
          } catch (error) {
            if ((error as AxiosError).response?.status === 404) {
              return null;
            }
            throw error;
          }
        },
        enabled: !!item.id,
        retry: false,
      })),
  });
};
