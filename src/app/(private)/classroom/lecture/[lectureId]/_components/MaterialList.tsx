import { Chapter } from '@/types/video';
import { FileJpg } from 'phosphor-react';

type MaterialListProps = Partial<Pick<Chapter, 'materialInfo'>> 

const MaterialList = ({ materialInfo }: MaterialListProps) => {

  if(!materialInfo) return null;
  console.log("Download URL:", materialInfo.downloadUrl);
  console.log("Download Name:", materialInfo.fileName);

  return (
    <div className='w-[85%]'>
      <a className='flex items-center gap-3'
       href={materialInfo.downloadUrl}
       download={materialInfo.fileName}
       target='_blank'
       rel="noopener noreferrer"
      >
        <FileJpg size={25} />
        <p className='w-[200px] line-clamp-1'>
          {materialInfo.fileName}
        </p>
      </a>
    </div>
  );
};

export default MaterialList;