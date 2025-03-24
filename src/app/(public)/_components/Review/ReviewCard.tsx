import { Potta_One } from "next/font/google";
import { Diamond } from "phosphor-react";

// Potta One 폰트 설정 (최적화 적용)
const pottaOne = Potta_One({
  subsets: ["latin"],
  weight: "400", // Potta One은 400만 지원
  display: "swap",
});

interface ReviewProps {
  name: string;
  description: string;
}

const ReviewCard = ({ name, description }: ReviewProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 리뷰 박스 */}
      <div className="flex flex-col justify-center items-center mb-0">
        <div className="relative w-[440px] h-[240px] bg-[#303D58] rounded-md p-4 flex flex-col justify-center z-10">
          <div className="text-primary-900 flex items-start">
            <p
              className={`${pottaOne.className} text-7xl leading-3 absolute top-10 left-5`}
            >
              “
            </p>
          </div>
          <div className="text-lg px-4 mt-7">
            <span>
              강의에 대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고
              짧아질 수 도 있습니다. 한번에 몇명이나 표시하는게 좋을까요..강의에
              대한 평가 내용이 들어갑니다. 이내용은 길어질수도 있고 짧아질 수 도
              있습니다.한번에 몇명이나 표시하는게 좋을까요..강의에 대한 평가
              내용이 들어갑니다.
            </span>
          </div>
        </div>

        {/* 아래 삼각형 */}
        <Diamond
          size={30}
          weight="fill"
          className="scale-x-[1.3] scale-y-150 -mt-[18px] mb-10 opacity-10"
        />
      </div>

      {/* 수강생 정보 */}
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="w-[120px] h-[120px] bg-white rounded-full"></div>
        <div className="text-center">
          <p>{name}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
