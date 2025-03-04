import SelectBox from '@/components/classroom/SelectBox';
import React from 'react';

const LecturePage = () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className='bg-[#F9F9F9]'>
      <h1>title</h1>
      <div className='bg-white rounded-md w-[390px] h-[800px] shadow-md overflow-hidden'>
        <div className='bg-[#F5F9FF] w-[390px] h-[60px] flex justify-around items-center'>
          <button className='h-max'>수업목록</button>
          <div className='w-px h-[30px] bg-gray-400'></div>
          <button className='h-max'>학습자료</button>
        </div>
        <div className='flex justify-center m-[20px]'>
          <SelectBox options={options} />
        </div>
      </div>
    </div>
  )
};

export default LecturePage;