import { Chapter } from '@/types/video';
import { getFileNameFromUrl } from '@/utils/fileurl';
import { FilePdf } from 'phosphor-react';

type MaterialListProps = Partial<Pick<Chapter, 'materialInfo'>>

const MaterialList = ({ materialInfo }: MaterialListProps) => {
  if(!materialInfo) return null;
  console.log("Download URL:", materialInfo.downloadUrl);

  const fileName = materialInfo.fileName.replace(/^materials_([^_]+_[^_]+)_\S+\.\w+$/, "$1");

  return (
    <div className='w-[85%]'>
      <a className='flex items-center gap-3'
        href={materialInfo.downloadUrl}
        download={getFileNameFromUrl(materialInfo.downloadUrl)}
        target='_blank'
        rel="noopener noreferrer"
      >
        <FilePdf size={16} />
        <p className='w-[200px] line-clamp-1'>
          {fileName}
        </p>
      </a>
    </div>
  );
};

export default MaterialList;