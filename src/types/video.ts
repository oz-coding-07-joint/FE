export interface SChapter {
    id: number;
    lecture_id: number;
    title: string;
    material_info: {
        url: string,
        file_name: string,
    }
    // material_url: string;
    chapter_video_titles: SVideo[];
}

export interface Chapter {
    id: number;
    lectureId: number;
    title: string;
    materialInfo: {
        url: string,
        fileName: string,
    }
    // materialUrl: string;
    chapterVideoTitles: Video[];
  }

  export function transformChapter(chapter: SChapter): Chapter {
    return {
        id: chapter.id,
        lectureId: chapter.lecture_id,
        title: chapter.title,
        materialInfo: {
            url: chapter.material_info.url,
            fileName: chapter.material_info.file_name,
        },
        // materialUrl: chapter.material_url,
        chapterVideoTitles: chapter.chapter_video_titles.map(transformVideo),
    };
}

interface SVideo {
    id: number;
    title?: string;
    video_url?: string;
    progress: {
        last_watched_time: number,
        progress: number,
        is_completed: boolean,
    };
    is_completed?: boolean;
    last_watched_time?: string;
}

export interface Video {
    id: number;
    title?: string;
    videoUrl?: string;
    progress: {
        lastWatchedTime: number,
        progress: number,
        isCompleted: boolean,
    };
    isCompleted?: boolean;
    lastWatchedTime?: string;
}

export function transformVideo(video: SVideo): Video {
    return {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        progress: {
            lastWatchedTime: video.progress?.last_watched_time,
            progress: video.progress?.progress,
            isCompleted: video.progress?.is_completed,
        }
    };
}