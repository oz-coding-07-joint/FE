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
  content: string;
}

const ReviewCard = ({ name, description, content }: ReviewProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 리뷰 박스 */}
      <div className="flex flex-col justify-center items-center mb-0">
        <div className="relative w-[27.5rem] h-[15rem] bg-[#303D58] rounded-md p-4 flex flex-col justify-center z-10">
          <div className="text-primary-900 flex items-start">
            <p
              className={`${pottaOne.className} text-7xl leading-3 absolute top-10 left-5`}
            >
              “
            </p>
          </div>
          {/* 리뷰내용 */}
          <div className="text-lg px-4 mt-7 overflow-hidden text-ellipsis line-clamp-5">
            <span>{content}</span>
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
