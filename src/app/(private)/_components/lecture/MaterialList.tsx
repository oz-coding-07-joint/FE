'use client'

import { Chapter } from '@/types/video';
import axios from 'axios';
import { FilePdf } from 'phosphor-react';
import { useEffect, useState } from 'react';

type MaterialListProps = Partial<Pick<Chapter, 'materialInfo'>>

const getFileName = (url: string) => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const splitedUrl = decodedUrl.split('/');
    const fileName = splitedUrl[splitedUrl.length - 1];
    const namePart = fileName.split('_')[1];
    return namePart || fileName;
  } catch (error) {
    console.error('getFileName Error', error);
  }
}

const getFileType = async (url: string) => {
  try {
    const response = await axios.get(url, {responseType: 'blob'});
    // const contentType = response.headers['content-type'];
    return response.data.type;
  } catch (error) {
    console.error('getFileType Error', error);
  }
}

const MaterialList = ({ materialInfo }: MaterialListProps) => {
  if(!materialInfo) return null;

  const fileName = materialInfo.fileName.replace(/^materials_([^_]+_[^_]+)_\S+\.\w+$/, "$1");
  // const [fileType, setFileType] = useState<string | null>(null)

  // const fileName = getFileName(materialUrl);

  // useEffect(() => {
  //   const fetchFileType = async () => {
  //     const type = await getFileType(materialUrl)
  //     setFileType(type)
  //   }
  //   fetchFileType()
  // }, [materialUrl])

  return (
    <div className='w-[85%]'>
      <a className='flex items-center gap-3'
        href={materialInfo.url}
        download={materialInfo.fileName}
        target='_blank'
        rel="noopener noreferrer"
      >
        <FilePdf size={16} />
        {/* <p className='text-black'>
          {fileType}
        </p> */}
        <p className='line-clamp-1'>
          {fileName}
        </p>
      </a>
    </div>
  );
};

export default MaterialList;