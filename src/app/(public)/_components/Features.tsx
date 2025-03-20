export default function Features() {
  return (
    <div className="w-vw h-[1080px] flex flex-col justify-center items-center gap-[50px] pt-[100px] text-white">
      <div className="text-4xl text-center flex flex-col">
        <span>상상上上을</span>
        <span>상상想像하는</span>
        <span>당신에게,</span>
        <span>소리상상.</span>
      </div>

      <div className="flex gap-[50px] h-[700px] pt-8 tracking-tighter">
        {/* 특장점 01 */}
        <div className="bg-[#051637] w-[280px] h-[580px] lg:w-[360px] lg:h-[680px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-40 m-10">#01</span>
          <div className="font-bold text-3xl whitespace-pre-line text-center mb-11">
            {`대한민국 최초의
            온라인 클래식
             화성학 교육`}
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-1 text-center mt-8 whitespace-pre-line">
            {`기존에는 대면 강의가 대부분이었던
            클래식 기반 화성학을 이제
            온라인에서도 배울 수 있습니다.
            시간과 장소의 제약 없이,
            여러분에게 맞춘 수업 진행으로
            더 깊이있게 이해할 수 있습니다.`}
          </span>
        </div>
        {/* 특장점 02 */}
        <div className="bg-[#4c6189] w-[280px] h-[580px] lg:w-[360px] lg:h-[680px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-40 m-10">#02</span>
          <div className="font-bold text-3xl whitespace-pre-line text-center mb-2">
            {`서울대 작곡과,
          서울예고 출신 
          20년 경력 강사의
          고품질 강의`}
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-1 text-center mt-8 whitespace-pre-line">
            {`20여년 동안의 강의에서 인지한 
            노하우를 바탕으로 전문가의 꼼꼼한
            지도와 채점 시스템으로 입시를
            비하는 학생부터 실력을 키우고 싶은
            음악가까지 모두에게
            최적의 환경을 제공합니다.`}
          </span>
        </div>
        <div className="bg-accent-400 w-[280px] h-[580px] lg:w-[360px] lg:h-[680px] rounded-full flex flex-col text-white font-normal justify-center items-center">
          <span className="font-bold text-[50px] opacity-40 m-10">#03</span>
          <div className="font-bold text-3xl whitespace-pre-line text-center mb-11">
            {`단순 강의가 아닌,
            실전 피드백
            중심 교육`}
          </div>
          <span className="text-lg w-[70px] sm:w-[250px] p-1 text-center mt-8 whitespace-pre-line">
            {`화성학은 단순히 개념을 암기하는
            것이 아니라, 실제 문제를 풀고
            피드백을 받아야 실력이 향상됩니다.
            소리상상에서는 직접 푼 
            과제를 제출하고 전문가의 
            첨삭과 피드백을 받을 수 있습니다.`}
          </span>
        </div>
      </div>
    </div>
  );
}
