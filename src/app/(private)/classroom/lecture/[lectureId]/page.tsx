'use client'

import MaterialList from '@/app/(private)/_components/lecture/MaterialList';
import VideoPlayer from '@/app/(private)/_components/lecture/VideoPlayer';
import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import Button from '@/components/Button';
import clsx from 'clsx';
import React, { useState } from 'react';

const chapterItems = [
  { id: 1, isCompleted: true, progress: '00:05:00', title: 'chapter item name1', videoUrl: 'https://youtu.be/z50DbJcrEsY?si=rJkoF6nGNXzMlTkx' },
  { id: 2, isCompleted: false, progress: '00:05:00', title: 'chapter item name2', videoUrl: 'https://youtu.be/2k55bh3-ZWk?si=9QCYGMlRMNMmV9pJ' },
]

const LecturePage = () => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');
  const [selectedChapterItem, setSelectedChapterItem] = useState(chapterItems[0])

  const tabClassName = (tab: 'lecture' | 'materials') =>
    clsx('h-max', activeTab === tab ? 'font-bold text-primary-900' : 'text-muted-400')

  return (
    <div className='bg-muted-100 h-screen px-5 pt-5'>
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
            <div className='flex justify-center m-[1rem]'>
              <SelectBox />
            </div>
            <div className='flex justify-center'>
              {activeTab === 'lecture' ? (
                <ChapterItemList chapterItems={chapterItems} onClick={(chapter) => setSelectedChapterItem(chapter)} />
              ) : (
                <div className='w-full px-6'>
                  <MaterialList />
                </div>
              )}
            </div>
          </DetailContainer>
        <div className='bg-white w-full max-w-6xl rounded-md shadow-md flex flex-col items-center gap-[10px]'>
          <VideoPlayer videoUrl={selectedChapterItem.videoUrl} />
          {selectedChapterItem.isCompleted && (
            <div className='w-[95%] flex justify-end'>
              <Button label='과제하러가기' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default LecturePage;