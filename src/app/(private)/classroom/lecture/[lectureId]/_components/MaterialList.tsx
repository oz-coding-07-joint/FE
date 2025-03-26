import { Chapter } from '@/types/video';
import { FileArrowDown, FileJpg, FilePdf, FilePng } from 'phosphor-react';

type MaterialListProps = Partial<Pick<Chapter, 'materialInfo'>>

const MaterialList = ({ materialInfo }: MaterialListProps) => {

  if (!materialInfo) return null;
  const extension = materialInfo.fileName.slice(-3);

  return (
    <div className='w-[85%]'>
      <a className='flex items-center gap-3'
        href={materialInfo.downloadUrl}
        download={materialInfo.fileName}
        target='_blank'
        rel="noopener noreferrer"
      >
        {extension === 'pdf' ? (
          <FilePdf size={25} />
        ) : extension === 'jpg' || extension === 'jpeg' ? (
          <FileJpg size={25} />
        ) : extension === 'png' ? (
          <FilePng size={25} />
        ) : (
          <FileArrowDown size={25} />
        )
        }
        <p className='w-[200px] line-clamp-1'>
          {materialInfo.fileName}
        </p>
      </a>
    </div>
  );
};

export default MaterialList;