import { useGetMultipleVideoProgress } from "@/api/lectureDetailApi";
import { Video } from "@/types/video";
import { CheckCircle, Circle } from "phosphor-react";

interface ChapterItemListProps {
  chapterItems: Video[];
  onClick: (chapter: Video) => void;
  selectedVideoId: number | null;
}

export const ChapterItemList = ({ chapterItems, onClick, selectedVideoId }: ChapterItemListProps) => {

  const progressQueries = useGetMultipleVideoProgress(chapterItems);
  console.log('progressQueris', progressQueries)

  const handleClick = (chapterItem: Video) => {
    onClick(chapterItem);
  }

  return (
    <div className="w-[85%]">
      {chapterItems.map((item, index) => {
        const progressData = progressQueries[index]?.data;

        return (
          <div key={index}
            onClick={() => handleClick(item)}
            className={`border-b-[1px] flex flex-col justify-center cursor-pointer py-3`}>
            <div className="flex items-center mb-1">
              {progressData?.isCompleted ? <CheckCircle size={16} className=" text-primary-800" weight="fill" /> : <Circle size={16} className="text-muted-400" />}
              {progressData?.isCompleted ? <span className="ml-1 text-xs text-primary-800 font-semibold">학습완료</span> : progressData?.progress == '0.00' || !progressData?.progress ? <span className="ml-1 text-xs font-semibold text-muted-400">학습전</span> : <span className="ml-1 text-xs font-semibold text-muted-400">학습중</span>}
            </div>
            <p className={`text-base line-clamp-1 px-1 ${selectedVideoId === item.id ? 'font-semibold' : ''}`}>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}

