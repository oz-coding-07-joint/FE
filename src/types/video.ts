export interface SChapter {
    id: number;
    lecture_id: number;
    title: string;
    material_info: {
        download_url: string,
        file_name: string,
    }
    chapter_video_titles: SVideo[];
}

export interface Chapter {
    id: number;
    lectureId: number;
    title: string;
    materialInfo: {
        downloadUrl: string,
        fileName: string,
    }
    chapterVideoTitles: Video[];
  }

  export function transformChapter(chapter: SChapter): Chapter {
    return {
        id: chapter.id,
        lectureId: chapter.lecture_id,
        title: chapter.title,
        materialInfo: {
            downloadUrl: chapter.material_info.download_url,
            fileName: chapter.material_info.file_name,
        },
        chapterVideoTitles: chapter.chapter_video_titles.map(transformVideo),
    };
}

interface SVideo {
    id: number;
    title?: string;
    video_url?: string;
    is_completed: boolean;
    progress: string;
}

export interface Video {
    id: number;
    title?: string;
    videoUrl?: string;
    isCompleted: boolean;
    progress: string;
}

export function transformVideo(video: SVideo): Video {
    return {
        id: video.id,
        title: video.title,
        videoUrl: video.video_url,
        isCompleted: video.is_completed,
        progress: video.progress,
    };
}
