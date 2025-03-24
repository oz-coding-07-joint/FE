import { Chapter } from '@/types/video';
import React from 'react';

type Options = Pick<Chapter, 'id' | 'title'>

interface SelectBoxProps {
  options: Options[];
  selectedChapterId: number | null;
  onChange: (id: number) => void;
}

const SelectBox = ({options, selectedChapterId, onChange}: SelectBoxProps) => {
  
  return (
    <div className='border border-muted-200 rounded-md w-[310px] h-[50px] flex justify-center min-w-0'>
      <select className='w-full border-x-8 border-white rounded-md'
      value={selectedChapterId ?? ''}
      onChange={(e) => onChange(Number(e.target.value))}
      >
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