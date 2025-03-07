export default function Features() {
  return (
    <div className="w-dvw h-[1080px] flex flex-col justify-center items-center gap-[80px] pt-[150px] text-white">
      <span className="text-4xl block text-center">소리상상 특장점</span>
      <div className="flex gap-[50px] h-[700px] pt-12">
        {/* 특장점 01 */}
        <div className="bg-[#051637] w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-50 m-10">#01</span>
          <div className="flex flex-col justify-center items-center font-bold text-3xl">
            <span>음대임시를 위한</span>
            <span>전문교육</span>
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
            음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
            최대 넓이는 250PX입니다.
          </span>
        </div>
        {/* 특장점 02 */}
        <div className="bg-[#4c6189] w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-50 m-10">#02</span>
          <div className="flex flex-col justify-center items-center font-bold text-3xl">
            <span>전문 강사진</span>
            <span>1:1 튜터링</span>
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
            음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
            최대 넓이는 250PX입니다.
          </span>
        </div>
        <div className="bg-accent-400 w-[255px] h-[455px] lg:w-[355px] lg:h-[655px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-50 m-10">#03</span>
          <div className="flex flex-col justify-center items-center font-bold text-3xl">
            <span>공간제약 없는</span>
            <span>온라인 교육</span>
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-2 text-center mt-5">
            음대입시에 대한 장점의 내용이 들어갑니다. 내용은 중앙정렬이 되고
            최대 넓이는 250PX입니다.
          </span>
        </div>
      </div>
    </div>
  );
}
