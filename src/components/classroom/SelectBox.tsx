import { SelectBoxProps } from '@/types/class';
import React from 'react';

const SelectBox = ({ options }: SelectBoxProps) => {
  return (
    <div className='border border-[#DDDDDD] rounded-md w-[350px] h-[50px] flex justify-center'>
      <select className='w-[320px]'>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;