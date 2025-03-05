import React from 'react';
import { Chapter } from '@/types/class';

const SelectBox = ({ options }: {options: Chapter[]}) => {
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