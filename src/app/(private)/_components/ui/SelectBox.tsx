import { Chapter } from '@/types/video';
import React from 'react';

type Options = Pick<Chapter, 'id' | 'title'>

const options: Options[] = [
  { id: 1, title: 'Option 1' },
  { id: 2, title: 'Option 2' },
  { id: 3, title: 'Option 3' },
];

const SelectBox = () => {
  return (
    <div className='border border-muted-200 rounded-md w-[310px] h-[50px] flex justify-center min-w-0'>
      <select className='w-full border-x-8 border-white'>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;