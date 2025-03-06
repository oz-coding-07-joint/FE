'use client'

import MaterialList from '@/app/(private)/_components/lecture/MaterialList';
import VideoPlayer from '@/app/(private)/_components/lecture/VideoPlayer';
import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
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
    <div className='bg-white min-h-screen'>
      <h1>title</h1>
      <div className='flex justify-around'>
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
          width='w-[30vw] max-w-[320px]'
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
        <div className='bg-white w-[60vw] rounded-md shadow-md flex flex-col items-center gap-[10px]'>
          <VideoPlayer videoUrl={selectedChapterItem.videoUrl} />
          {selectedChapterItem.isCompleted && (
            <div className='w-[55vw] flex justify-end'>
              <button
                className="w-[120px] h-[40px] rounded-sm bg-primary-900 text-white"
              >과제 하러가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default LecturePage;