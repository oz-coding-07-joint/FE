import { ChapterItem } from "@/types/class";
import { useState } from "react";

export const ChapterItemList = ({ chapterItems }: { chapterItems: ChapterItem[] }) => {
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleClick = (id: number) => {
    setSelectedId(id);
  }

  return (
    <div>
      {chapterItems.map((item) => (
        <div key={item.id} 
        onClick={() => handleClick(item.id)}
        className={`border-b-2 w-[22rem] h-[5rem] flex flex-col justify-center cursor-pointer`}>
          <div className="flex items-center">
            <input type='checkbox' checked={item.isWatched} />
            <span className="ml-[0.3rem] text-base">{item.duration}</span>
          </div>
          <div className={`text-lg ${selectedId === item.id ? 'font-bold' : ''}`}>{item.title}</div>
        </div>
      ))}
    </div>
  )
}