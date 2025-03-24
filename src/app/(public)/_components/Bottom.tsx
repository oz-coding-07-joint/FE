export default function Bottom() {
  return (
    <div
      className="relative h-[800px] flex flex-col justify-center items-center
    text-white font-normal"
    >
      {/* 배경 이미지 + 투명도 적용 */}
      <div className="absolute inset-0 bg-footImage bg-cover bg-no-repeat bg-center opacity-15"></div>
      {/* 내부 컨텐츠 */}
      <div className="relative flex flex-col gap-14">
        <p className="text-6xl text-center whitespace-pre-line">
          {`모두의
        음악의 힘,
        그 상상의
        더위로`}
        </p>
        <div className="text-lg text-center flex flex-col gap-10">
          <p className="whitespace-pre-line">
            {`소리상상은 음악이 모두의 새 길이 되기를 바라는 마음에서 시작되었습니다.
          시간과 공간의 제약을 넘어, 어렵고 큰 장벽으로 느껴질 수 있는
          화성학을 더 쉽고 체계적으로 익힐 수 있는 서비스입니다.`}
          </p>
          <p className="text-accent-500 font-medium">
            지금 소리상상에서 시작하세요!
          </p>
        </div>
      </div>
    </div>
  );
}
