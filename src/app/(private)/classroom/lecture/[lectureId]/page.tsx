'use client'

import { useChapters, useChapterVideo } from '@/api/lectureDetailApi';
import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import MaterialList from '@/app/(private)/classroom/lecture/[lectureId]/_components/MaterialList';
import VideoPlayer from '@/app/(private)/classroom/lecture/[lectureId]/_components/VideoPlayer';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useLectureListStore } from '@/store/useLectureListStore';
import { useLectureStore } from '@/store/useLectureStore';
import { Video } from '@/types/video';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ParamIdTitle {
  id: number;
  title: string;
}

const LectureDetailPage = () => {
  const { selectedChapterId, selectedVideoId, setSelectedChapterId, setSelectedVideoId, } = useLectureStore();

  const params = useParams();
  const lectureId = Number(params.lectureId);
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');

  const { data: chapters, isLoading: chaptersLoading } = useChapters(lectureId);
  const { data: chapterDetails, isLoading: videoLoading } = useChapterVideo(selectedVideoId);

  const currentChapter = chapters?.find((ch: ParamIdTitle) => ch.id === selectedChapterId)
  const {lectures, fetchLectures} = useLectureListStore()
  const selectedLecture = lectures.find((lecture) => lecture.id === lectureId);

  useEffect(() => {
    if(!selectedLecture){
      fetchLectures()
    }
  }, [selectedLecture])

  useEffect(() => {
    if (chapters && chapters.length > 0) {
      setSelectedChapterId(chapters[0].id);
    }
  }, [chapters])


  useEffect(() => {
    if (currentChapter && currentChapter.chapterVideoTitles?.length > 0) {
      setSelectedVideoId(currentChapter.chapterVideoTitles[0].id)
    }
  }, [currentChapter, setSelectedChapterId]);

  const tabClassName = (tab: 'lecture' | 'materials') =>
    clsx('h-max w-max', activeTab === tab ? 'font-bold text-primary-900' : 'text-muted-400')

  return (
    <div className='bg-muted-100 h-screen px-5 pt-5'>
      {lectureId && (
        <>
          <h1 className='text-3xl font-bold pb-3'>{selectedLecture?.title ?? 'title'}</h1>
          <div className='flex gap-5'>
            <DetailContainer
              leftTab={
                <button className={tabClassName('lecture')}
                  onClick={() => setActiveTab('lecture')}
                >수업목록</button>
              }
              rightTab={
                <button className={tabClassName('materials')}
                  onClick={() => setActiveTab('materials')}
                >학습자료</button>
              }
              width='max-w-sm'
              height='h-[800px]'
            >
              <div className='flex justify-center m-[1rem]'>
                {chaptersLoading ? (
                  <LoadingSkeleton container='w-[310px] min-w-0 h-[50px]' styles='rounded-md' />
                ) : (
                  <SelectBox
                    options={chapters.map((ch: ParamIdTitle) => ({ id: ch.id, title: ch.title }))}
                    selectedChapterId={selectedChapterId}
                    onChange={(id) => {
                      setSelectedChapterId(id);
                    }
                    }
                  />
                )}
              </div>
              <div className='flex justify-center'>
                {activeTab === 'lecture' ? (
                  currentChapter && currentChapter?.chapterVideoTitles?.length ? (
                    <ChapterItemList chapterItems={currentChapter?.chapterVideoTitles} onClick={(video: Video) => setSelectedVideoId(video.id)} selectedVideoId={selectedVideoId} />
                  ) : (<div>Loading...</div>)
                ) : (
                  <MaterialList materialInfo={currentChapter?.materialInfo} />
                )}
              </div>
            </DetailContainer>
            <div className='bg-white w-full h-[800px] rounded-md shadow-md flex flex-col items-center gap-[10px]'>
              {chaptersLoading || videoLoading ? (
                <LoadingSkeleton container='w-[95%] aspect-video mt-5 flex items-center justify-center' />
              ) : (
                <VideoPlayer videoUrl={chapterDetails?.videoUrl ?? ''} chapterVideoId={selectedVideoId} lectureId={lectureId}/>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default LectureDetailPage;