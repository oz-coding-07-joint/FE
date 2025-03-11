'use client'

import MaterialList from '@/app/(private)/_components/lecture/MaterialList';
import VideoPlayer from '@/app/(private)/_components/lecture/VideoPlayer';
import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import Button from '@/components/Button';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { fetchChapterDetails, fetchChapters } from '@/api/lectureDetailApi';
import { Chapter } from '@/types/video';
import { useParams } from 'next/navigation';


const LectureDetailPage = () => {
  const params = useParams();
  const lectureId = params.lectureId;
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterDetails, setChapterDetails] = useState<Chapter | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);

  useEffect(() => {
    if (chapters && chapters.length > 0 && !selectedChapterId) {
      setSelectedChapterId(chapters[0].id);
    }
  }, [chapters, selectedChapterId]);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const fetchedChapters = await fetchChapters(Number(lectureId));
        setChapters(fetchedChapters);
      } catch(error) {
        console.error('Error fetching chapters:', error);
      }
    }
    if(lectureId) {
      loadChapters();
    }
  }, [lectureId]);

  useEffect(() => {
    const loadChapterDetails = async () => {
      try {
        const fetchedChapterDetails = await fetchChapterDetails(Number(lectureId), Number(selectedChapterId));
        setChapterDetails(fetchedChapterDetails);
      } catch(error) {
        console.error('Error fetching chapter details:', error);
      }
    };
    loadChapterDetails();
  }, [lectureId, selectedChapterId]);

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
                width='w-sm max-w-[390px] '
                height='h-[800px]'
              >
                {chapters && chapters.length > 0 && (
                  <div className='flex justify-center m-[1rem]'>
                    <SelectBox
                      options={(chapters || []).map((ch) => ({ id: ch.id, title: ch.title }))}
                      selectedChapterId={selectedChapterId || chapters[0].id}
                      onChange={(id) => setSelectedChapterId(id)}
                    />
                  </div>
                )}
                <div className='flex justify-center'>
                  {activeTab === 'lecture' ? (
                    chapterDetails && chapterDetails.chapterVideoTitles ? (
                      <ChapterItemList chapterItems={chapterDetails.chapterVideoTitles} onClick={(chapter) => setSelectedChapterId(chapter.id)} />
                    ) : null
                  ) : (
                    <div className='w-full px-6'>
                      <MaterialList />
                    </div>
                  )}
                </div>
              </DetailContainer>
              <div className='bg-white w-full max-w-6xl rounded-md shadow-md flex flex-col items-center gap-[10px]'>
                <VideoPlayer videoUrl={chapterDetails?.chapterVideoTitles?.[0]?.videoUrl} />
                {chapterDetails?.chapterVideoTitles[0].isCompleted && (
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