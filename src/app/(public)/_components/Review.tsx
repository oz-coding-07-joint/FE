export default function Review() {
  return (
    <div className="h-[1080px] bg-[#051637] flex flex-col justify-center items-center gap-5">
      <span className="text-white text-4xl mb-10">수강생 후기</span>

      <div className="w-[1200px] md:w-3/4 sm:w-1/2 h-60 bg-white rounded-xl p-6 flex flex-row">
        <div className="bg-gray-400 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0"></div>

        <div className="flex flex-col font-normal ml-5">
          <div className="flex justify-between pt-3">
            <span className="font-bold mb-2"> 수강생 이름</span>
            <span className="text-2xl">⭐︎⭐︎⭐︎⭐︎⭐︎</span>
          </div>
          <span className="text-base text-navy] pb-1">
            클래식 화성학 1기 수강행
          </span>
          <hr />
          <span className="line-clamp-3 overflow-hidden text-ellipsis p-2 lg:text-xl text-lg">
            강의에 대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질
            수 도 있습니다. 한번에 몇명이나 표시하는게 좋을까요..강의에 대한
            평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질 수 도
            있습니다.한번에 몇명이나 표시하는게 좋을까요..강의에 대한 평가
            내용이 들어갑니다.
          </span>
        </div>
      </div>
      <div className="w-[1200px] md:w-3/4 sm:w-1/2 h-60 bg-white rounded-xl p-6 flex flex-row">
        <div className="bg-gray-400 w-30 h-30 md:w-48 md:h-48 rounded-full flex-shrink-0"></div>
        <div className="flex flex-col font-normal ml-5">
          <div className="flex justify-between pt-3">
            <span className="font-bold mb-2"> 수강생 이름</span>
            <span className="text-2xl">⭐︎⭐︎⭐︎⭐︎⭐︎</span>
          </div>
          <span className="text-base text-navy] pb-1">
            클래식 화성학 1기 수강행
          </span>
          <hr />
          <span className="line-clamp-3 overflow-hidden text-ellipsis p-2 lg:text-xl text-lg">
            강의에 대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질
            수 도 있습니다. 한번에 몇명이나 표시하는게 좋을까요..강의에 대한
            평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질 수 도
            있습니다.한번에 몇명이나 표시하는게 좋을까요..강의에 대한 평가
            내용이 들어갑니다.
          </span>
        </div>
      </div>
    </div>
  );
}
