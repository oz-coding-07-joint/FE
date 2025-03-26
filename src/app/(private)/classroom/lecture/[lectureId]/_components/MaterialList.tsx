import { Chapter } from '@/types/video';
import { FilePdf } from 'phosphor-react';

type MaterialListProps = Partial<Pick<Chapter, 'materialInfo'>> 

const MaterialList = ({ materialInfo }: MaterialListProps) => {

  if(!materialInfo) return null;
  console.log("Download URL:", materialInfo.downloadUrl);
  console.log("Download Name:", materialInfo.fileName);

  const handleDownload = async () => {
    if(!materialInfo.downloadUrl) {
      console.error ('Download URL is missing');
      return;
    }
    try {
      const response = await fetch(materialInfo.downloadUrl);
      if(!response.ok) throw new Error('Failed to fetch file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = materialInfo.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Download failed:', error);
    }
  }

  return (
    <div className='w-[85%]'>
      <button className='flex items-center gap-3'
        onClick={handleDownload}
      >
        <FilePdf size={16} />
        <p className='w-[200px] line-clamp-1'>
          {materialInfo.fileName}
        </p>
      </button>
    </div>
  );
};

export default MaterialList;