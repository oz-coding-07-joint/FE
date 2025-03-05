import clsx from 'clsx';
import React from 'react';

export interface DetailContainerProps {
  children: React.ReactNode;
  leftTab?: React.ReactNode;
  rightTab?: React.ReactNode;
  width?: string;
  height?: string;
}

const DetailContainer = ({children, leftTab, rightTab, width, height}: DetailContainerProps) => {
  return (
    <div className={clsx('bg-white rounded-md shadow-md overflow-hidden', width, height)}>
      <div className='bg-[#F5F9FF] h-16 flex justify-around items-center w-full'>
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