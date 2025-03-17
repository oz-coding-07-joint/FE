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
      <a className='flex items-center gap-3'
      href={materialUrl}
      download={fileName(materialUrl)}
      target='_blank'
      rel="noopener noreferrer"
      >
        <FilePdf size={16} />
        <p>
          {fileName(materialUrl)}
        </p>
      </a>
  );
};

export default MaterialList;