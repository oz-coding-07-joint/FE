import { DetailContainerProps } from '@/types/class';
import React from 'react';

const DetailContainer = ({children, leftTab, rightTab, width, height}: DetailContainerProps) => {
  return (
    <div className='bg-white rounded-md shadow-md overflow-hidden' style={{width, height}}>
      <div className='bg-[#F5F9FF] h-16 flex justify-around items-center' style={{width}}>
        <div>
          {leftTab}
        </div>
        <div>
          {rightTab}
        </div>
      </div>
        {children}
    </div>
  );
};

export default DetailContainer;