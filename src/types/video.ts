interface SChapter {
    id: number;
    lecture_id: number;
    title: string;
    meterial_url: string;
    chapter_vedio_titles: SVideo[];
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
        materialUrl: chapter.meterial_url,
        chapterVideoTitles: chapter.chapter_vedio_titles.map(transformVideo),
    };
}

interface SVideo {
    id: number;
    title?: string;
    video_url?: string;
    progress?: string;
    is_completed?: boolean;
    title: string;
}

export interface Video {
    id: number;
    title?: string;
    videoUrl?: string;
    progress?: string;
    isCompleted?: boolean;
    title: string;
}

export function transformVideo(video: SVideo): Video {
    return {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        progress: video.progress,
        isCompleted: video.is_completed,
        title: video.title,
    };
}