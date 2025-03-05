'use client'

import { ChapterItemList } from '@/app/(private)/_components/ui/ChapterItemList';
import DetailContainer from '@/app/(private)/_components/ui/DetailContainer';
import SelectBox from '@/app/(private)/_components/ui/SelectBox';
import clsx from 'clsx';
import React, { useState } from 'react';

export interface SelectBoxProps {
  options: {
    value: string;
    label: string;
  }[];
}


const options = [
  { id: 1, title: 'Option 1' },
  { id: 2, title: 'Option 2' },
  { id: 3, title: 'Option 3' },
];

const chapterItems = [
  { id: 1, isWatched: false, duration: '00:05:00', title: 'chapter item name' },
  { id: 2, isWatched: false, duration: '00:05:00', title: 'chapter item name2' },
]

const materialItems = [
  { id: 1, title: 'material 1' },
  { id: 2, title: 'material 2' },
  { id: 3, title: 'material 3' },
]

const LecturePage = () => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');

  const tabClassName = (tab: 'lecture' | 'materials') =>
    clsx('h-max', activeTab === tab ? 'font-bold text-[#192845]' : 'text-[#666666]')

  return (
    <div className='bg-[#F9F9F9]'>
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
          height='h-[50rem]'
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
        <div className='bg-white w-[76rem]'>video</div>
      </div>
    </div>
  )
};

export default LecturePage;