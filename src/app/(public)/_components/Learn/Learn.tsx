"use client";

import LearnStep from "./LearnStep";
import Arrow from "./Arrow";
import videoIcon from "@/assets/icons/videoIcon.png";
import assignmentIcon from "@/assets/icons/assignmentIcon.png";
import problemIcon from "@/assets/icons/problemIcon.png";
import liveSessionIcon from "@/assets/icons/liveSessionIcon.png";

const learnSteps = [
  {
    step: "#01",
    icon: videoIcon,
    description: `개념 정리
    동영상 강의로
    화성학 이론을 익힌다.`,
  },
  {
    step: "#02",
    icon: assignmentIcon,
    description: `과제 다운로드 및
    해결 후, 해결한 과제를
    업로드 한다.`,
  },
  {
    step: "#03",
    icon: problemIcon,
    description: `실전 문제 풀이 강의로
    실제 문제를 해결하는
    방법을 배운다.`,
  },
  {
    step: "#04",
    icon: liveSessionIcon,
    description: `추가 질문이 있을 경우,
    실시간 세션을 통해
    직접 강사에게 배운다.`,
  },
];

export default function Learn() {
  return (
    <div className="flex flex-col text-white font-normal h-[1080px] justify-center items-center gap-36">
      <div className="flex flex-col items-center text-[50px] leading-tight">
        <span>소리상상에서</span>
        <span>배우는 방법</span>
        <span className="text-xl opacity-40 font-extralight pt-1">
          Learning Process
        </span>
      </div>

      <div className="flex flex-row items-center leading-6">
        {learnSteps.map((step, index) => (
          <div key={step.step} className="flex flex-row items-center">
            <LearnStep
              step={step.step}
              icon={step.icon}
              description={step.description}
            />
            {index < learnSteps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
