import { Video } from "@/types/video";
import { CheckCircle, Circle } from "phosphor-react";

interface ChapterItemListProps {
  chapterItems: Video[];
  onClick: (chapter: Video) => void;
  selectedVideoId: number | null;
}

export const ChapterItemList = ({ chapterItems, onClick, selectedVideoId }: ChapterItemListProps) => {

  const handleClick = (chapterItem: Video) => {
    onClick(chapterItem);
  }

  return (
    <div className="w-[85%]">
      {chapterItems.map((item, index) => (
        <div key={index}
          onClick={() => handleClick(item)}
          className={`border-b-2 h-[84px] flex flex-col justify-center cursor-pointer`}>
          <div className="flex items-center">
            {item.progress.isCompleted ? <CheckCircle size={16} color="#666666" weight="fill" /> : <Circle size={16} color="#666666" />}
            {item.progress.progress === 100 ? <span className="ml-[5px] text-base">학습완료</span> : item.progress.progress === 0 ? <span className="ml-[5px] text-base">학습전</span> : <span className="ml-[5px] text-base">학습중</span>}
          </div>
          <p className={`text-lg line-clamp-1 ${selectedVideoId === item.id ? 'font-bold' : ''}`}>{item.title}</p>
        </div>
      ))}
    </div>
  )
}

