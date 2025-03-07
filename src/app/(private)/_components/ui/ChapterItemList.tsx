import { Video } from "@/types/video";
import { CheckCircle, Circle } from "phosphor-react";
import { useState } from "react";

type ChapterItems = Required<Pick<Video, 'id' | 'isCompleted' | 'title' | 'progress' | 'videoUrl'>>


export const ChapterItemList = ({ chapterItems, onClick }: {chapterItems: ChapterItems[]; onClick: (chapter: ChapterItems) => void} ) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleClick = (chapterItems: ChapterItems) => {
    setSelectedId(chapterItems.id);
    onClick(chapterItems);
  }

  return (
    <div>
      {chapterItems.map((item) => (
        <div key={item.id}
          onClick={() => handleClick(item)}
          className={`border-b-2 w-[300px] h-[84px] flex flex-col justify-center cursor-pointer min-w-0`}>
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

