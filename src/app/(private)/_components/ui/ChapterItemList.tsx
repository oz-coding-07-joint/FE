import { Video } from "@/types/video";
import { CheckCircle, Circle } from "phosphor-react";
import { useState } from "react";

// type ChapterItem = Required<Pick<Video, 'id' | 'isCompleted' | 'title' | 'progress' | 'videoUrl'>>

interface ChapterItemListProps {
  chapterItems: Video[];
  onClick: (chapter: Video) => void;
}

export const ChapterItemList = ({ chapterItems, onClick }: ChapterItemListProps ) => {
  const [selectedId, setSelectedId] = useState<number>(chapterItems[0]?.id || 0);

  const handleClick = (chapterItem: Video) => {
    setSelectedId(chapterItem.id);
    onClick(chapterItem);
  }

  return (
    <div className="w-[85%]">
      {chapterItems.map((item) => (
        <div key={item.id}
          onClick={() => handleClick(item)}
          className={`border-b-2 h-[84px] flex flex-col justify-center cursor-pointer min-w-0`}>
          <div className="flex items-center">
            {item.isCompleted ? <CheckCircle size={16} color="#666666" weight="fill" /> : <Circle size={16} color="#666666" />}
            <span className="ml-[5px] text-base">{item.progress}</span>
          </div>
          <div className={`text-lg ${selectedId === item.id ? 'font-bold' : ''}`}>{item.title}</div>
        </div>
      ))}
    </div>
  )
}

