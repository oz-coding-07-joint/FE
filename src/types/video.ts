export interface SChapter {
    id: number;
    lecture_id: number;
    title: string;
    material_url: string;
    chapter_video_titles: SVideo[];
}

export interface Chapter {
    id: number;
    lectureId: number;
    title: string;
    materialUrl: string;
    chapterVideoTitles: Video[];
  }

  export function transformChapter(chapter: SChapter): Chapter {
    return {
        id: chapter.id,
        lectureId: chapter.lecture_id,
        title: chapter.title,
        materialUrl: chapter.material_url,
        chapterVideoTitles: chapter.chapter_video_titles.map(transformVideo),
    };
}

interface SVideo {
    id: number;
    title?: string;
    video_url?: string;
    progress?: string;
    is_completed?: boolean;
    last_watched_time?: string;
}

export interface Video {
    id: number;
    title?: string;
    videoUrl?: string;
    progress?: string;
    isCompleted?: boolean;
    lastWatchedTime?: string;
}

export function transformVideo(video: SVideo): Video {
    return {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        progress: video.progress,
        isCompleted: video.is_completed,
        lastWatchedTime: video.last_watched_time,
    };
}