'use client'

import DetailContainer from '@/components/classroom/DetailContainer';
import SelectBox from '@/components/classroom/SelectBox';
import React, { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const LecturePage = () => {
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials'>('lecture');

  return (
    <div className='bg-[#F9F9F9]'>
      <h1>title</h1>
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
        width='390px'
        height='800px'
      >
        <div className='flex justify-center m-[20px]'>
          <SelectBox options={options} />
        </div>
      </DetailContainer>
    </div>
  )
};

export default LecturePage;