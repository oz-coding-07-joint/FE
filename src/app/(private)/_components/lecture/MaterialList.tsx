import { Chapter } from '@/types/video';
import { FilePdf } from 'phosphor-react';
import React from 'react';

type MaterialListProps = Pick<Chapter, 'materialUrl'>

const materialItems: MaterialListProps = { materialUrl: 'https://example.com/file.pdf' }

const fileName = (url: string) => {
  const splitedUrl = url.split('/');
  return splitedUrl[splitedUrl.length - 1]
}

const MaterialList = () => {
  return (
      <div className='flex items-center gap-3'>
        <FilePdf size={16} />
        <p>
          {fileName(materialItems.materialUrl)}
        </p>
      </div>
  );
};

export default MaterialList;