import Image from "next/image";
import Logoimg from "../../../assets/images/logo.png";

export default function Mainpage() {
  return (
    <div className="relative h-[1080px] flex justify-center items-center ">
      {/* 배경 이미지 + 투명도 적용 */}
      <div className="absolute inset-0 bg-mainImage bg-cover bg-no-repeat bg-center opacity-40"></div>

      <div className="relative flex flex-col gap-6 items-center">
        <span className="text-white text-5xl font-medium mt-60">
          음악의 상上상上을 현실로,
        </span>
        {/* <span className="text-accent-200 text-7xl"> */}
        <Image src={Logoimg} alt="logoimg" className="w-[280px]" />
        {/* </span> */}

        <div className="flex flex-col items-center text-white font-normal text-2xl mt-10">
          <p>화성학,</p>
          <p>처음 만나도.</p>
          <p>다시 만나도.</p>
        </div>
        <span className="flex text-center font-normal text-base text-white mt-40">
          소리상상은 클래식 기반 화성학 온라인 교육 사이트입니다.
          <br />
          누구나 시간과 장소의 제약 없이 화성학을 배우고, 실력을 키울 수 있도록
          설계되었습니다.
          <br />
          화음과 전조, 진행 등 화성학에 대한 전반적 지식을 체계적으로 학습하고,
          <br />
          이를 실전 문제를 통해 응용하며 음악을 전개하는 능력을 키울 수 있습니다
        </span>
      </div>
    </div>
  );
}
