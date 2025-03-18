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
            className={`border-b-2 h-[84px] flex flex-col justify-center cursor-pointer`}>
            <div className="flex items-center">
              {progressData?.isCompleted ? <CheckCircle size={16} color="#666666" weight="fill" /> : <Circle size={16} color="#666666" />}
              {progressData?.progress === '100.00' ? <span className="ml-[5px] text-base">학습완료</span> : progressData?.progress == '0.00' ? <span className="ml-[5px] text-base">학습전</span> : <span className="ml-[5px] text-base">학습중</span>}
            </div>
            <p className={`text-lg line-clamp-1 ${selectedVideoId === item.id ? 'font-bold' : ''}`}>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}

