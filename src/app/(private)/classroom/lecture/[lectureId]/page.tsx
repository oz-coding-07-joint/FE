'use client'

import MaterialList from '@/app/(private)/_components/lecture/MaterialList';
import VideoPlayer from '@/app/(private)/_components/lecture/VideoPlayer';
import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import Button from '@/components/Button';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useLectureStore } from '@/store/useLectureStore';
import { Video } from '@/types/video';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const LectureDetailPage = () => {
  const params = useParams();
  const lectureId = Number(params.lectureId);
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');

  const { chapters, chapterDetails, selectedChapterId, selectedVideoId, setSelectedChapterId, setSelectedVideoId, fetchChapters, fetchChapterDetails, } = useLectureStore();
  useEffect(() => {
    if (lectureId) {
      fetchChapters(lectureId);
    }
  }, [lectureId]);

  useEffect(() => {
    if (lectureId) {
      fetchChapterDetails(lectureId);
    }
  }, [lectureId, selectedChapterId]);

  const currentVideo = chapterDetails?.chapterVideoTitles.find(video => video.id === selectedVideoId);

  const tabClassName = (tab: 'lecture' | 'materials') =>
    clsx('h-max', activeTab === tab ? 'font-bold text-primary-900' : 'text-muted-400')

  return (
    <div className='bg-muted-100 h-screen px-5 pt-5'>
      {lectureId && (
        <>
          <h1 className='text-3xl font-bold pb-3'>title</h1>
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
              width='w-sm max-w-[300px]'
              height='h-[800px]'
            >
              {chapters && chapters.length > 0 && (
                <Suspense fallback={<LoadingSkeleton />}>
                  <div className='flex justify-center m-[1rem]'>
                    <SelectBox
                      options={chapters.map((ch) => ({ id: ch.id, title: ch.title }))}
                      selectedChapterId={selectedChapterId}
                      onChange={(id) => {
                        setSelectedChapterId(id);
                      }
                      }
                    />
                  </div>
                </Suspense>
              )}
              <div className='flex justify-center'>
                {activeTab === 'lecture' ? (
                  chapterDetails && chapterDetails.chapterVideoTitles?.length ? (
                    <ChapterItemList chapterItems={chapterDetails.chapterVideoTitles} onClick={(video: Video) => setSelectedVideoId(video.id)} selectedVideoId={selectedVideoId} />
                  ) : (<LoadingSkeleton />)
                ) : (
                  <MaterialList materialUrl={chapterDetails?.materialUrl ?? ''} />
                )}
              </div>
            </DetailContainer>
            <div className='bg-white w-full max-w-6xl rounded-md shadow-md flex flex-col items-center gap-[10px]'>
              <Suspense fallback={<LoadingSkeleton />}>
                <VideoPlayer videoUrl={currentVideo?.videoUrl ?? ''} chapterVideoId={selectedChapterId} />
              </Suspense>
              {currentVideo?.isCompleted && (
                <div className='w-[95%] flex justify-end'>
                  <Button label='과제하러가기' />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default LectureDetailPage;