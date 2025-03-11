import { Chapter } from '@/types/video';
import { FilePdf } from 'phosphor-react';
import React from 'react';

type MaterialListProps = Pick<Chapter, 'materialUrl'>

const fileName = (url: string) => {
  const splitedUrl = url.split('/');
  return splitedUrl[splitedUrl.length - 1]
}

const MaterialList = ({materialUrl}: MaterialListProps) => {
  return (
      <div className='flex items-center gap-3'>
        <FilePdf size={16} />
        <p>
          {fileName(materialUrl)}
        </p>
      </div>
  );
};

export default MaterialList;