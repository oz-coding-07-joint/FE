import { Video } from "@/types/video";
import { useState } from "react";

type chapterItems = Pick<Video, 'id' | 'isCompleted' | 'title' | 'progress'>

export const ChapterItemList = ({ chapterItems }: { chapterItems: chapterItems[] }) => {
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
            <input type='checkbox' checked={item.isCompleted} />
            <span className="ml-[5px] text-base">{item.progress}</span>
          </div>
          <div className={`text-lg ${selectedId === item.id ? 'font-bold' : ''}`}>{item.title}</div>
        </div>
      ))}
    </div>
  )
}