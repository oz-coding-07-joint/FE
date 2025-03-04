'use client'

import { ChapterItemList } from '@/components/classroom/ChapterItemList';
import DetailContainer from '@/components/classroom/DetailContainer';
import SelectBox from '@/components/classroom/SelectBox';
import React, { useState } from 'react';

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

  return (
    <div className='bg-[#F9F9F9]'>
      <h1>title</h1>
      <div className='flex justify-around'>
        <DetailContainer
          leftTab={
            <button className={`h-max ${activeTab === 'lecture' ? 'font-bold text-[#192845]' : 'text-[#666666]'}`}
              onClick={() => setActiveTab('lecture')}
            >수업목록</button>
          }
          rightTab={
            <button className={`h-max ${activeTab === 'materials' ? 'font-bold text-[#192845]' : 'text-[#666666]'}`}
              onClick={() => setActiveTab('materials')}
            >학습자료</button>
          }
          width='24rem'
          height='50rem'
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