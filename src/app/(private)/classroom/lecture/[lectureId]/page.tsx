'use client'

import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import clsx from 'clsx';
import React, { useState } from 'react';

const options = [
  { id: 1, title: 'Option 1' },
  { id: 2, title: 'Option 2' },
  { id: 3, title: 'Option 3' },
];

const chapterItems = [
  { id: 1, isCompleted: true, progress: '00:05:00', title: 'chapter item name' },
  { id: 2, isCompleted: false, progress: '00:05:00', title: 'chapter item name2' },
]

const materialItems = [
  { id: 1, title: 'material 1' },
  { id: 2, title: 'material 2' },
  { id: 3, title: 'material 3' },
]

const LecturePage = () => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');

  const tabClassName = (tab: 'lecture' | 'materials') =>
    clsx('h-max', activeTab === tab ? 'font-bold text-primary-900' : 'text-muted-400')

  return (
    <div className='bg-white'>
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
          width='w-sm'
          height='h-[800px]'
        >
          <div className='flex justify-center m-[1rem]'>
            <SelectBox options={options} />
          </div>
          <div className='flex justify-center'>
            {activeTab === 'lecture' ? (
              <ChapterItemList chapterItems={chapterItems} />
            ) : (
              <div>
                {materialItems.map((item) => (
                  <div key={item.id}>
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </DetailContainer>
        <div className='bg-white w-[1210px] rounded-md shadow-md'>video
        </div>
      </div>
    </div>
  )
};

export default LecturePage;