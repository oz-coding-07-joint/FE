import { Video } from "@/types/video";
import { CheckCircle, Circle } from "phosphor-react";
import { useState } from "react";

type chapterItems = Pick<Video, 'id' | 'isCompleted' | 'title' | 'progress'>
type chapterItemListProps = {
  chapterItems : chapterItems[],
  duration : number,
}

export const ChapterItemList = ({ chapterItems, duration }: chapterItemListProps ) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleClick = (id: number) => {
    setSelectedId(id);
  }

  return (
    <div>
      {chapterItems.map((item) => (
        <div key={item.id}
          onClick={() => handleClick(item.id)}
          className={`border-b-2 w-[350px] h-[84px] flex flex-col justify-center cursor-pointer`}>
          <div className="flex items-center">
            {item.isCompleted ? <CheckCircle size={16} color="#666666" weight="fill" /> : <Circle size={16} color="#666666" />}
            <span className="ml-[5px] text-base">{duration}</span>
          </div>
          <div className={`text-lg ${selectedId === item.id ? 'font-bold' : ''}`}>{item.title}</div>
        </div>
      ))}
    </div>
  )
}

