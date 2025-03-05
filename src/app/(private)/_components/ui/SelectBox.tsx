import { Chapter } from '@/types/video';
import React from 'react';

type options = Pick<Chapter, 'id' | 'title'>

const SelectBox = ({ options }: {options: options[]}) => {
  return (
    <div className='border border-muted-200 rounded-md w-[350px] h-[50px] flex justify-center'>
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