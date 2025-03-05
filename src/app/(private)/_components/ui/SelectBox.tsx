import { Chapter } from '@/types/video';
import React from 'react';

type options = Pick<Chapter, 'id' | 'title'>

const SelectBox = ({ options }: {options: options[]}) => {
  return (
    <div className='border border-[#DDDDDD] rounded-md w-[22rem] h-[3rem] flex justify-center'>
      <select className='w-[5rem]'>
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