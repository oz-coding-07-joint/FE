"use client";

import FeatureText from "./FeaturesText";

export default function Features() {
  return (
    <div className="relative min-h-screen text-white font-normal flex">
      {/* 배경 이미지 및 오버레이 적용 */}
      <div className="absolute inset-0 bg-FeaturesImage bg-cover before:absolute before:inset-0 before:bg-[#0B1C3D] before:opacity-80 before:content-['']"></div>

      {/* 내부 컨텐츠 */}
      <div className="relative px-5 md:px-10 lg:px-20 my-32 flex flex-col lg:flex-row gap-[180px]">
        {/* 타이틀 */}
        <div className="text-4xl flex flex-col">
          <span>
            상상<span className="text-accent-500">上上</span>을
          </span>
          <span>
            상상<span className="text-accent-500">想像</span>하는
          </span>
          <span>당신에게,</span>
          <span>소리상상.</span>
        </div>

        {/* 설명 컨텐츠 */}
        <div className="flex flex-col gap-28 w-[1350px]">
          <FeatureText
            quote="...학원을 다니기엔 시간이 맞지 않고, 독학하려니 채점도 안 되고, 맞게 하고 있는지도 모르겠어요..."
            author="10대 예중/예고 진학생"
            title="대한민국 최초의 온라인 클래식 화성학 교육"
            description={`기존에는 대면 강의가 대부분이었던 클래식 기반 화성학을 이제 온라인에서도 배울 수 있습니다.
            시간과 장소의 제약 없이, 여러분에게 맞춘 수업 진행으로 더 깊이있게 이해할 수 있습니다.`}
          />

          <FeatureText
            quote="...문제에 대한 피드백을 받는 게 어려워서 계속 미루고 있어요..."
            author="20대, 작곡 새내기"
            title="단순한 강의가 아닌, 실전 피드백 중심 교육"
            description={`화성학은 단순히 개념을 암기하는 것이 아니라, 실제 문제를 풀고 피드백을 받아야 실력이 향상됩니다.
            소리상상에서는 직접 푼 과제를 제출하고 전문가의 첨삭과 피드백을 받을 수 있습니다.`}
            alignRight
          />

          <FeatureText
            quote="...화성학을 좀 더 공부하고 싶지만 어디서부터 시작해야 할지 모르겠어요. ... 체계적인 학습이 어렵고, 독학하려니 방향을 잡기가 쉽지 않아요..."
            author="자신만의 곡을 만들고 싶은, 모든 음악을 사랑하는 사람들"
            title="접근부터 다르게, 깊이있는 화성학의 세계로"
            description={`다양한 클래식 기반 화성학 지식의 깊이있는 학습은 음악에 대한 이해를 한 수준 더 높이 끌어올려줄 수 있습니다.
            소리상상은 대한민국 최초 클래식 기반 화성학 온라인 강의를 통해, 음악에 대한 이해가 필요한 부분부터
            음악을 더 깊게 이해하고 싶으신 분들을 위한 강의를 지향합니다.`}
          />
        </div>
      </div>
    </div>
  );
}
